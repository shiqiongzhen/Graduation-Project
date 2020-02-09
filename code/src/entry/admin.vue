<template>
    <div>
        <el-container>
            <el-header>
                <div class="header">
                    <!-- <span><i class="el-icon-platform-eleme"></i>智慧教学平台</span> -->
                    <span class="logo"><img src="@/assets/image/logo/logo@1x.png" alt=""></span>
                    <span class="link">
                        <span style="margin-right: 20px;">
                            <router-link  to = "/admin"><img src="@/assets/icon/courseGray.png" alt=""> <span>我的课程</span></router-link>&nbsp;&nbsp;|&nbsp;&nbsp;
                            <router-link  to = "/admin/user"><img :src="headUrl" alt="" class="headUrl"> <span>{{nickname}}</span></router-link> 
                            <!--  | <router-link  :to = "{ name : 'site' }">我的成绩</router-link> -->
                        </span>
                        <span @click="loginOut">退出</span>
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
  }
  

</style>
