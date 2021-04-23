(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{71:function(e,t,n){"use strict";n.r(t);var c=n(2),s=n(1),r=n(33),o=n.n(r),i=n(0),a=function(e){var t=e.time;return Object(i.jsx)("div",{style:{borderRadius:"50%",background:"#fdf7e3",position:"absolute",top:"3%",right:"3%"},children:t})},u=function(e){var t=e.columnas,n=e.children;return Object(i.jsx)("div",{style:{display:"grid",gridTemplateColumns:"repeat("+t+", 1fr)",gridGap:"2em"},children:n})},d=function(e){var t=e.children;return Object(i.jsx)("div",{style:{display:"flex",flexDirection:"row",alignItems:"center",justifyItems:"center"},children:t})},j=function(e){var t=e.children;return Object(i.jsx)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",justifyItems:"center"},children:t})},l=n(9),b=n(34),f=n.n(b)()(),O=function(e){var t=e.personas,n=e.conectados,c=e.setId,r=e.setEstado,o=Object(l.useMediaQuery)({query:"(max-width: 1224px)"}),a=Object(l.useMediaQuery)({query:"(orientation: portrait)"});return Object(s.useEffect)((function(){f.once("conexion aceptada",(function(e){c(e),r("esperando")}))})),Object(i.jsx)(u,{columnas:o&&a?2:5,children:t.map((function(e){var t=!n.includes(e);return Object(i.jsx)("button",{onClick:function(){t&&f.emit("conectar",e)},style:{aspectRatio:"1/1",textDecoration:t?"none":"line-through"},children:e},e)}))})},p=function(e){var t=e.isHost,n=e.conectados,r=e.setId,o=e.setEstado,a=Object(s.useState)({Normales:!1,Rapidas:!1,Lentas:!1,Dobles:!1,Random:!1}),d=Object(c.a)(a,2),l=d[0],b=d[1];return Object(s.useEffect)((function(){fetch("/pools").then((function(e){return e.json()})).then((function(e){return b(e)})),f.on("set pools",b);var e=function(){r(""),o("eligiendo")};return f.on("desconectado",e),function(){f.off("set pools",b),f.off("desconectado",e)}})),Object(i.jsxs)(u,{columnas:3,children:[Object(i.jsx)(j,{children:n.map((function(e){return Object(i.jsxs)("p",{style:{aspectRatio:"1/1"},children:[" ",e," "]},e)}))}),Object(i.jsxs)(j,{children:[Object(i.jsx)("button",{onClick:function(){f.emit("desconectar")},children:"Cancelar"}),t&&Object(i.jsx)("button",{onClick:function(){f.emit("set pool",l),f.emit("start round")},children:"Empezar"})]}),Object(i.jsx)(j,{children:Object.keys(l).map((function(e){return Object(i.jsx)("button",{onClick:function(){t&&f.emit("toggle pool",e)},style:{textDecoration:l[e]?"none":"line-through"},children:e},e)}))})]})},h=function(e){var t=e.resultados,n=e.isHost,c=Object(l.useMediaQuery)({query:"(max-width: 1224px)"}),s=Object(l.useMediaQuery)({query:"(orientation: portrait)"});return Object(i.jsxs)("div",{children:[Object(i.jsx)(u,{columnas:c&&s?2:5,children:t.map((function(e){return Object(i.jsx)("p",{children:e.nombre+" "+e.votos},e.nombre)}))}),n&&Object(i.jsx)("button",{onClick:function(){return f.emit("start round")},children:"Siguiente"})]})},x=function(e){var t=e.pregunta,n=e.time;return Object(i.jsxs)("div",{children:[Object(i.jsxs)(d,{children:[Object(i.jsx)("h1",{children:"Pregunta:"}),Object(i.jsxs)("h2",{children:[" ",t," "]})]}),Object(i.jsx)(a,{time:n})]})},m=function(e){var t=e.time,n=e.personas,r=e.setEstado,o=Object(s.useState)(""),u=Object(c.a)(o,2),d=u[0],j=u[1];return Object(s.useEffect)((function(){var e=function(){f.emit("respuesta",d),r("resultado")};return f.once("pedir respuestas",e),function(){return f.off("pedir respuestas",e)}})),Object(i.jsxs)("div",{children:[Object(i.jsx)(a,{time:t}),Object(i.jsx)("h1",{children:"Introduce la respuesta"}),Object(i.jsx)("ul",{children:n.map((function(e){return Object(i.jsx)("li",{children:Object(i.jsx)("button",{onClick:function(){return j(e)},style:{color:e===d?"green":"black"},children:e})},e)}))})]})},y=function(){var e=["Raul","Carlos","Elo","Cabriada","Kanian","Morilla","Candy","Carmen","Dan","Isa"],t="Carlos",n=Object(s.useState)(""),r=Object(c.a)(n,2),o=r[0],a=r[1],u=Object(s.useState)(""),d=Object(c.a)(u,2),j=d[0],l=d[1],b=Object(s.useState)([]),y=Object(c.a)(b,2),g=y[0],v=y[1],C=Object(s.useState)("eligiendo"),E=Object(c.a)(C,2),k=E[0],I=E[1],S=Object(s.useState)([]),D=Object(c.a)(S,2),R=D[0],w=D[1],M=Object(s.useState)(5),q=Object(c.a)(M,2),H=q[0],Q=q[1];return Object(s.useEffect)((function(){f.on("set conectados",(function(e){w(e)})),f.on("time left",(function(e){Q(e)})),f.on("timer done",(function(){I("respuesta")})),f.on("set pregunta",(function(e){l(e),I("pregunta")})),f.on("set resultados",(function(e){v(e)}))})),"eligiendo"===k?Object(i.jsx)(O,{personas:e,conectados:R,setId:a,setEstado:I}):"esperando"===k?Object(i.jsx)(p,{conectados:R,isHost:o===t,setId:a,setEstado:I}):"pregunta"===k?Object(i.jsx)(x,{pregunta:j,time:H}):"respuesta"===k?Object(i.jsx)(m,{time:H,personas:e,setEstado:I}):"resultado"===k?Object(i.jsx)(h,{resultados:g,isHost:o===t}):void 0};o.a.render(Object(i.jsx)(y,{}),document.getElementById("root"))}},[[71,1,2]]]);
//# sourceMappingURL=main.a925da79.chunk.js.map