<template>
    <div>
        <el-container>
            <el-header>
                <div class="header">
                    <!-- <span><i class="el-icon-platform-eleme"></i>智慧教学平台</span> -->
                    <span class="logo"><img src="@/assets/image/logo/logo@1x.png" alt=""></span>
                    <span class="link">
                        <span>
                            <img :src="headUrl" alt="" class="headUrl"> <span>{{nickname}}</span>
                            <!--  | <router-link  :to = "{ name : 'site' }">我的成绩</router-link> -->
                        </span>&nbsp;&nbsp;|&nbsp;&nbsp;<span @click="loginOut">退出</span>
                    </span>
                </div>
            </el-header>
            <el-container style="margin-top:2px;height:calc(100vh - 65px)">
                <el-aside width="200px">
                    <el-menu
                    router
                    default-active="2"
                    class="el-menu-vertical-demo">
                    <el-menu-item index="1">
                        <i class="el-icon-menu"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                        <i class="el-icon-user"></i>
                        <span>教师管理</span>
                        </template>
                        <el-menu-item index="2-1"  :route="{path:'/super'}">查看信息</el-menu-item>
                        <el-menu-item index="2-2"  :route="{path:'/super/addTeacher'}">添加教师</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                        <i class="el-icon-collection"></i>
                        <span>班级管理</span>
                        </template>
                        <el-menu-item index="3-1"  :route="{path:'/super/viewClass'}">查看信息</el-menu-item>
                        <el-menu-item index="3-2"  :route="{path:'/super/addClass'}">添加班级</el-menu-item>
                    </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <transition name="fade">
                        <router-view></router-view>
                    </transition>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            nickname:localStorage.getItem('nickname')||"",
            headUrl: localStorage.getItem('headUrl')||""
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {
        loginOut(){
             this.$http.get(`/teaching/user/logout`
            ).then((res) => {    
                this.$router.push('/login'); 
            })
            .catch(function (error) {
                console.log(error)
            })
            
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">
  .el-header{
    background-color:#FFFFFF;
    color: #333;
    line-height: 60px;
    box-shadow:0px 0px 3px 1px #959595;
    .header{
        // width: 60%;
        padding:0 2em;
        font-size: 1em;
        .logo{
            img{
                height:60px;
            }
        }
        .link{
            float: right;
            span{
                vertical-align:middle;
                cursor: pointer;
                img{
                    vertical-align:middle;
                }
                .headUrl{
                    width: 30px;
                    height: 30px;
                }
            }
        }
    }
  }
  
  .el-main {
    padding:0;
    background: #F4F4F4;
  }
  

</style>
