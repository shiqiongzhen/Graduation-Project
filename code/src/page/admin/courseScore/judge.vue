<template>
    <div class="page">
        <div class="containner">
            <breadCrumb :data="navData"></breadCrumb>
            <div class="contain">
                <span class="headInfo">
                    <img :src="form.headUrl" alt="">
                    <span>
                        <h4>{{form.userName}}
                            <el-button
                                @click="routeToNotice(form.userName, form.userId)"
                                type="text">
                                <i class="el-icon-message"></i>发消息
                            </el-button>
                        </h4>
                        <p>{{form.userNumber}}</p>
                    </span>
                </span>
                <el-form ref="form" :rules="rules" :model="form" label-width="120px">
                    <el-form-item label="学生答案">
                        <tinymceEditor v-model="form.userExperimentText" disabled="true"></tinymceEditor>
                    </el-form-item>
                    <el-form-item label="答案附件">
                        <p v-if="!form.userExperimentFile || form.userExperimentFile.length=='0'">无</p>
                        <p v-else v-for="(item,index) in form.userExperimentFile" :key="index"><a :href="item.filePath">{{item.fileName}}</a></p>
                    </el-form-item>
                    <el-form-item label="是否通过" prop="status">
                        <el-radio-group v-model="form.status">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="最终分数" v-if="form.status==1" prop="experimentAchievement">
                        <el-input v-model="form.experimentAchievement"></el-input>
                    </el-form-item>
                    <el-form-item label="老师评语" prop="teacherComment">
                        <el-input
                        type="textarea"
                        :rows="6"
                        placeholder="请输入内容"
                        v-model="form.teacherComment">
                        </el-input>
                        <span class="randomComment" @click="getComment()">
                            点击随机生成 <i class="el-icon-edit"></i>
                        </span>
                        <div class="attachTxt">
                            最多200字
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('form')">确定</el-button>
                        <el-button @click="cancle()">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import TinymceEditor from '@/components/tinymce-editor'
import breadCrumb from '@/components/breadCrumb'
export default {
    props: {

    },
    data() {
        return {
            // editorHeight: "70vh", :height="editorHeight"
            navData:[
                {
                    name: "实验打分",
                    path: `/admin/courseList/score/${this.$route.params.courseId}`
                },{
                    name: "学生打分界面",
                    path: ""
                }
            ],
            form: {},
            imageUrl: '',
            rules: {
                status: [
                    { required: true, message: '不能为空', trigger: 'blur'  }
                ],
                teacherComment: [
                    { required: true, message: '不能为空', trigger: 'blur'  }
                ],
                experimentAchievement: [
                    { required: true, pattern: /^([1-9]?\d|0|100)$/, message: '不能为空或数值应在0~100之间的整数', trigger: 'blur'  }
                ]
            },
        };
    },
    computed: {

    },
    created() {
            this.$http.get(`/teaching/teacher/achievement/judge/detail/${this.$route.params.experimentId}?&userId=${this.$route.params.userId}`
            ).then((res) => { 
                if(res.data.code == "0"){
                    this.form = res.data.data
                    if(this.form.status == 1){
                        this.form.status = '1'
                    }else{
                        this.form.status = '0'
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
    },
    mounted() {

    },
    watch: {

    },
    methods: {
    //   routeToNotice(){
    //     this.$router.push('/admin/myNotice'); 
    //   },
       getComment(){
            this.$http.get(`/teaching/teacher/achievement/judge/getOneComment?score=${this.form.experimentAchievement}`)
            .then((res) => { 
                if(res.data.code == "0"){
                    this.form.teacherComment = res.data.data
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
       },
       routeToNotice(name, targetId){
            // this.$router.push('/admin/myNotice'); 
            let id = ''
            if( Number(targetId) > Number(localStorage.getItem('userId'))){
                id = `${localStorage.getItem('userId')}-${targetId}`
            }else{
                id = `${targetId}-${localStorage.getItem('userId')}`
            }
            this.$router.push({ path:`/admin/myNotice/${id}`, query: { 'targetName': name, 'targetId': targetId } })
      },
      cancle(){
        this.$router.push(`/admin/courseList/score/${this.$route.params.courseId}`)
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$http.post(`/teaching/teacher/achievement/judge/save`,{
                    "userExperimentId": this.form.userExperimentId,
                    "teacherComment": this.form.teacherComment,
                    "status": this.form.status,
                    "experimentAchievement": this.form.experimentAchievement
                }
                ).then((res) => { 
                    if(res.data.code == "0"){
                        this.$message({
                            message: "打分成功！",
                            type: 'success'
                        });
                        this.$router.push(`/admin/courseList/score/${this.$route.params.courseId}`); 
                    }else if (res.data.code == "1") {
                        this.$router.push('/login'); 
                    }else{
                        this.$message({
                            message: res.data.msg,
                            type: 'error'
                        });
                    }
                    // this.loading=false
                })
                .catch(function (error) {
                    console.log(error)
                })
             }
        })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    },
    components: {
        breadCrumb,
        TinymceEditor
    },
};
</script>

<style scoped lang="scss">
.page{
    background: #F4F4F4;
    .containner{
        width: 60%;
        margin:0 auto;
        padding-top: 20px;
        .contain{
            background: white;
            padding: 2em;
            .headInfo{
                img{
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    vertical-align: middle;
                    display: inline-block;
                    margin: 1.5em;
                    margin-left: 45px;
                }
                span{
                    display: inline-block;
                    vertical-align: middle;
                    line-height: 1.5em;
                }
            }
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
                    width: 178px;
                    height: 178px;
                    line-height: 178px;
                    text-align: center;
                }
                .avatar {
                    width: 178px;
                    height: 178px;
                    display: block;
                }
            }
            .randomComment{
                color: #979797;
                position: absolute;
                bottom: 35px;
                right: 15px;
                cursor: pointer;
            }
        }
    }
}
</style>
