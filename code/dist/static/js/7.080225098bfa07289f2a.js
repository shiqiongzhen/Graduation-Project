webpackJsonp([7],{XUvF:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s("mvHQ"),i=s.n(o),n={props:{},data:function(){var t=this.$route.query,e=t.targetName,s=t.targetId,o=t.unreadIdList;return{myHeadUrl:localStorage.getItem("headUrl")||"",websock:null,noticeList:[],targetName:e,targetId:s,unreadIdList:o,content:""}},computed:{},created:function(){this.initChat(),this.initWebSocket()},destroyed:function(){this.websock.close()},mounted:function(){},watch:{$route:function(t,e,s){console.log("route1",this.$route.params.chatId,this.$route.query.targetName),this.initData(),this.initChat(),this.initWebSocket()}},methods:{read:function(){if(console.log("read",this.unreadIdList),Array.isArray(this.unreadIdList)&&0!=this.unreadIdList.length){var t=i()({fromId:localStorage.getItem("userId")||"",toId:this.targetId,type:1,content:this.unreadIdList,timestamp:(new Date).getTime(),Describe:""});this.websock.send(t)}},initData:function(){var t=this.$route.query,e=t.targetName,s=t.targetId;this.websock=null,this.noticeList=[],this.targetName=e,this.targetId=s,this.content="",console.log("initData",this.noticeList)},initChat:function(){var t=this;this.$http.get("/teaching/message/conversation?page=1&size=10&conversationId="+this.$route.params.chatId).then(function(e){"0"==e.data.code?(t.noticeList=e.data.data,console.log("initChat",t.noticeList)):t.$message({message:e.data.msg,type:"error"})}).catch(function(t){console.log(t)})},initWebSocket:function(){console.log("initWebSocket");var t="/teaching/imserver/"+(localStorage.getItem("userId")||"");this.websock=new WebSocket(t),this.websock.onmessage=this.websocketonmessage,this.websock.onopen=this.websocketonopen,this.websock.onerror=this.websocketonerror,this.websock.onclose=this.websocketclose},websocketonopen:function(t){console.log("socket连接成功",t),this.read()},websocketonerror:function(t){console.log("连接错误",t),this.initWebSocket()},websocketonmessage:function(t){console.log("数据接收",t.data);var e=JSON.parse(t.data);e&&0==e.type?(this.content="",this.initChat()):e&&2==e.type?(this.content="",this.initChat()):this.$message({message:"发送失败，请重试！",type:"error"})},websocketsend:function(){console.log("数据发送",this.content);var t=i()({fromId:localStorage.getItem("userId")||"",toId:this.targetId,type:0,content:this.content,timestamp:(new Date).getTime(),Describe:""});this.websock.send(t)},websocketclose:function(t){console.log("断开连接",t)}},components:{}},a={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"page"},[o("div",{staticClass:"title"},[t._v(t._s(t.targetName))]),t._v(" "),o("ul",{staticClass:"chat"},t._l(t.noticeList.message,function(e,i){return o("li",{key:i},[0==e.fromMe?o("div",{staticClass:"left"},[t.noticeList.targetHeadUrl?o("img",{attrs:{src:t.noticeList.targetHeadUrl,alt:""}}):o("img",{attrs:{src:s("Bmo4"),alt:""}}),t._v(" "),o("span",{staticClass:"description"},[o("p",[t._v(t._s(e.time))]),t._v(" "),o("p",[t._v(t._s(e.content))])])]):o("div",{staticClass:"right"},[o("span",{staticClass:"description"},[o("p",[t._v(t._s(e.time))]),t._v(" "),o("p",[t._v(t._s(e.content))])]),t._v(" "),t.myHeadUrl?o("img",{attrs:{src:t.myHeadUrl,alt:""}}):o("img",{attrs:{src:s("Bmo4"),alt:""}})])])}),0),t._v(" "),o("div",{staticClass:"footer"},[o("el-input",{attrs:{placeholder:"回复一下吧",maxlength:"500","show-word-limit":"",autosize:{minRows:4,maxRows:4}},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}},[o("template",{slot:"append"},[o("el-button",{on:{click:function(e){return t.websocketsend()}}},[t._v("发送")])],1)],2)],1)])},staticRenderFns:[]};var c=s("VU/8")(n,a,!1,function(t){s("mA0c")},"data-v-67e8c9d9",null);e.default=c.exports},mA0c:function(t,e){},mvHQ:function(t,e,s){t.exports={default:s("qkKv"),__esModule:!0}},qkKv:function(t,e,s){var o=s("FeBl"),i=o.JSON||(o.JSON={stringify:JSON.stringify});t.exports=function(t){return i.stringify.apply(i,arguments)}}});
//# sourceMappingURL=7.080225098bfa07289f2a.js.map