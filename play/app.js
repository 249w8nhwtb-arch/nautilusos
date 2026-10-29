'use strict';
const entries = [
 {name:'GeForce NOW',type:'games',tag:'CLOUD GAMING',art:'GEFORCE\nNOW',color:'#405833',desc:'Stream supported PC games through NVIDIA’s cloud. Account required; plans and supported games vary.',url:'https://play.geforcenow.com/',action:'Open GeForce NOW'},
 {name:'Geometry Dash',type:'games',tag:'OFFICIAL GAME',art:'◇',color:'#317b88',desc:'Jump into the rhythm platformer. Get the official game from its Steam page.',url:'https://store.steampowered.com/app/322170/Geometry_Dash/',action:'View official game'},
 {name:'Cube Sprint',type:'play',tag:'PLAY HERE · ORIGINAL',art:'▰ / ▴',color:'#806449',desc:'One cube. A line of spikes. Time your jumps in this original arcade runner.',game:'dash',action:'Play Cube Sprint'},
 {name:'Snake Garden',type:'play',tag:'PLAY HERE · ORIGINAL',art:'SNAKE',color:'#446b53',desc:'Follow the trail, collect the fruit, and leave yourself room to grow.',game:'snake',action:'Play Snake Garden'},
 {name:'Brick Break',type:'play',tag:'PLAY HERE · ORIGINAL',art:'▰ ▰ ▰\n •',color:'#665975',desc:'Keep the ball in play and clear every brick. A little old-school arcade energy.',game:'bricks',action:'Play Brick Break'},
 {name:'Xbox game library',type:'games',tag:'200+ TITLES',art:'XBOX',color:'#38573c',desc:'Search our Xbox directory for Fortnite, Call of Duty, VALORANT, and more.',url:'/games/',action:'Browse the directory'},
 {name:'Fortnite',type:'games',tag:'OFFICIAL GAME',art:'FORT\nNITE',color:'#405b82',desc:'Find Battle Royale, LEGO Fortnite, and creator-made experiences on the official website.',url:'https://www.fortnite.com/',action:'Explore Fortnite'},
 {name:'Xbox Cloud Gaming',type:'games',tag:'CLOUD GAMING',art:'CLOUD ↗',color:'#3f654d',desc:'Explore the current cloud catalog. Supported devices, regions, and subscription requirements vary.',url:'https://www.xbox.com/play',action:'Open Xbox Cloud Gaming'},
 {name:'Poki',type:'games',tag:'BROWSER GAME LIBRARY',art:'poki',color:'#477c81',desc:'Browse a large collection of free browser games on Poki’s website.',url:'https://poki.com/',action:'Find browser games'},
 {name:'CrazyGames',type:'games',tag:'BROWSER GAME LIBRARY',art:'CRAZY\nGAMES',color:'#615679',desc:'Discover racing, action, puzzle, and multiplayer browser games.',url:'https://www.crazygames.com/',action:'Browse CrazyGames'},
 {name:'Steam',type:'games',tag:'PC GAME STORE',art:'STEAM',color:'#3c5565',desc:'Browse thousands of PC games, including free-to-play titles and demos.',url:'https://store.steampowered.com/',action:'Explore Steam'},
 {name:'itch.io',type:'games',tag:'INDIE GAME LIBRARY',art:'itch.io',color:'#8c584e',desc:'Discover independent games, including many that play right in your browser.',url:'https://itch.io/games/html5',action:'Explore browser indies'},
 {name:'Tubi',type:'movies',tag:'FREE WITH ADS',art:'tubi',color:'#8a7948',desc:'Watch movies and TV with ads where available. Catalog and age ratings vary.',url:'https://tubitv.com/',action:'Visit Tubi'},
 {name:'Netflix',type:'movies',tag:'SUBSCRIPTION',art:'NETFLIX',color:'#783f42',desc:'Browse movies, series, and originals. Paid membership required.',url:'https://www.netflix.com/',action:'Visit Netflix'},
 {name:'Disney+',type:'movies',tag:'SUBSCRIPTION',art:'Disney+',color:'#375d6c',desc:'Explore Disney, Pixar, Marvel, and more. Paid membership required.',url:'https://www.disneyplus.com/',action:'Visit Disney+'},
 {name:'YouTube Movies',type:'movies',tag:'RENT / BUY / SELECT FREE',art:'▶',color:'#775044',desc:'Explore movies to rent or buy, plus free selections in supported regions.',url:'https://www.youtube.com/feed/storefront',action:'Browse YouTube Movies'},
 {name:'Pluto TV',type:'movies',tag:'FREE WITH ADS',art:'pluto tv',color:'#6e6643',desc:'Find free live channels and on-demand movies in supported regions.',url:'https://pluto.tv/',action:'Visit Pluto TV'},
 {name:'JustWatch',type:'movies',tag:'STREAMING SEARCH',art:'JUST\nWATCH',color:'#75663e',desc:'Search for a movie and find which services offer it in your country.',url:'https://www.justwatch.com/',action:'Find a movie'}
];
let filter='all';
const cards=document.querySelector('#cards');
function render(){
 const term=document.querySelector('#search').value.trim().toLowerCase();
 const shown=entries.filter(e=>(filter==='all'||e.type===filter)&&`${e.name} ${e.desc} ${e.tag}`.toLowerCase().includes(term));
 cards.replaceChildren();
 for(const entry of shown){
  const card=document.createElement(entry.game?'button':'a');card.className='card';
  if(entry.game){card.type='button';card.addEventListener('click',()=>openGame(entry.game,entry.name));}
  else {card.href=entry.url;if(!entry.url.startsWith('/')){card.target='_blank';card.rel='noopener noreferrer';}}
  const cover=document.createElement('div');cover.className='cover';cover.style.setProperty('--cover',entry.color);
  const tag=document.createElement('span');tag.className='cover-tag';tag.textContent=entry.tag;
  const art=document.createElement('span');art.className='cover-word';art.textContent=entry.art;art.setAttribute('aria-hidden','true');cover.append(art,tag);
  const body=document.createElement('div');body.className='card-body';
  const title=document.createElement('h3');title.textContent=entry.name;
  const desc=document.createElement('p');desc.textContent=entry.desc;
  const action=document.createElement('span');action.className='card-action';action.append(entry.action);
  const arrow=document.createElement('span');arrow.textContent=entry.game?'→':'↗';action.append(arrow);body.append(title,desc,action);card.append(cover,body);cards.append(card);
 }
 document.querySelector('#count').textContent=`${shown.length} discoveries`;
 document.querySelector('#empty').hidden=shown.length>0;
}
document.querySelector('#search').addEventListener('input',render);
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});render();}));render();
const modal=document.querySelector('#arcade'),canvas=document.querySelector('#game'),ctx=canvas.getContext('2d'),status=document.querySelector('#status');
let kind,frame=0,last=0,elapsed=0,running=false,state={},held=new Set(),resumeAfterTab=false;
const rules={dash:'Jump with Space, ↑, or a tap on the game. Clear the spikes. Your speed increases as you go.',snake:'Use the arrow keys or the buttons below. Eat the fruit; avoid the walls and your own tail.',bricks:'Move with ← / →, your mouse, or drag on the game. Clear every brick without dropping the ball.'};
function openGame(game,name){kind=game;document.querySelector('#game-title').textContent=name;document.querySelector('#instructions').textContent=rules[kind];modal.showModal();reset();draw();document.querySelector('#start').focus();}
function stop(){running=false;cancelAnimationFrame(frame);held.clear();resumeAfterTab=false;}
modal.addEventListener('close',stop);document.querySelector('#close').onclick=()=>modal.close();
function reset(){stop();last=0;elapsed=0;state={score:0};status.textContent='Ready? Press Start game.';document.querySelector('#start').textContent='Start game';
 if(kind==='dash')Object.assign(state,{y:310,vy:0,spikes:[],spawn:1.25,distance:0});
 if(kind==='snake'){Object.assign(state,{snake:[{x:8,y:10},{x:7,y:10},{x:6,y:10}],dir:{x:1,y:0},next:{x:1,y:0}});placeFruit();}
 if(kind==='bricks')Object.assign(state,{paddle:300,x:360,y:310,vx:190,vy:-220,bricks:Array.from({length:40},(_,i)=>({x:35+(i%10)*66,y:45+Math.floor(i/10)*30,alive:true}))});
}
function placeFruit(){const free=[];for(let x=0;x<36;x++)for(let y=0;y<20;y++)if(!state.snake.some(p=>p.x===x&&p.y===y))free.push({x,y});if(!free.length){finish('Garden complete!');return;}state.fruit=free[Math.floor(Math.random()*free.length)];}
function finish(message){running=false;status.textContent=`${message} Score: ${state.score}`;document.querySelector('#start').textContent='Play again';}
function start(){reset();running=true;status.textContent='Score: 0';document.querySelector('#start').textContent='Restart';canvas.focus();frame=requestAnimationFrame(loop);}
document.querySelector('#start').onclick=start;
function control(key){if(!running)return;if(kind==='dash'&&(key==='Space'||key==='ArrowUp')&&state.y>=310)state.vy=-610;
 if(kind==='snake'){const dirs={ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1},ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0}};const d=dirs[key];if(d&&(d.x!==-state.dir.x||d.y!==-state.dir.y))state.next=d;}}
window.addEventListener('keydown',event=>{if(!modal.open||!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(event.code))return;event.preventDefault();held.add(event.code);if(!event.repeat)control(event.code);});
window.addEventListener('keyup',event=>held.delete(event.code));window.addEventListener('blur',()=>held.clear());
document.querySelectorAll('[data-key]').forEach(button=>{button.addEventListener('pointerdown',event=>{event.preventDefault();button.setPointerCapture(event.pointerId);held.add(button.dataset.key);control(button.dataset.key);});for(const event of ['pointerup','pointercancel','lostpointercapture'])button.addEventListener(event,()=>held.delete(button.dataset.key));});
function movePaddle(event){if(kind==='bricks'&&running){const rect=canvas.getBoundingClientRect();state.paddle=Math.max(0,Math.min(610,(event.clientX-rect.left)*720/rect.width-55));}}
canvas.addEventListener('pointermove',movePaddle);canvas.addEventListener('pointerdown',event=>{canvas.setPointerCapture(event.pointerId);movePaddle(event);control('Space');});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&running){resumeAfterTab=true;cancelAnimationFrame(frame);held.clear();}else if(!document.hidden&&resumeAfterTab&&modal.open){resumeAfterTab=false;last=0;frame=requestAnimationFrame(loop);}});
function loop(time){if(!running)return;const dt=last?Math.min((time-last)/1000,.035):0;last=time;
 if(kind==='dash'){
  state.distance+=dt;state.score=Math.floor(state.distance*10);state.vy+=1600*dt;state.y=Math.min(310,state.y+state.vy*dt);if(state.y===310)state.vy=0;
  state.spawn-=dt;if(state.spawn<=0){state.spikes.push({x:750});state.spawn=1.05+Math.random()*.8;}
  for(const spike of state.spikes){spike.x-=(290+Math.min(state.distance*3,180))*dt;if(spike.x<132&&spike.x+27>105&&state.y+30>324)finish('Spike hit. Try another run!');}state.spikes=state.spikes.filter(p=>p.x>-40);
 }else if(kind==='snake'){
  elapsed+=dt;if(elapsed>=Math.max(.07,.14-state.score*.002)){elapsed=0;state.dir=state.next;const head={x:state.snake[0].x+state.dir.x,y:state.snake[0].y+state.dir.y};const eat=head.x===state.fruit.x&&head.y===state.fruit.y;const body=eat?state.snake:state.snake.slice(0,-1);
   if(head.x<0||head.x>=36||head.y<0||head.y>=20||body.some(p=>p.x===head.x&&p.y===head.y)){finish('End of the trail.');}else{state.snake.unshift(head);if(eat){state.score++;placeFruit();}else state.snake.pop();}}
 }else{
  if(held.has('ArrowLeft'))state.paddle-=430*dt;if(held.has('ArrowRight'))state.paddle+=430*dt;state.paddle=Math.max(0,Math.min(610,state.paddle));
  state.x+=state.vx*dt;state.y+=state.vy*dt;if(state.x<8){state.x=8;state.vx=Math.abs(state.vx);}if(state.x>712){state.x=712;state.vx=-Math.abs(state.vx);}if(state.y<8){state.y=8;state.vy=Math.abs(state.vy);}
  if(state.vy>0&&state.y>=350&&state.y<=367&&state.x>=state.paddle-5&&state.x<=state.paddle+115){state.y=349;state.vy=-Math.abs(state.vy);state.vx=(state.x-(state.paddle+55))*5;}
  for(const b of state.bricks)if(b.alive&&state.x+7>b.x&&state.x-7<b.x+58&&state.y+7>b.y&&state.y-7<b.y+20){b.alive=false;state.vy=-state.vy;state.score+=10;break;}
  if(state.y>410)finish('Ball dropped. Give it another go!');else if(state.bricks.every(b=>!b.alive))finish('Board cleared!');
 }
 if(running)status.textContent=`Score: ${state.score}`;draw();if(running)frame=requestAnimationFrame(loop);
}
function draw(){ctx.fillStyle='#111b17';ctx.fillRect(0,0,720,400);ctx.strokeStyle='#203426';ctx.lineWidth=1;for(let x=0;x<720;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,400);ctx.stroke();}for(let y=0;y<400;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(720,y);ctx.stroke();}
 if(kind==='dash'){ctx.fillStyle='#60734c';ctx.fillRect(0,345,720,2);ctx.fillStyle='#d5ec93';ctx.fillRect(100,state.y,32,32);ctx.fillStyle='#24381d';ctx.fillRect(120,state.y+7,5,5);ctx.fillStyle='#d6a080';for(const p of state.spikes){ctx.beginPath();ctx.moveTo(p.x,345);ctx.lineTo(p.x+17,310);ctx.lineTo(p.x+34,345);ctx.fill();}}
 if(kind==='snake'){ctx.fillStyle='#d6a080';ctx.fillRect(state.fruit.x*20+3,state.fruit.y*20+3,14,14);state.snake.forEach((p,i)=>{ctx.fillStyle=i?'#8fad72':'#def5a9';ctx.fillRect(p.x*20+1,p.y*20+1,18,18);});}
 if(kind==='bricks'){state.bricks.forEach((b,i)=>{if(b.alive){ctx.fillStyle=['#d5ec93','#9fbd81','#91b9ae','#d6a080'][Math.floor(i/10)];ctx.fillRect(b.x,b.y,58,20);}});ctx.fillStyle='#d5ec93';ctx.fillRect(state.paddle,358,110,10);ctx.beginPath();ctx.arc(state.x,state.y,7,0,Math.PI*2);ctx.fill();}
}
