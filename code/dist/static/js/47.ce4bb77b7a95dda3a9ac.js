webpackJsonp([47],{"3HCb":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a,n=i("bOdI"),s=i.n(n),o=i("ly8Z"),r=(a={props:{},data:function(){return{loading:!0,websock:null,noticeList:[],mess:""}},computed:{},watch:{$route:function(t,e,i){console.log("route1，周期created")}},created:function(){var t=this;this.$http.get("/teaching/message/conversationList").then(function(e){"0"==e.data.code?(t.noticeList=e.data.data.conversations,t.noticeList[0].unreadIdList?Array.isArray(t.noticeList)&&t.noticeList.length>0&&t.routeToChat(t.noticeList[0].conversationID,t.noticeList[0].targetName,t.noticeList[0].targetId,t.noticeList[0].unreadIdList):Array.isArray(t.noticeList)&&t.noticeList.length>0&&t.routeToChat(t.noticeList[0].conversationID,t.noticeList[0].targetName,t.noticeList[0].targetId,[])):t.$message({message:e.data.msg,type:"error"}),t.loading=!1}).catch(function(t){console.log(t)})},mounted:function(){}},s()(a,"watch",{}),s()(a,"methods",{routeToChat:function(t,e,i,a){this.$router.push({path:"/myNotice/"+t,query:{targetName:e,targetId:i,unreadIdList:a}})}}),s()(a,"components",{spin:o.a}),a),c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page"},[a("div",{staticClass:"title"},[t._v("\n        我的通知\n    ")]),t._v(" "),a("div",{staticClass:"content"},[t.loading||0!=t.noticeList.length?t._e():a("div",{staticClass:"empty"},[a("img",{attrs:{src:i("dF1d"),alt:""}}),t._v(" "),a("p",[t._v("暂无通知~")])]),t._v(" "),a("spin",{attrs:{loading:t.loading}}),t._v(" "),0!=t.noticeList.length?a("div",{staticClass:"leftList"},[a("div",{staticClass:"leftTitle"},[t._v("近期消息")]),t._v(" "),a("ul",t._l(t.noticeList,function(e,n){return a("li",{key:n,on:{click:function(i){return t.routeToChat(e.conversationID,e.targetName,e.targetId,this.noticeList[0].unreadIdList)}}},[a("el-badge",{staticStyle:{width:"100%"},attrs:{value:e.unreadCount,hidden:0==e.unreadCount}},[e.targetHeadUrl?a("img",{attrs:{src:e.targetHeadUrl,alt:""}}):a("img",{attrs:{src:i("Bmo4"),alt:""}}),t._v(" "),a("span",{staticClass:"description"},[a("p",[t._v(t._s(e.targetName))]),t._v(" "),a("p",[t._v(t._s(e.content))])])])],1)}),0)]):t._e(),t._v(" "),0!=t.noticeList.length?a("div",{staticClass:"rightChat"},[a("router-view")],1):t._e()],1)])},staticRenderFns:[]};var d=i("VU/8")(r,c,!1,function(t){i("qerP")},"data-v-03d56fea",null);e.default=d.exports},qerP:function(t,e){}});
//# sourceMappingURL=47.ce4bb77b7a95dda3a9ac.js.map