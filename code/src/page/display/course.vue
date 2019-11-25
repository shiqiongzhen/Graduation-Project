<template>
     <div class="page">
            <div class="header">
                <div class="containner">
                    <img src="@/assets/image/logo/logo100.png"/>
                    <h2>{{courseName}}</h2>
                </div>
            </div>
            
            <div class="containner">
                <el-row>
                    <el-col :span="4">
                        <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo" router>
                        <el-menu-item index="1" :route="'/courseList/experiment/'+this.$route.params.detailId">
                            <i class="el-icon-date"></i>
                            <span slot="title">实验</span>
                        </el-menu-item>
                        <el-menu-item index="2" :route="'/courseList/resource/'+this.$route.params.detailId">
                            <i class="el-icon-folder-opened"></i>
                            <span slot="title">资源</span>
                        </el-menu-item>
                        <el-menu-item index="3" :route="'/courseList/detail/'+this.$route.params.detailId">
                            <i class="el-icon-document-copy"></i>
                            <span slot="title">课程详情</span>
                        </el-menu-item>
                        <el-menu-item index="4" :route="'/courseList/score/'+this.$route.params.detailId">
                            <i class="el-icon-medal-1"></i>
                            <span slot="title">课程成绩</span>
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
             courseName: ""
         };
     },
     computed: {
 
     },
     created() {
        this.$http.get(`/teaching/student/course/info/${this.$route.params.detailId}`
        ).then((res) => { 
            if(res.data.code == "0"){
                this.courseName = res.data.data.courseName
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
        background:#477CFE;
        margin-bottom: 30px;
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
            }
            img{
                position: absolute;
                bottom: -20px; 
                height:100px;
                width: 100px;
                z-index: 2;
            }
        }
    }
    .containner{
        width: 60%;
        margin:0 auto;
    }
 }
 </style>
 