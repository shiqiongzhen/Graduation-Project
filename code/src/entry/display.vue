<template>
    <div>
        <el-container>
            <el-header>
                <div class="header">
                    <!-- <span><i class="el-icon-platform-eleme"></i>智慧教学平台</span> -->
                    <span class="logo"><img src="@/assets/image/logo/logo@1x.png" alt=""></span>
                    <span class="link">
                        <span style="margin-right: 20px;">
                            <router-link  to = "/"><img src="@/assets/image/course.png" alt=""> <span>我的课程</span></router-link>&nbsp;&nbsp;|&nbsp;&nbsp;
                            <router-link  to = "/user"><img src="@/assets/image/user/user30.png" alt=""> <span>刘番薯</span></router-link> 
                            <!--  | <router-link  :to = "{ name : 'site' }">我的成绩</router-link> -->
                        </span>
                        <span>
                            <router-link  to = "/user">退出</router-link>
                        </span>
                    </span>
                </div>
            </el-header>
            <el-main>
              <transition name="fade">
                  <router-view></router-view>
              </transition>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
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
    .header{
        width: 60%;
        margin:0 auto;
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
                img{
                    vertical-align:middle;
                }
            }
        }
    }
  }
  
  .el-main {
    padding:0;
  }
  

</style>
