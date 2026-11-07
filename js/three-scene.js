(() => {
	const TC = () => window.ThemeColors ? window.ThemeColors.get() : { aStr: '255, 31, 61', bStr: '168, 85, 247', aHex: '#ff1f3d', bHex: '#a855f7' };
	const canvas = document.getElementById('hero-canvas');
	if (!canvas) return;
	const startFallback = target => {
		const context = target.getContext('2d');
		if (!context) {
			target.setAttribute('aria-label', 'Hero visual unavailable in this browser');
			return;
		}

		const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
		let tc = TC();
		addEventListener('themechange', () => { tc = TC(); if (width) draw(); });
		const longitudeCount = 24;
		const latitudeCount = 8;
		let width = 0;
		let height = 0;
		let rotation = 0;
		let active = true;
		let frame = 0;

		const draw = () => {
			context.clearRect(0, 0, width, height);
			const centerX = width / 2;
			const centerY = height / 2;
			const radius = Math.min(width, height) * .28;
			const points = [];

			for (let latitudeIndex = 1; latitudeIndex < latitudeCount; latitudeIndex += 1) {
				const latitude = (latitudeIndex / latitudeCount - .5) * Math.PI;
				const row = [];
				for (let longitudeIndex = 0; longitudeIndex < longitudeCount; longitudeIndex += 1) {
					const longitude = longitudeIndex / longitudeCount * Math.PI * 2 + rotation;
					const depth = Math.cos(latitude) * Math.cos(longitude);
					row.push({
						x: centerX + Math.cos(latitude) * Math.sin(longitude) * radius,
						y: centerY + Math.sin(latitude) * radius,
						depth
					});
				}
				points.push(row);
			}

			context.lineWidth = 1;
			points.forEach((row, rowIndex) => row.forEach((point, pointIndex) => {
				const next = row[(pointIndex + 1) % longitudeCount];
				const lower = points[rowIndex + 1]?.[pointIndex];
				context.strokeStyle = `rgba(${tc.aStr}, ${.08 + Math.max(0, point.depth) * .24})`;
				context.beginPath();
				context.moveTo(point.x, point.y);
				context.lineTo(next.x, next.y);
				if (lower) context.lineTo(lower.x, lower.y);
				context.stroke();
				context.fillStyle = `rgba(${tc.aStr}, ${.2 + Math.max(0, point.depth) * .6})`;
				context.beginPath();
				context.arc(point.x, point.y, point.depth > 0 ? 2 : 1, 0, Math.PI * 2);
				context.fill();
			}));

			context.strokeStyle = `rgba(${tc.bStr}, .48)`;
			context.beginPath();
			context.ellipse(centerX, centerY, radius * 1.32, radius * .42, -.42, 0, Math.PI * 2);
			context.stroke();
			context.strokeStyle = `rgba(${tc.aStr}, .28)`;
			context.beginPath();
			context.ellipse(centerX, centerY, radius * 1.48, radius * .56, .56, 0, Math.PI * 2);
			context.stroke();
			if (!reducedMotion) rotation += .006;
		};

		const render = () => {
			frame = 0;
			if (!active || document.hidden) return;
			draw();
			if (!reducedMotion) frame = requestAnimationFrame(render);
		};
		const wake = () => {
			if (active && !document.hidden && !frame) frame = requestAnimationFrame(render);
		};
		const resize = () => {
			const rect = target.getBoundingClientRect();
			const scale = Math.min(devicePixelRatio || 1, 1.5);
			width = rect.width;
			height = rect.height;
			target.width = Math.max(1, Math.floor(width * scale));
			target.height = Math.max(1, Math.floor(height * scale));
			context.setTransform(scale, 0, 0, scale, 0, 0);
			draw();
			wake();
		};
		const observer = 'IntersectionObserver' in window
			? new IntersectionObserver(entries => {
				active = entries[0].isIntersecting;
				if (active) wake();
				else if (frame) {
					cancelAnimationFrame(frame);
					frame = 0;
				}
			})
			: null;
		observer?.observe(target);
		addEventListener('resize', resize);
		document.addEventListener('visibilitychange', wake);
		resize();
	};
	if (!window.THREE) {
		startFallback(canvas);
		return;
	}
	let context;
	try {
		context = canvas.getContext('webgl2', { alpha: true, antialias: true })
			|| canvas.getContext('webgl', { alpha: true, antialias: true });
	} catch (error) {
		context = null;
	}
	if (!context) {
		startFallback(canvas);
		return;
	}
	let renderer;
	try { renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: true }); }
	catch (error) {
		const fallbackCanvas = document.createElement('canvas');
		fallbackCanvas.id = canvas.id;
		fallbackCanvas.className = canvas.className;
		canvas.replaceWith(fallbackCanvas);
		startFallback(fallbackCanvas);
		return;
	}

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(42, 1, .1, 100);
	camera.position.z = 4.8;
	renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));

	const group = new THREE.Group();
	const core = new THREE.Mesh(
		new THREE.IcosahedronGeometry(1.1, 2),
		new THREE.MeshBasicMaterial({ color: 0xff1f3d, wireframe: true, transparent: true, opacity: .72 })
	);
	const innerCore = new THREE.Mesh(
		new THREE.IcosahedronGeometry(.72, 1),
		new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true, transparent: true, opacity: .32 })
	);
	const ring = new THREE.Mesh(
		new THREE.TorusGeometry(1.55, .012, 8, 100),
		new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: .65 })
	);
	const ringTwo = new THREE.Mesh(
		new THREE.TorusGeometry(1.9, .008, 8, 100),
		new THREE.MeshBasicMaterial({ color: 0xff1f3d, transparent: true, opacity: .38 })
	);
	ring.rotation.x = .8;
	ringTwo.rotation.y = 1.1;
	group.add(core, innerCore, ring, ringTwo);

	const particleGeometry = new THREE.BufferGeometry();
	const particlePositions = new Float32Array(420 * 3);
	for (let index = 0; index < particlePositions.length; index += 3) {
		const radius = 2.2 + Math.random() * 1.2;
		const angle = Math.random() * Math.PI * 2;
		particlePositions[index] = Math.cos(angle) * radius;
		particlePositions[index + 1] = (Math.random() - .5) * 3.2;
		particlePositions[index + 2] = Math.sin(angle) * radius;
	}
	particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
	const particles = new THREE.Points(
		particleGeometry,
		new THREE.PointsMaterial({ color: 0xff1f3d, size: .018, transparent: true, opacity: .65 })
	);
	scene.add(group, particles);

	const pointer = { x: 0, y: 0 };
	const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
	const applyTheme = () => {
		const c = TC();
		core.material.color.set(c.aHex);
		innerCore.material.color.set(c.bHex);
		ring.material.color.set(c.bHex);
		ringTwo.material.color.set(c.aHex);
		particles.material.color.set(c.aHex);
		if (reduce) renderer.render(scene, camera);
	};
	addEventListener('themechange', applyTheme);
	applyTheme();
	let active = true;
	let animationFrame = 0;
	addEventListener('pointermove', event => {
		pointer.x = (event.clientX / innerWidth - .5) * .25;
		pointer.y = (event.clientY / innerHeight - .5) * .18;
	}, { passive: true });
	const resize = () => {
		const rect = canvas.getBoundingClientRect();
		renderer.setSize(rect.width, rect.height, false);
		canvas.width = Math.max(1, Math.floor(rect.width * renderer.getPixelRatio()));
		canvas.height = Math.max(1, Math.floor(rect.height * renderer.getPixelRatio()));
		camera.aspect = rect.width / rect.height;
		camera.updateProjectionMatrix();
	};
	addEventListener('resize', resize);
	resize();
	const wake = () => {
		if (!animationFrame && active && !document.hidden) animationFrame = requestAnimationFrame(animate);
	};
	const observer = new IntersectionObserver(entries => {
		active = entries[0].isIntersecting;
		wake();
	});
	observer.observe(canvas);
	document.addEventListener('visibilitychange', wake);
	const animate = () => {
		animationFrame = 0;
		if (!active || document.hidden) return;
		if (!reduce) {
			group.rotation.y += .002;
			group.rotation.x += .001;
			ring.rotation.z -= .003;
			ringTwo.rotation.x += .002;
			particles.rotation.y -= .0005;
			group.rotation.y += (pointer.x - group.rotation.y) * .0008;
			group.rotation.x += (pointer.y - group.rotation.x) * .0008;
		}
		renderer.render(scene, camera);
		if (!reduce) animationFrame = requestAnimationFrame(animate);
	};
	wake();
})();
