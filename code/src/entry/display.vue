<template>
    <div>
        <el-container>
            <el-header>
                <div class="header">
                    <!-- <span><i class="el-icon-platform-eleme"></i>智慧教学平台</span> -->
                    <span class="logo"><img src="@/assets/image/logo/logo@1x.png" alt=""></span>
                    <span class="link">
                        <span class="left" 
                            @mouseover="selectCourse"
                            @mouseout="outCourse">
                            <router-link  to = "/display"><img :src="courseSrc" alt=""><span>我的课程</span></router-link>
                        </span>|<span class="right">
                             <router-link  to = "/user"><img :src="headUrl" alt="" class="headUrl"><span>{{nickname}}</span></router-link>
                        </span>
                        <span class="notice"
                            @mouseover="selectNotice"
                            @mouseout="outNotice">
                            <router-link  to = "/notice"><img :src="noticeSrc" alt=""></router-link>
                        </span>
                        <span class="loginOut" @click="loginOut">退出</span>
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
import courseGray from '@/assets/icon/courseGray.png'
import courseBlue from '@/assets/icon/courseBlue.png'
import noticeGray from '@/assets/icon/noticeGray.png'
import noticeBlue from '@/assets/icon/noticeBlue.png'
export default {
    props: {

    },
    data() {
        return {
            courseSrc: courseGray,
            noticeSrc: noticeGray,
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
            
        },
        selectCourse(){
            this.courseSrc=courseBlue
        },
        outCourse(){
            this.courseSrc=courseGray
        },
        selectNotice(){
            this.noticeSrc=noticeBlue
        },
        outNotice(){
            this.noticeSrc=noticeGray
        },
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
            color: #3D3D3D;
            span{
                vertical-align:middle;
                cursor: pointer;
                color: #3D3D3D;
                img{
                    vertical-align:middle;
                }
                .headUrl{
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                }
            }
            .left{
                margin-right: 15px;
                span{
                    margin-left: 8px;
                    &:hover{
                        color:#3A9AFF;
                    }
                }
            }
            .right{
                margin-left: 15px;
                margin-right: 15px;
                span{
                    margin-left: 8px;
                    &:hover{
                        color:#3A9AFF;
                    }
                }
            }
            .notice{
                margin-right: 25px;
            }
        }
    }
  }
  
  .el-main {
    padding:0;
  }
  

</style>
