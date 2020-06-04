<template>
     <div class="page">
            <div class="header">
                <div class="containner">
                    <img v-if="courseCover!=''" :src="courseCover">
                    <img v-if="courseCover==''" src="@/assets/image/logo/logo100.png"> 
                    <h2>{{courseName}}</h2>
                </div>
            </div>
            
            <div class="containner">
                <el-row>
                    <el-col :span="4">
                        <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo" router>
                        <el-menu-item index="1" :route="'/admin/courseList/experiment/'+this.$route.params.courseId">
                            <i class="el-icon-date"></i>
                            <span slot="title">实验</span>
                        </el-menu-item>
                        <el-menu-item index="2" :route="'/admin/courseList/resource/'+this.$route.params.courseId">
                            <i class="el-icon-folder-opened"></i>
                            <span slot="title">资源</span>
                        </el-menu-item>
                        <el-menu-item index="3" :route="'/admin/courseList/detail/'+this.$route.params.courseId">
                            <i class="el-icon-document-copy"></i>
                            <span slot="title">课程详情</span>
                        </el-menu-item>
                        <el-menu-item index="4" :route="'/admin/courseList/manage/'+this.$route.params.courseId">
                            <i class="el-icon-medal-1"></i>
                            <span slot="title">学生管理</span>
                        </el-menu-item>
                        <el-menu-item index="5" :route="'/admin/courseList/score/'+this.$route.params.courseId">
                            <i class="el-icon-edit-outline"></i>
                            <span slot="title">实验打分</span>
                        </el-menu-item>
                        </el-menu>
                    </el-col>
                    <el-col :span="20">
                        <router-view></router-view>
                    </el-col>
                </el-row>
            </div>
     </div>
 </template>
 
 <script>
 export default {
     props: {
 
     },
     data() {
         return {
             courseName: "",
             courseCover:""
         };
     },
     computed: {
 
     },
     created() {
        this.$http.get(`/teaching/teacher/course/detail/${this.$route.params.courseId}`
        ).then((res) => { 
            if(res.data.code == "0"){
                this.courseName = res.data.data.courseName
                this.courseCover = res.data.data.courseCover
            }else if (res.data.code == "1") {
                this.$router.push('/login'); 
            }else{
                this.$message({
                    message: res.data.msg,
                    type: 'error'
                });
            }
        })
        .catch(function (error) {
            console.log(error)
        })
     },
     mounted() {
 
     },
     watch: {
 
     },
     methods: {
     },
     components: {
 
     },
 };
 </script>
 
 <style scoped lang="scss">
 .page{
    padding:0;
    .header{
        height:120px;
        // background:#477CFE;
        margin-bottom: 30px;
        background: url('~@/assets/image/banner1.png') no-repeat;
        .containner{
            width: 60%;
            margin:0 auto;
            position: relative;
            height:120px;
            h2{
                position: absolute;
                bottom: 0px;
                left: 120px;
                margin-bottom: 0.5em;
                color:#FFFFFF;
            }
            img{
                position: absolute;
                bottom: -20px; 
                height:100px;
                width: 100px;
                z-index: 2;
                box-sizing: border-box;
                // padding: 2px;
                display: inline-block;
                border-radius: 4px;
                box-shadow: 0 2px 6px 0 #000000;
                // background: white;
                // border: 1px solid #ccc;
            }
        }
    }
    .containner{
        width: 60%;
        margin:0 auto;
    }
 }
 </style>
 