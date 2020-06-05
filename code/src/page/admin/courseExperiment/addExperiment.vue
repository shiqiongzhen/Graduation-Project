<template>
    <div class="page">
        <div class="containner">
            <breadCrumb :data="navData"></breadCrumb>
            <div class="contain">
                <el-form ref="form" :rules="rules" :model="form" label-width="120px">
                    <el-form-item label="实验名称" prop="experimentName">
                        <el-input v-model="form.experimentName"></el-input>
                    </el-form-item>
                    <el-form-item label="实验简介">
                        <el-input v-model="form.experimentIntro"></el-input>
                    </el-form-item>
                    <el-form-item label="实验详情" prop="experimentText">
                        <tinymceEditor v-model="form.experimentText"></tinymceEditor>
                    </el-form-item>
                    <el-form-item>
                        <uploadFile
                        :allFile= "form.experimentDetailFile"
                        :someFile= "fileList"
                        v-on:updateFile= "updateDetailFile"
                        :isClose= "false"
                        ></uploadFile>
                        <!-- <el-upload
                        class="uploadFile"
                        action="/teaching/common/file/upload"
                        :file-list="fileList"
                        :on-success="handleFileSuccess">
                            <el-button size="small" type="primary">点击上传附件</el-button>
                            <span slot="tip" class="el-upload__tip">可上传最多30个答案附件，单个附件不可超过300MB</span>
                        </el-upload> -->
                    </el-form-item>
                    <el-form-item label="实验状态" prop="experimentStatus">
                        <el-radio-group v-model="form.experimentStatus">
                            <el-radio label="0">正常</el-radio>
                            <el-radio label="1">锁定</el-radio>
                        </el-radio-group>
                    </el-form-item>
                     <!-- v-if="form.experimentStatus==1" -->
                    <el-form-item label="设置解锁阈值">
                        <el-radio-group v-model="form.isQuezhi">
                            <el-radio label="0">是</el-radio>
                            <el-radio label="1">否</el-radio>
                        </el-radio-group>
                        <el-form-item v-if="form.isQuezhi==0" prop="valve">
                            <el-input v-model="form.valve" style="width:120px;"></el-input>
                            <el-alert
                                title="提示：当提交实验的人数占比（班级人数）大于阈值时，将自动解锁下一个实验"
                                type="info" show-icon style="line-height: 1em;margin-top:1em;">
                            </el-alert>
                        </el-form-item>
                    </el-form-item>
                    <!-- <el-form-item label="设置实验封面">
                        <el-upload
                        class="avatar-uploader"
                        action="/teaching/common/file/uploadPic"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <div class="uploadBox">
                            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </div>
                        </el-upload>
                    </el-form-item> -->
                    <el-form-item label="实验答案">
                        <tinymceEditor v-model="form.experimentAnswerContent"></tinymceEditor>
                    </el-form-item>
                    <el-form-item>
                        <uploadFile
                        :allFile= "form.experimentAnswerFile"
                        :someFile= "answerfileList"
                        v-on:updateFile= "updateAnswerFile"
                        :isClose= "false"
                        ></uploadFile>
                    </el-form-item>
                    <el-form-item label="设置答案阈值">
                        <el-radio-group v-model="form.isAnswerQuezhi">
                            <el-radio label="0">是</el-radio>
                            <el-radio label="1">否</el-radio>
                        </el-radio-group>
                        <el-form-item v-if="form.isAnswerQuezhi==0" prop="punishment">
                            <el-input v-model="form.punishment" style="width:120px;"></el-input>
                            <el-alert
                                title="提示：当学生提前查看参考答案时，最终实验成绩=教师评分*答案阈值"
                                type="info" show-icon style="line-height: 1em;margin-top:1em;">
                            </el-alert>
                        </el-form-item>
                    </el-form-item>
                    <el-form-item class="footer">
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
import uploadFile from '@/components/uploadFile'
export default {
    props: {

    },
    data() {
        return {
            // editorHeight: "70vh", :height="editorHeight"
            navData:[
                {
                    name: "实验列表",
                    path: `/admin/courseList/experiment/${this.$route.params.courseId}`
                },{
                    name: "添加实验",
                    path: ""
                }
            ],
            form: {
                experimentName: '',
                experimentIntro: '',
                experimentText: '',
                experimentStatus: '0',
                isQuezhi:'0',
                isAnswerQuezhi:'0',
                valve:'',
                punishment:'',
	            experimentAnswerContent:'',
                experimentDetailFile:[],
                experimentAnswerFile:[],
                // fileList: [],
                // answerfileList:[]
            },
            rules: {
                experimentName: [
                    { required: true, message: '不能为空', trigger: 'blur'  }
                ],
                experimentText: [
                    { required: true, message: '不能为空', trigger: 'blur'  }
                ],
                experimentStatus: [
                    { required: true, message: '不能为空', trigger: 'blur'  }
                ],
                valve: [
                    { required: true, pattern: /^(0.\d+|0|1)$/, message: '不能为空或数值应在0~1之间', trigger: 'blur'  }
                ],
                punishment: [
                    { required: true, pattern: /^(0.\d+|0|1)$/, message: '不能为空或数值应在0~1之间', trigger: 'blur'  }
                ]
            },
            fileList: [],
            answerfileList:[]
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
      cancle(){
          this.$router.push(`/admin/courseList/experiment/${this.$route.params.courseId}`)
        //   this.form = {
        //     experimentName: '',
        //     experimentIntro: '',
        //     experimentText: '',
        //     experimentStatus: '0',
        //     isQuezhi:'0',
        //     isAnswerQuezhi:'0',
        //     valve:'',
        //     punishment:'',
        //     experimentAnswerContent:'',
        //     experimentDetailFile:[],
        //     experimentAnswerFile:[],
        //     // fileList: [],
        //     // answerfileList:[]
        // }
      },
      updateDetailFile(data){
          this.form.experimentDetailFile=data
          this.$message({
            message: "已确认！",
            type: 'success'
          });
      },
      updateAnswerFile(data){
          this.form.experimentAnswerFile=data
          this.$message({
            message: "已确认！",
            type: 'success'
          });
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$http.post(`/teaching/teacher/experiment/add`,{
                    experimentName: this.form.experimentName,
                    courseId:this.$route.params.courseId,
                    experimentIntro: this.form.experimentIntro,
                    experimentText: this.form.experimentText,
                    experimentStatus: this.form.experimentStatus,
                    valve: this.form.valve || 1,
                    punishment: this.form.punishment || 1,
                    experimentAnswerContent: this.form.experimentAnswerContent,
                    experimentDetailFile:this.form.experimentDetailFile,
                    experimentAnswerFile:this.form.experimentAnswerFile,
                }).then((res) => { 
                    if(res.data.code == "0"){
                        this.$message({
                            message: "成功新增实验！",
                            type: 'success'
                        });
                        this.$router.push(`/admin/courseList/experiment/${this.$route.params.courseId}`); 
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
        transformFile(file){
            var result =[]
            if(file instanceof Array){
                for(let i=0;i<file.length;i++){
                    result.push({"name":file[i].fileName,"url":file[i].filePath})
                }
            }
            return result
        },
        filterFiles(allFiles, files){
            var result = []
            for(let i=0;i<allFiles.length;i++){
                files.forEach(item => {
                    if(allFiles[i].name==item.name){
                        result.push(allFiles[i])
                    }
                });
            }
            return result
        },
    },
    components: {
        breadCrumb,
        TinymceEditor,
        uploadFile
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
            // padding: 2em;
            padding: 36px 5em 36px 2em;
            .footer{
                text-align: center;
                margin-top: 48px;
                .el-button:nth-child(1){
                    margin-right: 12px;
                }
                .el-button:nth-child(2){
                    margin-left: 12px;
                }
            }
        }
    }
}
</style>
