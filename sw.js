if(!self.define){let e,i={};const n=(n,o)=>(n=new URL(n+".js",o).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(o,s)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(i[d])return;let r={};const c=e=>n(e,d),f={module:{uri:d},exports:r,require:c};i[d]=Promise.all(o.map((e=>f[e]||c(e)))).then((e=>(s(...e),r)))}}define(["./workbox-7369c0e1"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/Home-67750691.js",revision:null},{url:"assets/index-a58446d3.js",revision:null},{url:"assets/index-f1843043.css",revision:null},{url:"index.html",revision:"8b0da3677b416d4684f02f67eaabffad"},{url:"./robots.txt",revision:"5acf12609014c8568dd9e9914d94feff"},{url:"./composite-result-template.docx",revision:"9124cd6a8ede1552b119fd3cb5533aad"},{url:"./icons/android-icon-36x36.png",revision:"d3212f84fb0b73f774550e72b9277515"},{url:"./icons/android-icon-48x48.png",revision:"509ef5543da83533757994c1bf0ed36f"},{url:"./icons/android-icon-72x72.png",revision:"76dfc4f8f36a5bc6cded0fdd67b7dbd9"},{url:"./icons/android-icon-96x96.png",revision:"3b699376c269c87b29cdca9af342fc4c"},{url:"./icons/android-icon-144x144.png",revision:"94562ad2da5436cc479b021160d0d297"},{url:"./icons/android-icon-192x192.png",revision:"51b7ffff572385e522155b5a828a4f94"},{url:"manifest.webmanifest",revision:"1bfb261a53360ab6b092dca7ffb96dfb"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
