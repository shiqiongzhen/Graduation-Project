<template>
    <div class="page">
        <div class="divideLine"></div>
        <div class="containner">
            <div class="leftMenu">
                <div class="userInfo">
                    <img  :src="headUrl" alt="" class="headPic">
                    <div class="describe">
                        <h3>{{userInfo.nickname}}</h3>
                        <p>{{userInfo.userIdent}}</p>
                        <p>学号：{{userInfo.userNumber}}</p>
                    </div>
                </div>
                <ul class="menu">
                    <li @click="navToPersonalMsg()"><span>个人信息</span><i class="el-icon-arrow-right"></i></li>
                    <li @click="navToIdentify()"><span>身份认证</span><i class="el-icon-arrow-right"></i></li>
                </ul>
            </div>
            <div class="rightContainner" v-if="containner=='personalMsg'">
                <div class="title">
                    个人信息
                </div>
                <div class="content">
                    <div class="headInfo">
                        <!-- <img :src="headUrl" alt="">
                        <div>{{userInfo.nickname}}</div> -->
                        <el-upload
                        class="avatar-uploader"
                        action=""
                        :show-file-list="false"
                        :before-upload="beforeAvatarUpload">
                        <div class="uploadBox">
                            <img v-if="headUrl" :src="headUrl" class="avatar">
                            <span v-if="headUrl" class="avatar-label">编辑封面</span>
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </div>
                        </el-upload>
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
                        <div><span class="label">手机号码</span><span>{{userInfo.phone||'无'}}</span></div>
                        <div><span class="label">邮箱</span><span>{{userInfo.mail||'无'}}</span></div>
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
            <div class="rightContainner" v-if="containner=='identify'">
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
            containner: 'personalMsg',
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
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            if(isJPG && isLt2M){
                var formData = new FormData();
                formData.append('file', file);
                this.$http.post(`/teaching/common/file/uploadPic`,formData).then(res=>{
                    return res.data.data.url
                }).then((url)=>{
                    this.headUrl = url
                    this.$http.post(`/teaching/user/updateInfo`,{ // /teaching/teacher/course/updateCourseInfo
                            "headUrl": url
                    }).then((res) => {
                        if(res.data.code == "0"){
                            localStorage.setItem('headUrl', url) 
                            this.$message({
                                message: "更新成功！",
                                type: 'success'
                            });
                            this.$router.go(0)
                        // }else if (res.data.code == "1") {
                        //     this.$router.push('/login'); 
                        }
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
                })
                .catch(error=>{
                    this.$message({
                        message: `上传失败！${error}`,
                        type: 'error'
                    });
                })
                return false // 返回false不会自动上传
            }else{
                return false
            }
        },
        navToPersonalMsg(){
            this.containner='personalMsg'
            this.$router.push('/user'); 
        },
        navToIdentify(){
            this.containner='identify'
            this.$router.push('/identify'); 
        },
        closeInfo(){
            this.editMessage=false
        },
        updateInfo(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http.post(`/teaching/user/updateInfo`,{ // /teaching/teacher/course/updateCourseInfo
                            "phone": this.userInfo.phone,
                            "email": this.userInfo.mail
                        }
                    ).then((res) => {
                        if(res.data.code == "0"){
                            this.editMessage = false
                            this.$message({
                                message: "更新成功！",
                                type: 'success'
                            });
                        // }else if (res.data.code == "1") {
                        //     this.$router.push('/login'); 
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
    .divideLine{
        background: #F4F4F4;
        height: 3px;
    }
    .containner{
        width: 60%;
        margin:0 auto;
        .leftMenu{
            margin-top: 20px;
            background: #F8FAFC;
            height: 350px;
            float: left;
            width: 25%;
            text-align: center;
            box-sizing: border-box;
            .headPic{
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background:#D8D8D8; 
                margin-top: 20px;
            }
            .describe{
                padding:10px;
            }
            .menu{
                margin-top: 10px;
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
            background: #FFFFFF;
            height: 100%;
            float: right;
            width: 73%;
            .title{
                padding:10px;
                position: relative;
                border-bottom: 1px solid #E9E9E9;
                font-weight: bold;
            }
            .content{
                padding:10px;
                .headInfo{
                    text-align: center;
                    // img{
                    //     width: 80px;
                    //     height: 80px;
                    //     border-radius: 50%;
                    //     background:#D8D8D8; 
                    // }
                    .uploadBox{
                        border: 1px dashed #d9d9d9;
                        border-radius: 50%;
                        cursor: pointer;
                        position: relative;
                        overflow: hidden;
                        &:hover{
                            border-color: #409EFF;
                        }
                        .avatar-uploader-icon{
                            font-size: 28px;
                            color: #8c939d;
                            width: 80px;
                            height: 80px;
                            line-height: 80px;
                            text-align: center;
                        }
                        .avatar {
                            width: 80px;
                            height: 80px;
                            display: block;
                            position: relative;
                        }
                        .avatar-label{
                            position: absolute;
                            bottom: 0;
                            background: #73A2CF;
                            color: #FFFFFF;
                            font-size: 12px;
                            display: block;
                            text-align: center;
                            width: 100%;
                        }
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
