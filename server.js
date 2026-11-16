'use strict';
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const ROOT=__dirname,PORT=Number(process.env.PORT)||10000;
const attempts=new Map(),dirs=new Set(['css','js','public']),rootFiles=new Set(['cv.html','data.js','index.html','robots.txt','sitemap.xml']);
const mime={'.css':'text/css; charset=utf-8','.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.pdf':'application/pdf','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
const json=(res,status,data,headers={})=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...headers});res.end(JSON.stringify(data));};
const text=(res,status,msg)=>{res.writeHead(status,{'Content-Type':'text/plain; charset=utf-8','X-Content-Type-Options':'nosniff'});res.end(msg);};
const body=(req,max=1e6)=>new Promise((resolve,reject)=>{let raw='';req.on('data',c=>{raw+=c;if(raw.length>max){reject(Object.assign(Error('Request too large'),{status:413}));req.destroy();}});req.on('end',()=>{try{resolve(raw?JSON.parse(raw):{});}catch{reject(Object.assign(Error('Invalid JSON'),{status:400}));}});req.on('error',reject);});
const clean=(v,n=3000)=>typeof v==='string'?v.trim().slice(0,n):'';
const ip=req=>String(req.headers['x-forwarded-for']||req.socket.remoteAddress||'unknown').split(',')[0].trim();
async function init(){}
async function api(req,res,u){
 if(req.method==='POST'&&u.pathname==='/api/contact'){
  const b=await body(req,20000);
  if(clean(b.website,100))return json(res,200,{success:true,message:'Message received.'});
  const key='contact:'+ip(req),now=Date.now(),list=(attempts.get(key)||[]).filter(t=>now-t<36e5);
  if(list.length>=5)return json(res,429,{error:'Please wait before sending another message.'});
  const name=clean(b.name,100),email=clean(b.email,254),subject=clean(b.subject,160)||'Portfolio enquiry',message=clean(b.message,5000);
  if(!name||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||message.length<10)return json(res,400,{error:'Enter your name, valid email and a message of at least 10 characters.'});
  if(!process.env.RESEND_API_KEY||!process.env.RESEND_FROM_EMAIL)return json(res,503,{error:'The contact email service is not configured yet. Please try again later or use the direct email link.'});
  list.push(now);attempts.set(key,list);
  try{
   const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+process.env.RESEND_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.RESEND_FROM_EMAIL,to:['business.rijan.np@gmail.com'],reply_to:email,subject:'[Portfolio] '+subject,text:'From: '+name+' <'+email+'>\\nSubject: '+subject+'\\n\\n'+message})});
   if(!r.ok){const detail=await r.text();console.error('Resend:',r.status,detail);return json(res,502,{error:'Your message could not be delivered right now. Please try again later.'});}
   return json(res,200,{success:true,message:'Message sent successfully. Thank you for reaching out.'});
  }catch(e){console.error('Resend:',e.message);return json(res,502,{error:'Your message could not be delivered right now. Please try again later.'});}
 }
 if(req.method==='GET'&&u.pathname==='/api/health')return json(res,200,{status:'ok'});
 if(u.pathname.startsWith('/api/admin'))return json(res,404,{error:'Not found.'});
 return json(res,404,{error:'API route not found.'});
}
async function staticFile(req,res,u){let p;try{p=decodeURIComponent(u.pathname);}catch{return text(res,400,'Bad request');}const parts=p.split('/').filter(Boolean);if(parts.some(x=>x.startsWith('.'))||(parts.length&&!dirs.has(parts[0])&&!rootFiles.has(parts[0])))return text(res,404,'Not found');const file=path.resolve(ROOT,'.'+p);if(file!==ROOT&&!file.startsWith(ROOT+path.sep))return text(res,403,'Forbidden');try{let f=file,st=await fs.promises.stat(f);if(st.isDirectory()){f=path.join(f,'index.html');st=await fs.promises.stat(f);}if(!st.isFile())return text(res,404,'Not found');res.writeHead(200,{'Content-Length':st.size,'Content-Type':mime[path.extname(f).toLowerCase()]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin'});if(req.method==='HEAD')return res.end();fs.createReadStream(f).pipe(res);}catch(e){if(e.code==='ENOENT'||e.code==='ENOTDIR')return text(res,404,'Not found');console.error(e);return text(res,500,'Internal server error');}}
const server=http.createServer(async(req,res)=>{try{const u=new URL(req.url,'http://localhost');if(u.pathname.startsWith('/api/')){if(!['GET','POST','PUT','DELETE'].includes(req.method)){res.setHeader('Allow','GET, POST, PUT, DELETE');return json(res,405,{error:'Method not allowed'});}return await api(req,res,u);}if(!['GET','HEAD'].includes(req.method)){res.setHeader('Allow','GET, HEAD');return text(res,405,'Method not allowed');}return await staticFile(req,res,u);}catch(e){console.error(e);if(!res.headersSent)return json(res,e.status||500,{error:e.status?e.message:'Internal server error'});res.destroy();}});
init().then(()=>server.listen(PORT,'0.0.0.0',()=>console.log('Portfolio server listening on '+PORT+'; data directory '+DATA_DIR))).catch(e=>{console.error('Storage initialization failed:',e);process.exit(1);});
