(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{71:function(e,t,n){"use strict";n.r(t);var c=n(2),o=n(1),s=n(33),r=n.n(s),i=n(0),u=function(e){var t=e.time;return Object(i.jsx)("div",{style:{background:"#fdf7e3",position:"sticky",top:"0",right:"0",width:"10%",height:"10%"},children:t})},a=function(e){var t=e.columnas,n=e.children;return Object(i.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat("+t+", 1fr)",gridGap:"20px"},children:n})},d=n(8),j=n(34),l=n.n(j)()(),b=function(e){var t=e.personas,n=e.conectados,c=e.setId,s=e.setEstado,r=Object(d.useMediaQuery)({query:"(max-width: 1224px)"}),u=Object(d.useMediaQuery)({query:"(orientation: portrait)"});return Object(o.useEffect)((function(){l.once("conexion aceptada",(function(e){c(e),s("esperando")}))})),Object(i.jsx)(a,{columnas:r&&u?2:5,children:t.map((function(e){var t=!n.includes(e);return Object(i.jsx)("button",{onClick:function(){t&&l.emit("conectar",e)},style:{aspectRatio:"1/1",textDecoration:t?"none":"line-through"},children:e},e)}))})},f=function(e){var t=e.isHost,n=e.conectados,s=e.setId,r=e.setEstado,u=Object(o.useState)("normales"),j=Object(c.a)(u,2),b=j[0],f=j[1],O=Object(o.useState)([]),h=Object(c.a)(O,2),p=h[0],x=h[1],m=Object(d.useMediaQuery)({query:"(max-width: 1224px)"}),g=Object(d.useMediaQuery)({query:"(orientation: portrait)"});return Object(o.useEffect)((function(){fetch("/pools").then((function(e){return e.json()})).then((function(e){return x(e)})),l.on("set pool",f);var e=function(){s(""),r("eligiendo")};return l.on("desconectado",e),function(){l.off("set pool",f),l.off("desconectado",e)}}),[s,r]),Object(i.jsxs)("div",{children:[Object(i.jsx)(a,{columnas:m&&g?2:5,children:n.map((function(e){return Object(i.jsx)("button",{style:{aspectRatio:"1/1"},children:e},e)}))}),Object(i.jsxs)("p",{children:[Object(i.jsx)("button",{onClick:function(){l.emit("desconectar")},children:"Cancelar"}),t&&Object(i.jsxs)("div",{children:[Object(i.jsx)("button",{onClick:function(){l.emit("set pool",b),l.emit("start round")},children:"Empezar"}),Object(i.jsx)("select",{onChange:function(e){f(e.target.value)},children:p.map((function(e){return Object(i.jsx)("option",{children:e},e)}))})]})]})]})},O=function(e){var t=e.resultados,n=e.isHost;t.sort((function(e,t){return t.votos-e.votos}));var s=t[0].votos,r=window.innerWidth/(s+2),u=Object(o.useState)(!1),a=Object(c.a)(u,2),d=a[0],j=a[1];return Object(o.useEffect)((function(){fetch("/preguntas").then((function(e){return e.json()})).then((function(e){j(e.length>0),console.log(e)}))}),[]),Object(i.jsxs)("div",{children:[Object(i.jsx)("div",{style:{display:"flex",flexDirection:"column"},children:t.map((function(e,t){return Object(i.jsxs)("div",{style:{textAlign:"center",display:"flex",flexDirection:"row",width:"100%",margin:"1em"},children:[Object(i.jsx)("p",{style:{width:r},children:e.nombre+(0===t?"\ud83e\udd47":1===t?"\ud83e\udd48":2===t?"\ud83e\udd49":"")}),Object(i.jsx)("div",{style:{width:r*s},children:Object(i.jsx)("div",{style:{width:r*e.votos,height:"100%",background:"#07820b",borderRadius:"25px"}})}),Object(i.jsx)("p",{style:{width:r},children:e.votos})]},e.nombre)}))}),n&&d&&Object(i.jsx)("button",{onClick:function(){return l.emit("start round")},children:"Siguiente"})]})},h=function(e){var t=e.pregunta,n=e.time;return Object(i.jsxs)("div",{children:[Object(i.jsx)(u,{time:n}),Object(i.jsxs)("p",{style:{borderRadius:"25px",top:"40%",padding:"2em",textAlign:"center",backgroundImage:"url(./bush.png)",fontSize:"larger"},children:[Object(i.jsx)("h1",{children:"Pregunta:"}),Object(i.jsxs)("h2",{children:[" ",t," "]})]})]})},p=function(e){var t=e.time,n=e.conectados,s=e.setEstado,r=Object(o.useState)(""),j=Object(c.a)(r,2),b=j[0],f=j[1],O=Object(d.useMediaQuery)({query:"(max-width: 1224px)"}),h=Object(d.useMediaQuery)({query:"(orientation: portrait)"});return Object(o.useEffect)((function(){var e=function(){l.emit("respuesta",b),s("resultado")};return l.once("pedir respuestas",e),function(){return l.off("pedir respuestas",e)}})),Object(i.jsxs)("div",{children:[Object(i.jsx)(u,{time:t}),Object(i.jsx)("h1",{children:"Introduce la respuesta"}),Object(i.jsx)(a,{columnas:O&&h?2:5,children:n.map((function(e){return Object(i.jsx)("button",{style:{aspectRatio:"1/1",backgroundColor:e===b?"green":"rgb(239, 239, 239)"},onClick:function(){return f(e)},children:e},e)}))})]})},x=function(){var e=Object(o.useState)([]),t=Object(c.a)(e,2),n=t[0],s=t[1],r="Carlos",u=Object(o.useState)(""),a=Object(c.a)(u,2),d=a[0],j=a[1],x=Object(o.useState)(""),m=Object(c.a)(x,2),g=m[0],v=m[1],y=Object(o.useState)([]),w=Object(c.a)(y,2),E=w[0],S=w[1],k=Object(o.useState)("eligiendo"),C=Object(c.a)(k,2),I=C[0],q=C[1],M=Object(o.useState)([]),Q=Object(c.a)(M,2),R=Q[0],H=Q[1],D=Object(o.useState)(5),z=Object(c.a)(D,2),A=z[0],J=z[1];return Object(o.useEffect)((function(){fetch("/usuarios").then((function(e){return e.json()})).then((function(e){return s(e)})),window.onbeforeunload=function(){l.disconnect()},l.on("set conectados",(function(e){H(e)})),l.on("time left",(function(e){J(e)})),l.on("timer done",(function(){q("respuesta")})),l.on("set pregunta",(function(e){v(e),q("pregunta")})),l.on("set resultados",(function(e){S(e)}))})),"eligiendo"===I?Object(i.jsx)(b,{personas:n,conectados:R,setId:j,setEstado:q}):"esperando"===I?Object(i.jsx)(f,{conectados:R,isHost:d===r,setId:j,setEstado:q}):"pregunta"===I?Object(i.jsx)(h,{pregunta:g,time:A}):"respuesta"===I?Object(i.jsx)(p,{time:A,conectados:n,setEstado:q}):"resultado"===I?Object(i.jsx)(O,{resultados:E,isHost:d===r}):void 0};r.a.render(Object(i.jsx)(x,{}),document.getElementById("root"))}},[[71,1,2]]]);
//# sourceMappingURL=main.07d207da.chunk.js.map