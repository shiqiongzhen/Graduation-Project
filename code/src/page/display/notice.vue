<template>
    <div class="page">
        <div class="divideLine"></div>
        <div class="containner">
            <div class="leftMenu">
                <div class="title">
                    <img src="@/assets/icon/noticeGray.png" alt=""><span>消息中心</span>
                </div>
                <ul class="menu">
                    <li @click="navToSystemNotice()"><span>系统通知</span><i class="el-icon-arrow-right"></i></li>
                    <li @click="navToMyNotice()"><span>我的通知</span><i class="el-icon-arrow-right"></i></li>
                </ul>
            </div>
            <div class="rightContainner" v-if="containner=='systemNotice'">
                <div class="title">
                    系统通知
                </div>
                <div class="content">
                    <div class="headInfo">
                        <img :src="headUrl" alt="">
                        <div>{{userInfo.nickname}}</div>
                    </div>
                    <div class="navTitle">
                        <span class="subTitle">基本信息</span>
                        <i @click="editMessage=!editMessage" class="el-icon-edit-outline"></i>
                    </div>
                    <div class="userInfo" v-if="editMessage==false">
                        <div><span class="label">姓名</span><span>{{userInfo.nickname}}</span></div>
                        <div><span class="label">身份</span><span>{{userInfo.userIdent}}</span></div>
                        <div><span class="label">学号/工号</span><span>{{userInfo.userNumber}}</span></div>
                        <div><span class="label">所在院</span><span>{{userInfo.college}}</span></div>
                        <div><span class="label">所在系</span><span>{{userInfo.series}}</span></div>
                        <div><span class="label">所在专业</span><span>{{userInfo.major}}</span></div>
                        <div><span class="label">班级</span><span>{{userInfo.className}}</span></div>
                        <div><span class="label">手机号码</span><span>{{userInfo.phone}}</span></div>
                        <div><span class="label">邮箱</span><span>{{userInfo.mail}}</span></div>
                    </div>
                    <div v-else class="userInfo">
                        <el-form ref="form" :rules="rules" :model="userInfo" label-width="120px">
                            <el-form-item label="姓名">
                                <el-input v-model="userInfo.nickname" disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="身份">
                                <el-input v-model="userInfo.userIdent" disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="学号/工号">
                                <el-input v-model="userInfo.userNumber" disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="所在院">
                                <el-input v-model="userInfo.college" disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="所在系">
                                <el-input v-model="userInfo.series" disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="所在专业">
                                <el-input v-model="userInfo.major" disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="班级">
                                <el-input v-model="userInfo.className" disabled="true"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号码" prop="phone">
                                <el-input v-model="userInfo.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="mail">
                                <el-input v-model="userInfo.mail"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="small" type="primary" @click="updateInfo('form')">确定</el-button>
                                <el-button size="small" type="info" @click="closeInfo()">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
            <div class="rightContainner" v-if="containner=='myNotice'">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            containner: 'systemNotice',
            headUrl: localStorage.getItem('headUrl')||"",
            editMessage: false,
            userInfo: {
                userId: '',
                nickname: "",
                userNumber: "",
                headUrl: "",
                userIdent: "",
                mail: "",
                phone: "",
                college: "",
                series: "",
                major: "",
                className: ""
            },
            rules: {
                phone: [
                    { required: true, message: '不能为空', trigger: 'blur'  }
                ],
                mail: [
                    { required: true, message: '不能为空', trigger: 'blur'  }
                ]
            }
        };
    },
    computed: {

    },
    created() {
        this.$http.get(`/teaching/user/info/${localStorage.getItem('userId')}`
        ).then((res) => { 
            if(res.data.code == "0"){
                this.userInfo = res.data.data
            }else if (res.data.code == "1") {
                this.$router.push('/login'); 
            }else{
                this.userInfo=res.data.data
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
        navToSystemNotice(){
            this.containner='systemNotice'
            this.$router.push('/notice'); 
        },
        navToMyNotice(){
            this.containner='myNotice'
            this.$router.push('/myNotice'); 
        },
        closeInfo(){
            this.editMessage=false
        },
        updateInfo(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http.post(``,{ // /teaching/teacher/course/updateCourseInfo
                            "userId": localStorage.getItem('userId'), 
                            "phone": this.userInfo.phone,
                            "mail": this.userInfo.mail
                        }
                    ).then((res) => {
                        if(res.data.code == "0"){
                            this.editMessage = false
                            this.$message({
                                message: "更新成功！",
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
                }
            })
        },
    },
    components: {

    },
};
</script>

<style scoped lang="scss">
@import '@/assets/style/common/mixin.scss';
.page{
    background: #F4F4F4;
    height: calc(100vh - 60px);
    .divideLine{
        background: #F4F4F4;
        height: 3px;
    }
    .containner{
        width: 60%;
        margin:0 auto;
        .leftMenu{
            margin-top: 20px;
            background: #FFFFFF;
            height: 350px;
            float: left;
            width: 15%;
            text-align: center;
            box-sizing: border-box;
            .title{
                padding: 30px;
                img{
                    color: #6D7278;
                    vertical-align: middle;
                    margin-right: 4px;
                }
            }
            .menu{
                li{
                    padding: 0.8em;
                    &:hover{
                        background: #5CB3FF;
                        color: white;
                    }
                    span{
                        position: relative;
                        right: 10%;
                    }
                    i{
                        position: relative;
                        left: 20%;
                    }
                }
            }
        }
        .rightContainner{
            margin-top: 20px;
            height: 100%;
            float: right;
            width: 83%;
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
                padding:10px;
                background: #FFFFFF;
                .headInfo{
                    text-align: center;
                    img{
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
                        background:#D8D8D8; 
                    }
                }
                // .title{
                //     font-size: 0.5em;
                // }
                .navTitle{
                    padding:10px;
                    position: relative;
                    border-bottom: 1px solid #E9E9E9;
                    font-weight: bold;
                    height: 1em;
                    .subTitle{
                        float: left;
                    }
                    i{
                        float: right;
                    }
                    @include clearfix;
                }
                .userInfo{
                    line-height: 2.5em;
                    padding:1em;
                    .label{
                        width: 100px;
                        display: inline-block;
                    }
                }
            }
        }
    }
    @include clearfix;
}
</style>
