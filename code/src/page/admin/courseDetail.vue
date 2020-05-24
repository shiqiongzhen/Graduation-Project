<template>
    <div class="page">
        <div class="messageTitle">
            全部
        </div>
        <div class="container">
            <div class="navTitle">
                <span class="title">基本信息</span>
                <i @click="editMessage=!editMessage" class="el-icon-edit-outline"></i>
            </div>
            <div v-if="!loading&&detail==''">
                <el-alert
                    title="暂无数据"
                    type="info"
                    center
                    show-icon>
                </el-alert>
            </div>
            <spin :loading="loading"/>
            <div class="message" v-if="editMessage==false">
                <div class="item">
                    <span class="image">
                        <!-- <img src="@/assets/image/logo/logo100.png" alt=""> -->
                        <img v-if="detail.courseCover!=''" :src="detail.courseCover">
                        <img v-if="detail.courseCover==''" src="@/assets/image/logo/logo100.png"> 
                    </span>
                    <span class="description">
                        <div>老师：{{detail.teacherNickname}}</div>
                        <div>课程：{{detail.courseName}}</div>
                        <div>代码：{{detail.courseCode}}</div>
                        <div>学分：{{detail.courseCredit}}</div>
                        <div>状态：<span class="textColor">{{detail.courseStatus | courseStatus}}</span></div>
                    </span>
                </div>
            </div>
            <div class="editMessage" v-else>
                <div class="item">
                    <div class="imageBox">
                        <!-- <img src="@/assets/image/logo/logo100.png" alt=""> -->
                        <!-- action="/teaching/common/file/uploadPic" 
                        :on-success="handleAvatarSuccess"-->
                        <el-upload
                        class="avatar-uploader"
                        action=""
                        :show-file-list="false"
                        :before-upload="beforeAvatarUpload">
                        <div class="uploadBox">
                            <img v-if="detail.courseCover" :src="detail.courseCover" class="avatar">
                            <span v-if="detail.courseCover" class="avatar-label">编辑封面</span>
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </div>
                        </el-upload>
                    </div>
                    <span class="description">
                        <el-form ref="detail" :rules="rules" :model="detail" label-width="120px">
                            <el-form-item label="老师名称" prop="teacherNickname">
                                {{detail.teacherNickname}}
                            </el-form-item>
                            <el-form-item label="课程" prop="courseName">
                                <el-input v-model="detail.courseName"></el-input>
                            </el-form-item>
                            <el-form-item label="代码" prop="courseCode">
                                <el-input v-model="detail.courseCode"></el-input>
                            </el-form-item>
                            <el-form-item label="学分" prop="courseCredit">
                                <el-input v-model="detail.courseCredit"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="small" type="primary" @click="updateInfo('detail')">确定</el-button>
                                <el-button size="small" type="info" @click="closeInfo()">取消</el-button>
                            </el-form-item>
                        </el-form>
                    </span>
                </div>
            </div>
            <div class="navTitle">
                <span class="title">基础介绍</span>
                <i @click="editIntro=!editIntro" class="el-icon-edit-outline"></i>
            </div>
            <div class="introContent" v-if="editIntro==false" v-html="detail.courseIntroduction"></div>
            <div class="introContent" v-else>
                <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入内容"
                v-model="detail.courseIntroduction">
                </el-input>
                <div class="attachTxt">
                    最多200字
                </div>
                <div class="btnGroup-center">
                    <el-button size="small" type="primary" @click="updateIntro()">确定</el-button>
                    <el-button size="small" type="info" @click="closeIntro()">取消</el-button>
                </div>
            </div>
            <div class="navTitle">
                <span class="title">班课操作</span>
            </div>
            <div class="introContent">
                <el-row>
                    <span v-if="isLock==false">
                        <el-button style="background-color:#F79500;" :disabled="isOver"  @click="lockCourse()">锁定课程</el-button>
                        <!-- <div>锁定完状态可以恢复</div> -->
                    </span>
                    <span v-if="isLock==true">
                        <el-button type="success" :disabled="isOver" @click="recoverCourse()">恢复课程</el-button>
                        <!-- <div>锁定完状态可以恢复</div> -->
                    </span>
                    <span>
                        <el-button type="danger" :disabled="isOver" @click="overCourse()">完结课程</el-button>
                        <!-- <div>结束了就不可以恢复</div> -->
                    </span>
                    <span>
                        <el-button type="info" :disabled="!isOver" @click="delCourse()">删除课程</el-button>
                        <!-- <div>只有完结课程才可以删除</div> -->
                    </span>
                </el-row>
                    <div class="btnText">注：只有已结束的课程才可以被删除</div>
            </div>
        </div>
    </div>
</template>

<script>
import spin from '@/components/spin.vue'
export default {
    props: {

    },
    data() {
        return {
            detail:"",
            loading: true,
            isOver: false,
            isLock: false,
            editIntro: false,
            editMessage: false,
            rules: {
                experimentName: [
                    { required: true, message: '不能为空', trigger: 'blur'  }
                ],
                courseName: [
                    { required: true, message: '不能为空', trigger: 'blur'  }
                ],
                courseCode: [
                    { required: true, message: '不能为空', trigger: 'blur'  }
                ],
                courseCredit: [
                    { required: true, message: '不能为空', trigger: 'blur'  }
                ]
            },
        };
    },
    computed: {

    },
    created() {
        this.init()
    },
    mounted() {

    },
    filters: {
      courseStatus: (value) => {
        switch(value){
            case 0:return '正常';break;
            case 1:return '锁定';break;
            case 2:return '删除';break;
            case 3:return '结束';break;
            default:return '';
        }
      },
    },
    methods: {
        // handleAvatarSuccess(res, file) {
        //     this.detail.courseCover = res.data.url;
        // },
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
                    this.detail.courseCover = res.data.data.url
                }).catch(error=>{
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
        updateInfo(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http.post(`/teaching/teacher/course/updateCourseInfo`,{
                        "courseId": this.$route.params.courseId, 
                        "courseDetailId": this.detail.courseDetailId,
                        "courseCode": this.detail.courseCode,
                        "courseName": this.detail.courseName,
                        "courseCredit": this.detail.courseCredit,
                        "courseCover": this.detail.courseCover
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
        updateIntro(){
            this.$http.post(`/teaching/teacher/course/updateCourseInfo`,{
                   "courseId": this.$route.params.courseId, 
                    "courseDetailId": this.detail.courseDetailId,
	                "courseIntroduction": this.detail.courseIntroduction
                }
            ).then((res) => { 
                if(res.data.code == "0"){
                    this.editIntro = false
                    this.$message({
                        message: "更新成功！",
                        type: 'success'
                    });
                // }else if (res.data.code == "1") {
                    //  this.$router.push('/login'); 
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
        closeInfo(){
            this.editMessage=false
            this.init()
        },
        closeIntro(){
            this.editIntro=false
            this.init()
        },
        lockCourse(){
            this.$http.get(`/teaching/teacher/course/lock/${this.$route.params.courseId}`
            ).then((res) => { 
                if(res.data.code == "0"){
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    });
                    this.isLock=true
                // }else if (res.data.code == "1") {
                    //  this.$router.push('/login'); 
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
        recoverCourse(){
            this.$http.get(`/teaching/teacher/course/unlock/${this.$route.params.courseId}`
            ).then((res) => { 
                if(res.data.code == "0"){
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    });
                    this.isLock=false
                // }else if (res.data.code == "1") {
                    //  this.$router.push('/login'); 
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
        overCourse(){
            this.$http.get(`/teaching/teacher/course/end/${this.$route.params.courseId}`
            ).then((res) => { 
                if(res.data.code == "0"){
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    });
                    this.isOver=true
                // }else if (res.data.code == "1") {
                    //  this.$router.push('/login'); 
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
        delCourse(){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.$http.get(`/teaching/teacher/course/invalid/${this.$route.params.courseId}`
                ).then((res) => { 
                    if(res.data.code == "0"){
                        // this.$message({
                        //     message: res.data.msg,
                        //     type: 'success'
                        // });
                        this.$router.push('/admin'); 
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
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        init(){
            this.$http.get(`/teaching/teacher/course/detail/${this.$route.params.courseId}`
            ).then((res) => { 
                if(res.data.code == "0"){
                    this.detail = res.data.data
                    if(this.detail.courseStatus==3){
                        this.isOver=true
                    }
                    if(this.detail.courseStatus==1){
                        this.isLock=true
                    }
                    if(this.detail.courseStatus==0){
                        this.isLock=false
                    }
                // }else if (res.data.code == "1") {
                    //  this.$router.push('/login'); 
                }else{
                    this.$message({
                        message: res.data.msg,
                        type: 'error'
                    });
                }
                this.loading=false
            })
            .catch(function (error) {
                console.log(error)
            })
        }
    },
    components: {
        spin
    },
};
</script>

<style scoped lang="scss">
.page{
    padding:0 20px;
    .btnText{
        color: #3D3D3D;
        font-size: 12px;
        margin-top: 6px;
        margin-left: 10px;
    }
    .messageTitle{
        padding:10px;
        position: relative;
        border-bottom: 1px solid #E9E9E9;
        font-weight: bold;
    }
    .navTitle{
        padding:10px;
        position: relative;
        border-bottom: 1px solid #E9E9E9;
        height: 1em;
        .title{
            float: left;
        }
        i{
            float: right;
        }
    }
    .container{
        // padding:1em;
        padding: 16px 0 16px 16px;
        .item{
            padding:1em;
            display: flex;
            img{
                width: 100px;
                height: 100px;
            }
            .description{
                // display: inline-block;
                // line-height: 1.8em;
                // margin-left: 1em;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
        }
        .message{
            padding: 1em 4em 2em; // 上 左右 下 
            .image{
                padding: 20px 0;
                padding-right: 50px;
                border-right: 1px solid#E9E9E9;
            }
            .description{
                margin-left: 50px;
            }
        }
        .editMessage{   
            padding: 1em 3em 2em; // 上 左右 下 
            .imageBox{
                // display: inline-block;
                // vertical-align: top;
                // padding-top: 3em;
                padding: 64px 0;
                padding-right: 50px;
                // width: 15%;
                // box-sizing: border-box;
                border-right: 1px solid#E9E9E9;
                .uploadBox{
                    border: 1px dashed #d9d9d9;
                    border-radius: 6px;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    &:hover{
                        border-color: #409EFF;
                    }
                    .avatar-uploader-icon{
                        font-size: 28px;
                        color: #8c939d;
                        width: 100px;
                        height: 100px;
                        line-height: 100px;
                        text-align: center;
                    }
                    .avatar {
                        width: 100px;
                        height: 100px;
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
            .description{
                border-left: 1px solid #E5E5E5;
                padding: 0 2em;
                // width: 75%;
                box-sizing: border-box;
            }
        }
        .introContent{
            padding:1em;
            span{
                padding: 10px;
                text-align: center;
                display: inline-block;
                div{
                    padding: 7px;
                    font-size: 12px;
                    color:#E02020;
                }
            }
            .attachTxt{
                color:#777; 
            }
            .btnGroup-center{
                margin: 1em auto;
            }
        }
    }
}
</style>
