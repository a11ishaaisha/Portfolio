// The uploaded portfolio's original copy and media interactions are preserved here.
export function initializePortfolio(root, M) {
const controller = new AbortController();
const listen = (target, event, handler, options={}) => target.addEventListener(event, handler, {...options, signal: controller.signal});

const CONFIG={email:"firaisha04@gmail.com",linkedin:"https://www.linkedin.com/in/aisha-firdouse/"}; /* add your email and LinkedIn URL here */

const $=(s,r=root)=>r.querySelector(s),$$=(s,r=root)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches,HOVER=matchMedia('(hover:hover) and (min-width:901px)').matches;
const vu=k=>M[k];
$$('[data-k]').forEach(i=>i.src=M[i.dataset.k]);
const cvu=M.cv;
$('#cv').href=$('#cv2').href=cvu;
/* lists */
const L={g1:['g1a','g1b','g1c','g1d','g1e','g1f','g1g','g1h','g1i'].map(k=>({k,alt:'Graphic design work, chapter I'})),
 g2:['g2a','g2b','g2c','g2d','g2e','g2f','g2g','g2h','g2i'].map(k=>({k,alt:'Graphic design work, chapter II'})),
 b:['b1','b2','b3'].map(k=>({k,alt:'Branding and identity work'})),
 d3:[{k:'r1',alt:'Textured 3D character render'},{k:'r2',alt:'Clay 3D character model'},{v:'v_3d',alt:'3D and After Effects animation'},{v:'v_anim1',alt:'Motion graphics animation'},{v:'v_anim2',alt:'Logo animation'}],
 v:[{v:'v_edit1',alt:'Video edit'},{v:'v_reel',alt:'Showreel'},{v:'v_edit2',alt:'Video edit'}]};
const tile=(it,set,i,cls='')=>{const b=document.createElement('button');b.className='tile rv '+cls;b.dataset.o=set+':'+i;b.setAttribute('aria-label','View image '+(i+1));b.innerHTML=`<img loading="lazy" src="${M[it.k]}" alt="${it.alt}">`;return b};
L.g1.forEach((it,i)=>$('#m1').append(tile(it,'g1',i)));L.g2.forEach((it,i)=>$('#r2').append(tile(it,'g2',i)));L.b.forEach((it,i)=>$('#mb').append(tile(it,'b',i)));
L.am=[{k:'am1',alt:'Instagram profile and feed of the official IIM Sirmaur account'},{k:'am2',alt:'Instagram profile and feed of the Smart Up Educations account'}];
{const cs=$$('.acg>div');cs[0].append(tile(L.am[0],'am',0));cs[2].append(tile(L.am[1],'am',1))}
const vtile=(v,set,i,cls,box)=>{const b=document.createElement('button');b.className='vt rv '+cls;b.dataset.o=set+':'+i;b.setAttribute('aria-label','Play video '+(i+1));b.innerHTML=`<img loading="lazy" src="${M[v+'_p']}" alt="${L[set][i].alt}"><span class="pl"></span>`;
 if(HOVER&&!RM){let pv;b.onmouseenter=()=>{pv=document.createElement('video');pv.muted=true;pv.loop=true;pv.playsInline=true;pv.src=vu(v);pv.play().catch(()=>{});b.insertBefore(pv,b.firstChild.nextSibling)};b.onmouseleave=()=>pv&&pv.remove()}box.append(b)};
const v3=$('#v3');[['v_3d','w',2],['v_anim1','t',3],['v_anim2','w',4]].forEach(([v,c,i])=>vtile(v,'d3',i,c,v3));
const v2=$('#v2');vtile('v_reel','v',1,'big',v2);vtile('v_edit1','v',0,'t',v2);vtile('v_edit2','v',2,'t',v2);
/* hero video */
const banner=document.createElement('video');
banner.className='banner-video';banner.muted=true;banner.loop=true;banner.playsInline=true;banner.poster=M.v_reel_p;banner.setAttribute('aria-hidden','true');banner.setAttribute('tabindex','-1');
$('.hc').prepend(banner);
const heroVideos=[$('#hbg'),banner];
heroVideos.forEach(v=>{v.poster=M.v_reel_p;v.preload='metadata';if(!RM){v.src=vu('v_reel');v.addEventListener('loadedmetadata',()=>{if(v.currentTime<1.5)v.currentTime=1.5});v.addEventListener('timeupdate',()=>{if(v.currentTime<1.2)v.currentTime=1.5});v.play().catch(()=>{})}});
let bannerVisible=true;
function updateHeroPlayback(){heroVideos.forEach(v=>{if(RM||document.hidden||!bannerVisible||$('#lb').open)v.pause();else v.play().catch(()=>{})})}
const heroObserver=new IntersectionObserver(es=>{bannerVisible=es[0].isIntersecting;updateHeroPlayback()},{threshold:0});heroObserver.observe($('.hc'));
listen(document,'visibilitychange',updateHeroPlayback);
/* hero polaroid */
const polaroid=document.createElement('div');polaroid.className='polaroid';polaroid.setAttribute('aria-hidden','true');
polaroid.innerHTML=`<img src="${M.portrait}" alt="">`;
$('.hrx').append(polaroid);
/* before/after */
$('#rg').oninput=e=>{const x=e.target.value;$('#top').style.clipPath=`inset(0 ${100-x}% 0 0)`;$('#hdl').style.left=x+'%'};
/* viewer */
const lb=$('#lb'),stg=$('#stg');let list=[],cur=0,opener;
function show(){const it=list[cur];$('#ct').textContent=String(cur+1).padStart(2,'0')+' / '+String(list.length).padStart(2,'0');stg.innerHTML='';$('#vc').hidden=!it.v;
 if(it.v){const v=document.createElement('video');v.src=vu(it.v);v.poster=M[it.v+'_p'];v.playsInline=true;v.muted=false;v.autoplay=true;v.setAttribute('aria-label',it.alt);stg.append(v);v.play().catch(()=>{});
  const pp=$('#pp'),sc=$('#sc'),mu=$('#mu'),tm=$('#tm');mu.textContent='Mute';mu.setAttribute('aria-pressed','true');pp.textContent='Pause';
  const f=t=>Math.floor(t/60)+':'+String(Math.floor(t%60)).padStart(2,'0');
  pp.onclick=()=>v.paused?v.play():v.pause();v.onclick=pp.onclick;v.onplay=()=>pp.textContent='Pause';v.onpause=()=>pp.textContent='Play';mu.onclick=()=>{v.muted=!v.muted;mu.textContent=v.muted?'Unmute':'Mute';mu.setAttribute('aria-pressed',String(!v.muted))};
  v.ontimeupdate=()=>{sc.value=v.duration?v.currentTime/v.duration*1000:0;tm.textContent=f(v.currentTime)+' / '+f(v.duration||0)};sc.oninput=()=>{if(v.duration)v.currentTime=sc.value/1000*v.duration}}
 else{const im=new Image();im.src=M[it.k];im.alt=it.alt;stg.append(im);im.onclick=e=>{im.classList.toggle('z');im.style.transformOrigin=((e.offsetX/im.width)*100)+'% '+((e.offsetY/im.height)*100)+'%'};im.onmousemove=e=>{if(im.classList.contains('z'))im.style.transformOrigin=((e.offsetX/im.width)*100)+'% '+((e.offsetY/im.height)*100)+'%'};
  [-1,1].forEach(o=>{const n=list[(cur+o+list.length)%list.length];if(n.k)new Image().src=M[n.k]})}
 $$('#th button').forEach((b,i)=>b.classList.toggle('on',i===cur))}
function stop(){const v=$('video',stg);if(v){v.pause();v.removeAttribute('src');v.load()}}
function open(set,i,el){list=L[set];cur=i;opener=el;$('#th').innerHTML='';list.forEach((it,j)=>{const b=document.createElement('button');b.setAttribute('aria-label','Item '+(j+1));b.innerHTML=`<img src="${M[it.k||it.v+'_p']}" alt="">`;b.onclick=()=>{stop();cur=j;show()};$('#th').append(b)});show();heroVideos.forEach(v=>v.pause());document.documentElement.classList.add('viewer-open');lb.showModal()}
const step=n=>{stop();cur=(cur+n+list.length)%list.length;show()};
$('#nx').onclick=()=>step(1);$('#pv').onclick=()=>step(-1);$('#x').onclick=()=>lb.close();
listen(lb,'close',()=>{stop();document.documentElement.classList.remove('viewer-open');updateHeroPlayback();opener&&opener.focus()});listen(lb,'click',e=>{if(e.target===lb||e.target===stg)lb.close()});
listen(lb,'keydown',e=>{if(e.target.matches('input'))return;if(e.key==='ArrowRight'){e.preventDefault();step(1)}if(e.key==='ArrowLeft'){e.preventDefault();step(-1)}});
let sx=0;listen(lb,'touchstart',e=>sx=e.touches[0].clientX,{passive:true});listen(lb,'touchend',e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>60)step(d<0?1:-1)});
let moved=0;
listen(root,'click',e=>{if(moved){moved=0;return}const o=e.target.closest('[data-o]');if(o){let[s,i]=o.dataset.o.split(':');if(s==='vid'){s='d3';i=2}open(s,+i,o)}});
$('#reel').onclick=e=>open('v',1,e.currentTarget);
/* rail */
const r=$('#r2');let dn=0,sl=0;
r.onpointerdown=e=>{if(e.pointerType!=='mouse')return;e.preventDefault();dn=e.clientX;sl=r.scrollLeft;r.classList.add('d');moved=0};
listen(window,'pointermove',e=>{if(dn){const d=e.clientX-dn;if(Math.abs(d)>5)moved=1;r.scrollLeft=sl-d}});
listen(window,'pointerup',()=>{if(dn){dn=0;r.classList.remove('d');setTimeout(()=>moved=0,150)}});
r.onscroll=()=>{const m=r.scrollWidth-r.clientWidth;$('#pg').style.left=(m?r.scrollLeft/m*80:0)+'%'};
$('#rl').onclick=()=>r.scrollBy({left:-500,behavior:'smooth'});$('#rr').onclick=()=>r.scrollBy({left:500,behavior:'smooth'});
r.onkeydown=e=>{if(e.key==='ArrowRight')r.scrollBy({left:300});if(e.key==='ArrowLeft')r.scrollBy({left:-300})};
/* skills */
const SK=[['Graphic design',[['ps','Photoshop','Image editing and poster design'],['ai','Illustrator','Vector graphics and logos']]],
['Video and post-production',[['pr','Premiere Pro','Video editing'],['ae','After Effects','Motion graphics'],['dv','DaVinci Resolve','Editing and colour']]],
['3D',[['bl','Blender','3D modelling and animation']]],
['AI image and video',[['hl','Hailuo AI','AI video generation'],['ff','Adobe Firefly','Generative imagery'],['rw','Runway','AI video'],['fx','Flux','AI image generation']]],
['Marketing and analytics',[['hs','HubSpot CRM','CRM and performance tracking'],['ig','Instagram Analytics','Growth and engagement tracking'],['rs','R Studio','Data analysis']]]];
SK.forEach(([g,it])=>{const d=document.createElement('div');d.className='grp rv';d.innerHTML=`<h3>${g}</h3><div class="row"></div>`;it.forEach(([k,n,t])=>{const b=document.createElement('button');b.className='sk';b.setAttribute('aria-label',n+': '+t);b.innerHTML=`<img src="${M['i_'+k]}" alt="${n} logo"><span class="tip" role="tooltip"><b>${n}</b><br>${t}</span>`;b.onclick=e=>{e.stopPropagation();const o=b.classList.contains('on');$$('.sk.on').forEach(x=>x.classList.remove('on'));if(!o)b.classList.add('on')};$('.row',d).append(b)});$('#sk').append(d)});
listen(root,'click',()=>$$('.sk.on').forEach(x=>x.classList.remove('on')));
SK.forEach(([g,it])=>it.forEach(([k,n])=>$('#strip').insertAdjacentHTML('beforeend',`<span class="chip"><i><img src="${M['i_'+k]}" alt=""></i>${n}</span>`)));
/* timeline */
const TL=[['Digital Marketing Intern, EPP Composites','Apr 2026 – May 2026',['Benchmarked 10+ leading FRP manufacturers on digital presence, branding and exhibitions','Developed LinkedIn and Instagram growth strategies, content frameworks and website redesign concepts','Conceptualised the Industry Newsroom digital initiative']],
['Media Committee, IIM Sirmaur','2025 – 2026',['Grew the official social account to 7.6K+ followers, 319K+ views and 9.7K+ engagements in 90 days','Coordinated official merchandise design, with promotional videos and brochures','Official video editor and graphic designer: 15+ branding assets, event photography and videography']],
['Social Media Marketing, Smart Up Educations','Dec 2024 – Jun 2025',['Led end-to-end event branding: logo, brochure, 50+ posters, scoreboards and motion graphics','Built engagement with 10+ recruitment posters, meme campaigns and videos']],
['Social Media Manager Intern, Cochin Academy','Jul 2024 – Sep 2024',['Created short-format content for Instagram and WhatsApp based on live trends','Designed 40+ certificate and poster assets']],
['Freelance Content Design','5+ years',['Campaign visuals and videos for CPIM 2024 and Nava Kerala Mission','Led branding for MRFT, securing 10+ sponsors and supporting ₹3L+ in event budgets','AI videos with Hailuo AI, Firefly, Runway and Flux, including a Daily Winner entry in a case competition']]];
TL.forEach(([h,s,l],i)=>{const d=document.createElement('div');d.innerHTML=`<button aria-expanded="false" aria-controls="experience-${i}"><h3>${h}</h3><small>${s}</small></button><ul id="experience-${i}">${l.map(x=>`<li>${x}</li>`).join('')}</ul>`;const b=$('button',d),u=$('ul',d);const t=()=>{const o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',!o);d.classList.toggle('o',!o);u.style.maxHeight=o?0:u.scrollHeight+'px'};b.onclick=t;if(i===0)t();$('#tl').append(d)});
/* contact */
{const e=CONFIG.email,l=CONFIG.linkedin,n=[];const a=(el,u,w)=>{if(u){el.href=u}else{el.setAttribute('aria-disabled','true');el.removeAttribute('href');n.push(w)}};a($('#em'),e&&'mailto:'+e,'email');a($('#li'),l,'LinkedIn URL');if(n.length)$('#note').textContent='Add your '+n.join(' and ')+' in CONFIG at the top of the script to enable these buttons.'}
/* scroll, nav, reveal */
const hd=$('#hd'),ul=$('#ul'),links=$$('#nav a');
listen(window,'scroll',()=>{hd.classList.toggle('s',scrollY>80);$('#bar').style.transform=`scaleX(${scrollY/(document.documentElement.scrollHeight-innerHeight)})`},{passive:true});
function mark(a){if(!a)return;const r=a.getBoundingClientRect(),n=$('#nav').getBoundingClientRect();ul.style.width=r.width+'px';ul.style.transform=`translateX(${r.left-n.left+$('#nav').scrollLeft}px)`;links.forEach(l=>{l.classList.toggle('on',l===a);if(l===a)l.setAttribute('aria-current','location');else l.removeAttribute('aria-current')});if(innerWidth<901)a.scrollIntoView({inline:'center',block:'nearest'})}
const ids=['home','g1','g2','d3','video','brand','acc','about','contact'];
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const a=links[ids.indexOf(e.target.id)];mark(a)}}),{rootMargin:'-45% 0px -50% 0px'});ids.forEach(i=>so.observe($('#'+i)));mark(links[0]);listen(window,'resize',()=>mark($('#nav a.on')));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.strip,.int>div,.trio>button,.tl>div,.chips>span,.contact>.btn').forEach(el=>el.classList.add('rv'));
$$('main h2,main h3,main p').filter(el=>!el.closest('.hl,.hrx')).forEach(el=>el.classList.add('rv','text-reveal'));
$$('.rv').forEach(el=>{const siblings=[...el.parentElement.children].filter(s=>s.classList.contains('rv'));el.style.transitionDelay=Math.min(siblings.indexOf(el),3)*90+'ms';io.observe(el)});

return () => { controller.abort();so.disconnect();io.disconnect();heroObserver.disconnect();root.querySelectorAll('video').forEach(v=>v.pause());banner.remove();polaroid.remove();document.documentElement.classList.remove('viewer-open'); };
}
