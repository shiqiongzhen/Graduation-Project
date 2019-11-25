<template>
    <div class="page">
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
                <div class="container">
                    <div class="loginBox">
                        <div class="title">
                            密码登录
                        </div>
                        <el-form :model="userInfo" ref="userInfo">
                            <el-form-item prop="account">
                                <el-input v-model="userInfo.userNumber" prefix-icon="el-icon-user-solid" placeholder="账号"></el-input>
                            </el-form-item>
                            <el-form-item prop="pass">
                                <el-input type="password" v-model="userInfo.pass" prefix-icon="el-icon-lock" placeholder="密码" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item prop="verifyCode">
                                <div class="verifyCode">
                                    <el-input type="password" v-model="userInfo.verifyCode" auto-complete="off" placeholder="验证码"></el-input>
                                    <img alt="" src="@/assets/image/logo/logo80.png">
                                </div>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('userInfo')">提交</el-button>
                                <el-button @click="resetForm('userInfo')">重置</el-button>
                                <el-checkbox v-model="checked" @change="remPass">记住密码</el-checkbox>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        checked: false,
        userInfo: {
          userNumber: '',
          pass: '',
          verifyCode: '',
        },
        // verifyCodeSrc: '@/assets/image/logo/logo80.png' //http://120.77.242.172:8080/teaching/common/kaptcha
      };
    },
    created() {
        // this.$http.get('/teaching/common/kaptcha'
        // ).then((res) => { 
        //    console.log(res)
        // })
        // .catch(function (error) {
        //     console.log(error)
        // })
            // this.$http.get(this.$api.getCode)
            //     .then((res) => {
            //         this.userInfo.verifycode = res.data.verifyCode
            //         // console.log(this.userInfo.verifycode)
            //     })
            //     .catch((res) => {
            //         console.log("erro"+res)
            //     }),
            //     this.userInfo.account = localStorage.getItem('remAccount') || null
            //     this.userInfo.pass = localStorage.getItem('remPass') || null
            //     if(localStorage.getItem('remAccount') || localStorage.getItem('remPass')){
            //         this.checked = true
            //     }
    },
    methods: {
        remPass(){
                if(this.checked){
                    localStorage.setItem('remAccount', this.userInfo.account)
                    localStorage.setItem('remPass', this.userInfo.pass) 
                }else{
                    localStorage.removeItem('remAccount')
                    localStorage.removeItem('remPass') 
                }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // var params = new URLSearchParams();
                    this.$http.post('/teaching/user/login',  this.Qs.stringify({
                        "userNumber":this.userInfo.userNumber,
                        "password":this.userInfo.pass,
                        // "login.code":this.userInfo.verifycode
                    }))
                    .then((res) => {
                        if(res.data.code == 0){
                            localStorage.setItem('userAccount', this.userInfo.account)
                            localStorage.setItem('userPass', this.userInfo.password) 
                            this.$router.push( '/courseList' )
                        }else{
                            alert(res.data.msg)
                        }
                    })
                    .catch((err) => {
                        console.log("erro",err)
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
  }
</script>

<style scoped lang="scss">
.page{
    // display: inline-block;
    // text-align: center;
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
        height: calc(100vh - 60px);
        background: url("~@/assets/image/loginBackground.png") 100% 100% no-repeat;
        .container{
            margin:0 auto;
            width: 60%;
            position: relative;
        }
        .loginBox{
            text-align: center;
            width: 30%;
            padding:20px;
            background: white;
            position: absolute;
            right: 0;
            top: 15vh;
            .title{
                margin:3% 0 7% 0;
            }
            .verifyCode{
                display: flex;
                justify-content: space-between;
                .el-input {
                    flex: 2;
                }
                img{
                    flex: 1;
                    height: 40px;
                }
            }
        }
    }
}
</style>


