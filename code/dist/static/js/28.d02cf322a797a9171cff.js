webpackJsonp([28],{"cN5+":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s={props:{},data:function(){return{navData:[{name:"学生管理",path:"/admin/courseList/manage/"+this.$route.params.courseId},{name:"学生成绩详情",path:""}],tableData:[],score:"",nickName:"",headUrl:""}},computed:{},created:function(){var e=this;this.$http.get("/teaching/teacher/achievement/score/"+this.$route.params.courseId+"?userId="+this.$route.params.userId).then(function(t){"0"==t.data.code?(e.tableData=t.data.data.experiments,e.score=t.data.data.score,e.nickName=t.data.data.nickName,e.headUrl=t.data.data.headUrl):"1"==t.data.code?e.$router.push("/login"):e.$message({message:t.data.msg,type:"error"})}).catch(function(e){console.log(e)})},mounted:function(){},watch:{},methods:{routeToExperiment:function(e){this.$router.push("/admin/judge/"+this.$route.params.courseId+"/"+e.experimentId+"/"+this.$route.params.userId)},tableRowClassName:function(e){e.row;return e.rowIndex%2==0?"grey-row":""}},components:{breadCrumb:a("ZmIX").a}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page"},[a("breadCrumb",{attrs:{data:e.navData}}),e._v(" "),a("div",[a("div",{staticClass:"item"},[a("img",{staticClass:"headUrl",attrs:{src:e.headUrl,alt:""}}),e._v(" "),a("span",{staticClass:"description"},[a("span",[e._v(e._s(e.nickName))]),e._v(" "),a("div",[a("span",[e._v("总成绩")]),a("span",{staticClass:"score"},[e._v(e._s(e.score))]),e._v("/100")])])]),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{"header-cell-style":{background:"#F5F7FA"},data:e.tableData,"row-class-name":e.tableRowClassName}},[a("el-table-column",{attrs:{prop:"experimentName",label:"实验名称",width:"500"}}),e._v(" "),a("el-table-column",{attrs:{prop:"experimentAchievement",label:"成绩"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"score"},[e._v(e._s(t.row.experimentAchievement))])]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.routeToExperiment(t.row)}}},[e._v("\n                修改\n                ")])]}}])})],1)],1)],1)},staticRenderFns:[]};var n=a("VU/8")(s,r,!1,function(e){a("qu4W")},"data-v-5f184893",null);t.default=n.exports},qu4W:function(e,t){}});
//# sourceMappingURL=28.d02cf322a797a9171cff.js.map