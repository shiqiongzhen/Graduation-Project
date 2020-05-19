<template>
    <div class="page">
        <el-container>
            <el-header>
                <div class="header">
                    <!-- <span><i class="el-icon-platform-eleme"></i>智慧教学平台</span> -->
                    <span class="logo"><img src="@/assets/image/logo/logo@1x.png" alt=""></span>
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
                                    <el-input v-model="userInfo.verifyCode" auto-complete="off" placeholder="验证码"></el-input>
                                    <img alt="" :src="verifySrc" @click="changeVerifySrc">
                                </div>
                            </el-form-item>
                            <el-form-item prop="ident">
                                <el-radio v-model="userInfo.ident" label="0">学生</el-radio>
                                <el-radio v-model="userInfo.ident" label="1">老师</el-radio>
                                <el-radio v-model="userInfo.ident" label="2">管理员</el-radio>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('userInfo')">登录</el-button>
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
        checked: true,
        userInfo: {
          userNumber: '',
          pass: '',
          verifyCode: '',
          ident: '0'
        },
        verifySrc: '/teaching/common/kaptcha' 
      };
    },
    created() {
    },
    methods: {
        changeVerifySrc(){
            this.verifySrc="/teaching/common/kaptcha?"+Math.random()
        },
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
                    // this.$http.post('/teaching/user/loginForTest', this.Qs.stringify({
                    //     "userNumber":this.userInfo.userNumber,
                    //     "password":this.userInfo.pass,
                    //     "ident":this.userInfo.ident
                    // }))
                    this.$http.post('/teaching/user/login', this.Qs.stringify({
                        "userNumber":this.userInfo.userNumber,
                        "password":this.userInfo.pass,
                        "verifyCode":this.userInfo.verifyCode,
                        "ident":this.userInfo.ident
                    }))
                    .then((res) => {
                        if(res.data.code == 0){
                            if(this.checked){
                                localStorage.setItem('userAccount', this.userInfo.account)
                                localStorage.setItem('userPass', this.userInfo.password) 
                            }
                            localStorage.setItem('token', res.data.data.token) 
                            localStorage.setItem('nickname', res.data.data.nickname)
                            localStorage.setItem('headUrl', res.data.data.headUrl) 
                            localStorage.setItem('userId', res.data.data.userId) 
                            if(this.userInfo.ident=='0'){
                                this.$router.push( '/display' )
                            }else if(this.userInfo.ident=='1'){
                                this.$router.push( '/admin' )
                            }else{
                                this.$router.push( '/super' )
                            }
                        }else{
                            this.verifySrc="/teaching/common/kaptcha?"+Math.random()
                            alert(res.data.msg)
                        }
                    })
                    .catch((err) => {
                        // console.log("erro",err)
                    });
                } else {
                    // console.log('error submit!!');
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
        background: url("~@/assets/image/loginBackground.png");
        background-size:100vw calc(100vh - 100px);
        box-shadow:0px 0px 3px 1px #C9C9C9;
        background-repeat:no-repeat;
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
            box-shadow:0px 0px 3px 1px #C9C9C9;
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


