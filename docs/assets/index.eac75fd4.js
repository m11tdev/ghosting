import{t as d,s as v,r as _,o as n,c as l,a as o,b as y,d as c,w as m,v as w,e as p,f as b,F as g,g as I}from"./vendor.1c4e6549.js";const k=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}};k();var f=(t,r)=>{const i=t.__vccOpts||t;for(const[a,e]of r)i[a]=e;return i};const A={name:"StopWatch",props:{count:{type:Number,required:!0}},computed:{hours(){const t=Math.floor(this.count/3600);return t<10?`0${t}`:t},minutes(){const t=Math.floor(this.count/60-this.hours*60);return t<10?`0${t}`:t},seconds(){const t=this.count-this.hours*60*60-this.minutes*60;return t<10?`0${t}`:t}}};function x(t,r,i,a,e,s){return d(s.minutes)+":"+d(s.seconds)}var T=f(A,[["render",x]]);const S={name:"HomePage",components:{StopWatch:T},data(){return{count:0,random:-1,play:!1,buttonText:"Go",interval:3,timerInterval:"",ghostInterval:"",showArrows:!1,flickerTimeout:"",countdownInterval:"",beeps:!0}},computed:{fl(){return this.random>=0&&this.random<=1},fr(){return this.random>1&&this.random<=2},ml(){return this.random>2&&this.random<=3},mr(){return this.random>3&&this.random<=4},bl(){return this.random>4&&this.random<=5},br(){return this.random>5&&this.random<=6}},methods:{ghost(){clearInterval(this.ghostInterval),this.flickerArrows(),this.playBeep(),this.random=Math.random()*6,this.ghostInterval=setInterval(()=>{this.random=Math.random()*6,this.flickerArrows(),this.playBeep()},this.interval*1e3)},togglePlay(){if(this.play=!this.play,clearInterval(this.countdownInterval),clearInterval(this.timerInterval),clearInterval(this.ghostInterval),clearTimeout(this.flickerTimeout),this.play){let t=5;this.buttonText=t,setTimeout(()=>{this.showArrows=!1},4500),this.countdownInterval=setInterval(()=>{t>1?(t--,this.buttonText=t):(clearInterval(this.countdownInterval),this.buttonText="Stop",this.timerInterval=setInterval(()=>{this.count++},1e3),this.ghost())},1e3)}else this.buttonText="Go"},flickerArrows(){this.showArrows=!0,this.flickerTimeout=setTimeout(()=>{this.showArrows=!1},this.interval*1e3-500)},playBeep(){if(!this.beeps)return;const t=document.querySelector("audio.beep");t.currentTime=0,t.play()}},watch:{interval(){this.play&&this.togglePlay()}},mounted(){const t=new v,r=()=>{t.enable(),document.removeEventListener("touchstart",r,!1)};document.addEventListener("touchstart",r,!1)}},N={class:"stopwatch"},B={class:"arrows"},L={key:0,class:"fl"},M={key:1,class:"fr"},P={key:2,class:"ml"},V={key:3,class:"mr"},O={key:4,class:"bl"},C={key:5,class:"br"},E={class:"play"},W={class:"beeps"},q=p(" Beeps "),F=["checked"],D=o("div",{class:"toggle"},null,-1),G=o("audio",{class:"beep",src:"src/assets/beep.mp3"},null,-1),U={class:"range"};function H(t,r,i,a,e,s){const u=_("StopWatch");return n(),l(g,null,[o("div",N,[y(u,{count:e.count},null,8,["count"])]),o("div",B,[s.fl&&e.showArrows?(n(),l("div",L)):c("",!0),s.fr&&e.showArrows?(n(),l("div",M)):c("",!0),s.ml&&e.showArrows?(n(),l("div",P)):c("",!0),s.mr&&e.showArrows?(n(),l("div",V)):c("",!0),s.bl&&e.showArrows?(n(),l("div",O)):c("",!0),s.br&&e.showArrows?(n(),l("div",C)):c("",!0)]),o("div",E,[o("button",{onClick:r[0]||(r[0]=(...h)=>s.togglePlay&&s.togglePlay(...h))},d(e.buttonText),1)]),o("div",W,[o("label",null,[q,m(o("input",{"onUpdate:modelValue":r[1]||(r[1]=h=>e.beeps=h),type:"checkbox",name:"beeps",checked:e.beeps},null,8,F),[[w,e.beeps]]),D]),G]),o("div",U,[o("label",null,[p(" Interval: "+d(e.interval)+"s ",1),m(o("input",{"onUpdate:modelValue":r[2]||(r[2]=h=>e.interval=h),type:"range",name:"interval",id:"interval",min:"1",max:"10"},null,512),[[b,e.interval]])])])],64)}var K=f(S,[["render",H]]);I(K).mount("#app");
