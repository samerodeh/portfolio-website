const root=document.documentElement;
const toggle=document.querySelector('.theme');
function labelTheme(){toggle.setAttribute('aria-label',root.dataset.theme==='dark'?'Switch to light theme':'Switch to dark theme')}
let themeMotion=0;
function updateThemeColor(){document.querySelector('meta[name="theme-color"]')?.setAttribute('content',root.dataset.theme==='dark'?'#263344':'#c7d5df')}
toggle.addEventListener('click',async()=>{
 const motion=++themeMotion;
 const wrap=toggle.parentElement;
 toggle.getAnimations().forEach(a=>a.cancel());
 wrap.querySelectorAll('.theme-ghost').forEach(e=>e.remove());
 toggle.style.visibility='';
 const previous=toggle.cloneNode(true);
 previous.style.backgroundColor=getComputedStyle(toggle).backgroundColor;previous.style.color=getComputedStyle(toggle).color;
 previous.classList.add('theme-ghost');previous.setAttribute('aria-hidden','true');previous.setAttribute('tabindex','-1');previous.inert=true;
 // Freeze the old icon before the root theme changes.
 previous.querySelectorAll('svg').forEach(svg=>{svg.style.display=svg.classList.contains(root.dataset.theme==='dark'?'sun':'moon')?'block':'none'});
 root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';
 try{localStorage.setItem('theme',root.dataset.theme)}catch{}
 labelTheme();updateThemeColor();
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 wrap.append(previous);toggle.style.visibility='hidden';
 const exit=previous.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(20px)'}],{duration:200,easing:'ease-in',fill:'forwards'});
 await exit.finished.catch(()=>{});previous.remove();
 if(motion!==themeMotion)return;
 toggle.style.visibility='';
 toggle.animate([{opacity:0,transform:'translateY(-20px)'},{opacity:1,transform:'translateY(0)'}],{duration:200,easing:'ease-out'});
});labelTheme();updateThemeColor();
const menu=document.querySelector('.menu'), links=document.querySelector('.nav-links');
function closeMenu(){links.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation')}
menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();menu.focus()}});
document.addEventListener('click',e=>{if(!e.target.closest('nav'))closeMenu()});
document.getElementById('year').textContent=new Date().getFullYear();
let navigationId=0;
async function navigate(url,push=true){const id=++navigationId;closeMenu();try{const response=await fetch(url.pathname);if(!response.ok)throw Error('Page unavailable');const html=new DOMParser().parseFromString(await response.text(),'text/html');if(id!==navigationId)return;const next=html.querySelector('.page-content');if(!next)throw Error('Invalid page');const current=document.querySelector('.page-content');current.classList.add('leaving');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)await new Promise(r=>setTimeout(r,180));if(id!==navigationId)return;document.querySelector('.page-content').replaceWith(next);document.title=html.title;if(push)history.pushState({},'',url.pathname+url.hash);document.querySelectorAll('.nav-links a').forEach(a=>{if(new URL(a.href).pathname===url.pathname)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});window.scrollTo({top:0,behavior:'instant'});next.setAttribute('tabindex','-1');next.focus({preventScroll:true});}catch{if(id===navigationId)location.href=url.href}}
document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a||a.target||a.hasAttribute('download')||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button!==0)return;const url=new URL(a.href);if(url.origin!==location.origin||url.pathname.endsWith('.pdf')||url.hash)return;if(url.pathname===location.pathname){e.preventDefault();closeMenu();window.scrollTo({top:0,behavior:'smooth'});return}e.preventDefault();navigate(url)});
window.addEventListener('popstate',()=>navigate(new URL(location.href),false));
