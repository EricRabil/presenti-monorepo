(function(e){function t(t){for(var n,c,i=t[0],o=t[1],l=t[2],u=0,f=[];u<i.length;u++)c=i[u],Object.prototype.hasOwnProperty.call(a,c)&&a[c]&&f.push(a[c][0]),a[c]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n]);d&&d(t);while(f.length)f.shift()();return r.push.apply(r,l||[]),s()}function s(){for(var e,t=0;t<r.length;t++){for(var s=r[t],n=!0,i=1;i<s.length;i++){var o=s[i];0!==a[o]&&(n=!1)}n&&(r.splice(t--,1),e=c(c.s=s[0]))}return e}var n={},a={app:0},r=[];function c(t){if(n[t])return n[t].exports;var s=n[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,c),s.l=!0,s.exports}c.m=e,c.c=n,c.d=function(e,t,s){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(c.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(s,n,function(t){return e[t]}.bind(null,n));return s},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],o=i.push.bind(i);i.push=t,i=i.slice();for(var l=0;l<i.length;l++)t(i[l]);var d=o;r.push([0,"chunk-vendors"]),s()})({0:function(e,t,s){e.exports=s("cd49")},4678:function(e,t,s){var n={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-SG":"cdab","./en-SG.js":"cdab","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-nz":"6f50","./en-nz.js":"6f50","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-tw":"90ea","./zh-tw.js":"90ea"};function a(e){var t=r(e);return s(t)}function r(e){if(!s.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}a.keys=function(){return Object.keys(n)},a.resolve=r,e.exports=a,a.id="4678"},7892:function(e,t,s){"use strict";var n=s("dd38"),a=s.n(n);a.a},cd49:function(e,t,s){"use strict";s.r(t);s("e260"),s("e6cf"),s("cca6"),s("a79d");var n=s("2b0e"),a=s("ecee"),r=s("c074"),c=s("ad3d"),i=function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.presences.length>0?s("div",{staticClass:"status-holder"},e._l(e.presences,(function(t,n){return s("div",{key:n,staticClass:"presence-root"},[s("presenti-presence",{attrs:{effective:e.effective,presence:t}})],1)})),0):e._e()},o=[],l=s("d4ec"),d=s("bee2"),u=s("262e"),f=s("2caf"),j=s("9ab4"),b=s("60a3"),p=s("74dd"),h=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{class:["presence presenti-presence",{"presence-asset-only":e.assetOnly}]},[s("span",{staticClass:"presence-cta presence-cta-split"},[e._v(" "+e._s(e.title)+" "),"boolean"===typeof e.paused?s("font-awesome-icon",{attrs:{icon:["fa",e.paused?"pause":"play"]}}):e._e()],1),e.assetOnly?s("time-bar",{attrs:{stopped:!0===e.paused,start:e.start,end:e.end}}):e._e(),s("div",{class:["presence-detail",{"presence-single":e.assetOnly}]},[e.image?s("c-link",{staticClass:"asset-holder",attrs:{link:e.image.link}},[s("img",{staticClass:"detail-asset",attrs:{src:e.image.src,alt:"Image"}})]):e._e(),s("div",{staticClass:"detail-text"},[s("c-link",{staticClass:"detail-major",attrs:{link:e.largeText.link}},[e._v(" "+e._s(e.largeText.text)+" ")]),e._l(e.smallTexts,(function(t,n){var a=t.text,r=t.link;return s("c-link",{key:n,staticClass:"detail-minor",attrs:{link:r}},[e._v(" "+e._s(a)+" ")])})),e.assetOnly||e.start&&e.end?e._e():s("time-bar",{attrs:{stopped:!0===e.paused,start:e.start,end:e.end}})],2)],1),e.start&&e.end?s("time-bar",{attrs:{stopped:!0===e.paused,start:e.start,end:e.end}}):e._e()],1)},m=[],v=(s("4de4"),s("d81d"),s("4971")),y=s.n(v),g=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("span",[e.link?s("a",{attrs:{href:e.link,target:"_blank"}},[e._t("default")],2):e._t("default")],2)},k=[],O=function(e){Object(u["a"])(s,e);var t=Object(f["a"])(s);function s(){return Object(l["a"])(this,s),t.apply(this,arguments)}return s}(b["c"]);Object(j["a"])([Object(b["b"])()],O.prototype,"link",void 0),O=Object(j["a"])([b["a"]],O);var _=O,w=_,T=s("2877"),x=Object(T["a"])(w,g,k,!1,null,null,null),z=x.exports,D=(s("24df"),function(){var e=this,t=e.$createElement,s=e._self._c||t;return e.start?s("div",{staticClass:"time-bar"},[s("span",{staticClass:"timer-timestamp"},[e._v(e._s(e.currentTime))]),e.end?s("vue-slider",{attrs:{disabled:!0,value:e.progress}}):e._e(),e.end?s("span",{staticClass:"timer-timestamp"},[e._v(e._s(e.endTime))]):e._e()],1):e._e()}),S=[],C=s("c1df"),P=s.n(C),M=s("4623");M(P.a);var $=function(e){Object(u["a"])(s,e);var t=Object(f["a"])(s);function s(){var e;return Object(l["a"])(this,s),e=t.apply(this,arguments),e.progress=0,e.currentTime="00:00",e.endTime="00:00",e}return Object(d["a"])(s,[{key:"mounted",value:function(){var e=this;this.interval=setInterval((function(){!0!==e.stopped&&e.updateTime()}),1e3),this.updateTime()}},{key:"beforeDestroy",value:function(){clearInterval(this.interval)}},{key:"elapsed",value:function(){if(this.startDate){var e=P.a.duration(P()().diff(this.startDate)).humanize();return"for ".concat(e)}}},{key:"updateTime",value:function(){if(this.startDate)if(this.currentTime=P()(P()().diff(P()(this.startDate))).format("mm:ss"),this.endDate){var e=(Date.now()-this.startDate.getTime())/(this.endDate.getTime()-this.startDate.getTime())*100;e>=100&&(e=100),this.progress=e,this.endTime=P()(this.endDate.getTime()-this.startDate.getTime()).format("mm:ss"),this.progress>=100&&(this.currentTime=this.endTime)}else this.currentTime=this.elapsed()}},{key:"startDate",get:function(){return this.start?new Date(this.start):null}},{key:"endDate",get:function(){return this.end?new Date(this.end):null}}]),s}(b["c"]);Object(j["a"])([Object(b["b"])()],$.prototype,"start",void 0),Object(j["a"])([Object(b["b"])()],$.prototype,"end",void 0),Object(j["a"])([Object(b["b"])()],$.prototype,"stopped",void 0),$=Object(j["a"])([Object(b["a"])({components:{VueSlider:y.a}})],$);var E=$,J=E,N=(s("da7e"),Object(T["a"])(J,D,S,!1,null,null,null)),I=N.exports,q=function(e){Object(u["a"])(s,e);var t=Object(f["a"])(s);function s(){return Object(l["a"])(this,s),t.apply(this,arguments)}return Object(d["a"])(s,[{key:"image",get:function(){return"string"===typeof this.presence.image?{src:this.presence.image}:this.presence.image}},{key:"largeText",get:function(){return"string"===typeof this.presence.largeText?{text:this.presence.largeText}:this.presence.largeText}},{key:"smallTexts",get:function(){return this.presence.smallTexts&&Array.isArray(this.presence.smallTexts)?this.presence.smallTexts.map((function(e){return"string"===typeof e?{text:e}:e})):[]}},{key:"paused",get:function(){return this.presence.isPaused}},{key:"gradient",get:function(){return"boolean"===typeof this.presence.gradient?{enabled:this.presence.gradient}:this.presence.gradient}},{key:"title",get:function(){return this.presence.title}},{key:"assetOnly",get:function(){var e,t;return(null===(e=this.image)||void 0===e?void 0:e.src)&&!(null===(t=this.largeText)||void 0===t?void 0:t.text)&&0===this.smallTexts.filter((function(e){return!!e&&!!e.text})).length}},{key:"start",get:function(){var e;return null===(e=this.presence.timestamps)||void 0===e?void 0:e.start}},{key:"end",get:function(){var e;return null===(e=this.presence.timestamps)||void 0===e?void 0:e.stop}}]),s}(b["c"]);Object(j["a"])([Object(b["b"])()],q.prototype,"presence",void 0),q=Object(j["a"])([Object(b["a"])({components:{CLink:z,VueSlider:y.a,TimeBar:I}})],q);var A=q,G=A,L=Object(T["a"])(G,h,m,!1,null,null,null),U=L.exports,V=function(e){Object(u["a"])(s,e);var t=Object(f["a"])(s);function s(){var e;return Object(l["a"])(this,s),e=t.apply(this,arguments),e.presences=[],e.presenceState={},e.stream=null,e.effective=Date.now(),e}return Object(d["a"])(s,[{key:"created",value:function(){this.respawnSocket()}},{key:"respawnSocket",value:function(){var e=this;this.stream=new p["PresenceStream"](this.scope,{url:this.url}),this.stream.on("presence",(function(t){e.presences=t})),this.stream.on("state",(function(t){e.presenceState=t})),this.stream.connect()}},{key:"mounted",value:function(){this.$watch("presence",(function(e){window.parent.postMessage(JSON.stringify({presence:e}),"*")})),this.$watch("state",(function(e){window.parent.postMessage(JSON.stringify({state:e}),"*")}))}}]),s}(b["c"]);Object(j["a"])([Object(b["b"])()],V.prototype,"url",void 0),Object(j["a"])([Object(b["b"])()],V.prototype,"scope",void 0),V=Object(j["a"])([Object(b["a"])({components:{PresentiPresence:U}})],V);var B=V,F=B,H=(s("7892"),Object(T["a"])(F,i,o,!1,null,null,null)),K=H.exports;a["c"].add(r["b"],r["a"]),n["default"].component("font-awesome-icon",c["a"]),n["default"].config.productionTip=!1,window.mountPresenti=function(e,t,s){new K({propsData:{scope:e,url:t}}).$mount(s)}},da7e:function(e,t,s){"use strict";var n=s("fccb"),a=s.n(n);a.a},dd38:function(e,t,s){},fccb:function(e,t,s){}});
//# sourceMappingURL=app.a8733d34.js.map