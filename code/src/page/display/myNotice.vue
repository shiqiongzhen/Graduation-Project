<template>
    <div class="page">
        <div class="title">
            我的通知
        </div>
        <ul class="content">
            <li>
                <div>
                    <span><img src="@/assets/icon/lock.png" alt=""></span>
                    <span><div>密码</div><div class="description">用于保护账号信息和登录安全</div></span>
                </div>
                <div><el-button size="medium" @click="isPass = true">修改密码</el-button></div>
            </li>
            <li>
                <div>
                    <span><img src="@/assets/icon/lock.png" alt=""></span>
                    <span><div>联系方式</div><div class="description">关联手机后可以方便找回密码</div></span>
                </div>
                <div><el-button size="medium" @click="bindPhone = true">立即绑定</el-button></div>
            </li>
        </ul>
        <el-dialog title="修改密码" :visible.sync="isPass" width="30%">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item prop="oldPass">
                    <el-input v-model="form.oldPass" type="password" autocomplete="off" placeholder="请输入原密码"></el-input>
                </el-form-item>
                <el-form-item prop="newPass">
                    <el-input v-model="form.newPass" type="password" autocomplete="off" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item prop="checkNewPass">
                    <el-input v-model="form.checkNewPass" type="password" autocomplete="off" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item>
                     <!-- <div slot="footer" class="dialog-footer"> -->
                        <el-button @click="isPass = false">取 消</el-button>
                        <el-button type="primary" @click="updatePass('form')">确 定</el-button>
                    <!-- </div> -->
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="绑定手机号码" :visible.sync="bindPhone" width="30%">
            <el-form :model="form">
                <el-form-item label="手机号码" label-width="120px">
                    <el-input v-model="form.oldPass" autocomplete="off" placeholder="请输入你的手机号码"></el-input>
                </el-form-item>
                <el-form-item label="短信验证码" label-width="120px">
                    <el-input v-model="form.oldPass" autocomplete="off" placeholder="请输入新密码"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="bindPhone = false">取 消</el-button>
                <el-button type="primary" @click="bindPhone = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.form.checkNewPass !== '') {
                    this.$refs.form.validateField('checkNewPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.newPass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            isPass: false,
            bindPhone: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            rules: {
                newPass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkNewPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                oldPass: [
                    { required: true, message: '旧密码不能为空', trigger: 'blur'  }
                ]
            }

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
        updatePass(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http.post(`/teaching/user/updatePassWord`,this.Qs.stringify({
                        "oldPassword": this.form.oldPass,
                        "newPassword": this.form.newPass
                    })).then((res) => {    
                        if(res.data.code == "0"){
                            this.$message({
                                message: '修改成功！',
                                type: 'success'
                            });
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
                    this.isPass = false 
                } else {
                    return false;
                }
            });
        },
    },
    components: {

    },
};
</script>

<style scoped lang="scss">
.page{
    .title{
        background: #FFFFFF;
        height: 40px;
        line-height: 40px;
        padding-left: 1em;
        color: #787878;
        font-weight: 600;
        margin-bottom: 21px;
    }
    .content{
        background: #FFFFFF;
        li{
            border-bottom: 1px solid #E9E9E9;
            padding:1em 2em;
            display: flex;
            justify-content: space-between;
            span{
                display: inline-block;
                margin-left: 1em;
                .description{
                    color: #747474;
                }
            }
        }
    }
}
</style>
