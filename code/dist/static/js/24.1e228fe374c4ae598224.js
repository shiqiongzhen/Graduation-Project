webpackJsonp([24],{"2jRC":function(t,a){},VMh5:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s={props:{},data:function(){return{navData:[{name:"教师管理",path:""},{name:"查看信息",path:"/super"},{name:"查看详情页",path:""}],user:{},list:[],searchContent:"",status:"全部",paginations:{page_current:1,page_size:5,total:0}}},computed:{},created:function(){this.handleCurrentChange()},mounted:function(){},watch:{},methods:{statusAll:function(){this.status="全部",this.handleCurrentChange()},statusDoing:function(){this.status=0,this.handleCurrentChange()},statusOver:function(){this.status=3,this.handleCurrentChange()},handleCurrentChange:function(t){var a=this,e="";e="全部"==this.status?"/teaching/admin/teacher/teacherInfo?page="+this.paginations.page_current+"&size="+this.paginations.page_size+"&teacherId="+this.$route.params.teacherId+"&keyword="+this.searchContent:"/teaching/admin/teacher/teacherInfo?page="+this.paginations.page_current+"&size="+this.paginations.page_size+"&teacherId="+this.$route.params.teacherId+"&keyword="+this.searchContent+"&status="+this.status,this.$http.get(e).then(function(t){"0"==t.data.code?(a.user=t.data.data.user,a.list=t.data.data.list,a.paginations.total=t.data.data.total):a.$message({message:t.data.msg,type:"error"})}).catch(function(t){console.log(t)})},handleSizeChange:function(){}},components:{breadCrumb:e("ZmIX").a}},n={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"page"},[s("div",{staticClass:"head"},[s("breadCrumb",{attrs:{data:t.navData}}),t._v(" "),s("div",{staticClass:"item"},[s("div",{staticClass:"user"},[s("span",[s("img",{attrs:{src:t.user.headUrl,alt:""}}),t._v("姓名: "+t._s(t.user.nickname))]),t._v(" "),s("el-button",{attrs:{type:"primary",size:"small"}},[t._v("主操作")])],1),t._v(" "),s("p",[s("span",{staticClass:"label"},[t._v("教师工号：")]),t._v(t._s(t.user.userNumber))])])],1),t._v(" "),s("div",{staticClass:"container"},[s("div",{staticClass:"filteBar"},[s("span",{staticClass:"leftTitle"},[t._v("课程列表")]),t._v(" "),s("div",[s("el-button-group",[s("el-button",{class:"全部"==t.status?"statusBlue":"",attrs:{size:"small"},on:{click:function(a){return t.statusAll()}}},[t._v("全部")]),t._v(" "),s("el-button",{class:"0"==t.status?"statusBlue":"",attrs:{size:"small"},on:{click:function(a){return t.statusDoing()}}},[t._v("进行中")]),t._v(" "),s("el-button",{class:"3"==t.status?"statusBlue":"",attrs:{size:"small"},on:{click:function(a){return t.statusOver()}}},[t._v("已结束")])],1),t._v(" "),s("el-input",{attrs:{size:"small",placeholder:"根据姓名搜索","suffix-icon":"el-icon-search"},on:{change:t.handleCurrentChange},model:{value:t.searchContent,callback:function(a){t.searchContent=a},expression:"searchContent"}})],1)]),t._v(" "),s("div",{staticClass:"content"},[t._l(t.list,function(a,n){return s("div",{key:n},[s("a",{staticClass:"item",attrs:{href:""}},[s("span",{staticClass:"intro"},[""!=a.courseCover?s("img",{attrs:{src:a.courseCover,alt:""}}):s("img",{attrs:{src:e("fZz7"),alt:""}}),t._v(" "),s("span",{staticClass:"description"},[s("p",[t._v(t._s(a.courseName))]),t._v(" "),s("p",[t._v(t._s(a.courseIntroduction))])])]),t._v(" "),s("span",{staticClass:"time"},[s("p",[t._v("开始时间")]),t._v(" "),s("p",[t._v(t._s(a.createTime))])]),t._v(" "),s("span",{staticClass:"link"},[t._v("\n                        编辑\n                    ")])])])}),t._v(" "),s("el-pagination",{attrs:{layout:"prev, pager, next, jumper",total:t.paginations.total,"page-size":t.paginations.page_size,"current-page":t.paginations.page_current},on:{"update:currentPage":function(a){return t.$set(t.paginations,"page_current",a)},"update:current-page":function(a){return t.$set(t.paginations,"page_current",a)},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],2)])])},staticRenderFns:[]};var i=e("VU/8")(s,n,!1,function(t){e("2jRC")},"data-v-71f8d8bc",null);a.default=i.exports}});
//# sourceMappingURL=24.1e228fe374c4ae598224.js.map