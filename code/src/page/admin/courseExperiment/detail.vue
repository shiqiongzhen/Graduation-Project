<template>
    <div class="page">
        <breadCrumb :data="navData"></breadCrumb>
        <div class="containner">
            <div class="session">
                <div class="navTitle">
                    <span class="title">基本信息</span>
                    <i @click="editMessage=!editMessage" class="el-icon-edit-outline"></i>
                </div>
                <div class="content specialContent" v-if="editMessage==false">
                    <div class="item">
                        <img src="@/assets/image/logo/logo80.png" alt="">
                        <span class="description">
                            <div>实验名称：{{detail.experimentName}}</div>
                            <div>实验状态：<span class="colorText">{{detail.experimentStatus  | recordStatus}}</span></div>
                            <div>解锁阈值：<span class="colorText">{{detail.valve}}</span></div>
                        </span>
                    </div>
                </div>
                <div class="content editMessage specialContent" v-else>
                    <div class="item">
                        <div class="imageBox">
                            <img src="@/assets/image/logo/logo80.png" alt="">
                        </div>
                        <span class="description">
                            <el-form ref="form" :rules="rules" :model="form" label-width="120px">
                                <el-form-item label="课程名称" prop="experimentName">
                                    <el-input v-model="detail.experimentName"></el-input>
                                </el-form-item>
                                <el-form-item label="课程简介">
                                    <el-input v-model="detail.experimentIntro"></el-input>
                                </el-form-item>
                                <!-- <el-form-item label="试验状态" prop="resource">
                                    <el-radio-group v-model="detail.experimentStatus">
                                        <el-radio label="0">解锁</el-radio>
                                        <el-radio label="1">未解锁</el-radio>
                                    </el-radio-group>
                                </el-form-item> -->
                                <!-- <el-form-item label="设置实验解锁阈值为" prop="resource" v-if="detail.experimentStatus==1">
                                    <el-radio-group v-model="form.isQuezhi">
                                        <el-radio label="0">是</el-radio>
                                        <el-radio label="1">否</el-radio>
                                    </el-radio-group>
                                    <el-form-item v-if="form.isQuezhi==0">
                                        <el-input v-model="detail.valve" style="width:120px;"></el-input>
                                        <el-alert
                                            title="提示：当提交实验的人数占比（班级人数）大于阈值时，将自动解锁下一个实验"
                                            type="info" show-icon style="line-height: 1em;margin-top:1em;">
                                        </el-alert>
                                    </el-form-item>
                                </el-form-item> -->
                                <el-form-item label="解锁阈值">
                                    <el-radio-group v-model="form.isAnswerQuezhi">
                                        <el-radio label="0">是</el-radio>
                                        <el-radio label="1">否</el-radio>
                                    </el-radio-group>
                                    <el-form-item v-if="form.isAnswerQuezhi==0" prop="valve">
                                        <el-input v-model="detail.valve" style="width:120px;"></el-input>
                                        <el-alert
                                            title="提示：当学生点击查看参考答案时，最终实验成绩=教师打分*阈值比例"
                                            type="info" show-icon style="line-height: 1em;margin-top:1em;">
                                        </el-alert>
                                    </el-form-item>
                                </el-form-item>
                                <el-form-item>
                                    <el-button size="small" type="primary" @click="updateInfo('form')">确定</el-button>
                                    <el-button size="small" type="info" @click="closeInfo()">取消</el-button>
                                </el-form-item>
                            </el-form>
                        </span>
                    </div>
                </div>
            </div>
            <div class="session">
                <div class="navTitle">
                    <span class="title">实验详情</span>
                    <i @click="editDetail=!editDetail" class="el-icon-edit-outline"></i>
                </div>
                <div class="content" v-if="editDetail==false" v-html="detail.experimentText"></div>
                <div class="content" v-else>
                    <tinymceEditor v-model="detail.experimentText"></tinymceEditor>
                    <div class="btnGroup-center">
                        <el-button size="small" type="primary" @click="updateDetail()">确定</el-button>
                        <el-button size="small" type="info" @click="closeDetail()">取消</el-button>
                    </div>
                </div>
            </div>
            <div class="session">
                <div class="navTitle">
                    <span class="title">实验附件</span>
                    <i @click="editFile=!editFile" class="el-icon-edit-outline"></i>
                </div>
                <div class="content" v-if="editFile==false">
                    <p v-for="(item,index) in detail.experimentDetailFile" :key="index"><a :href="item.filePath">{{item.fileName}}</a></p>
                </div>
                <div class="content" v-else>
                    <uploadFile
                    :allFile= "detail.experimentDetailFile"
                    :someFile= "experimentDetailFile"
                    v-on:updateFile= "updateDetailFile"
                    v-on:closeFile= "closeDetailFile"
                    ></uploadFile>
                    <!-- <el-upload
                    ref="uploadDetailFile"
                    class="uploadFile"
                    action="/teaching/common/file/upload"
                    :file-list="experimentDetailFile"
                    :on-change="handleFileSuccess"
                    :on-remove="handleFileRemove">
                        <el-button size="small" type="primary">点击上传附件</el-button>
                        <span slot="tip" class="el-upload__tip">可上传最多30个答案附件，单个附件不可超过300MB</span>
                    </el-upload>
                    <div class="btnGroup">
                        <el-button size="small" type="primary" @click="updateDetailFile()">确定</el-button>
                        <el-button size="small" type="info" @click="closeDetailFile()">取消</el-button>
                    </div> -->
                </div>
            </div>
            <div class="session">
                <div class="navTitle">
                    <span class="title">实验答案</span>
                    <i @click="editAnswer=!editAnswer" class="el-icon-edit-outline"></i>
                </div>
                <div class="content" v-if="editAnswer==false">
                    <p class="valve colorText">答案阈值：<span>{{detail.punishment||"未设置阈值"}}</span></p>
                    <p class="answer">实验答案：<span v-html="detail.experimentAnswerContent"></span></p>
                </div>
                <div class="content" v-else>
                    <div class="simpleInput">
                        <span class="label" >答案阈值：</span><el-input size="small" v-model="detail.punishment" placeholder="请输入实验阈值"></el-input>
                    </div>
                    <tinymceEditor v-model="detail.experimentAnswerContent"></tinymceEditor>
                    <div class="btnGroup-center">
                        <el-button size="small" type="primary" @click="updateAnswer()">确定</el-button>
                        <el-button size="small" type="info" @click="closeAnswer()">取消</el-button>
                    </div>
                </div>
            </div>
            <div class="session">
                <div class="navTitle">
                    <span class="title">实验答案附件</span>
                    <i @click="editAnswerFile=!editAnswerFile" class="el-icon-edit-outline"></i>
                </div>
                <div class="content" v-if="editAnswerFile==false">
                    <p v-for="(item,index) in detail.experimentAnswerFile" :key="index"><a :href="item.filePath">{{item.fileName}}</a></p>
                </div>
                <div class="content" v-else>
                    <el-upload
                    ref="uploadAnswerFile"
                    class="uploadFile"
                    action="/teaching/common/file/upload"
                    :file-list="experimentAnswerFile"
                    :on-change="handleAnswerFileSuccess"
                    :on-remove="handleAnswerFileRemove">
                        <el-button size="small" type="primary">点击上传附件</el-button>
                        <span slot="tip" class="el-upload__tip">可上传最多30个答案附件，单个附件不可超过300MB</span>
                    </el-upload>
                    <div class="btnGroup">
                        <el-button size="small" type="primary" @click="updateAnswerFile()">确定</el-button>
                        <el-button size="small" type="info" @click="closeAnswerFile()">取消</el-button>
                    </div>
                </div>
            </div>
            <div class="session">
                <div class="navTitle">
                    <span class="title">实验操作</span>
                    <!-- <i @click="editOperate=true" class="el-icon-edit-outline"></i> -->
                </div>
                <div class="content operation">
                    <el-row>
                        <span v-if="isLock==false">
                            <el-button style="background-color:#F79500;" :disabled="isOver"  @click="lockExperiment()">锁定实验</el-button>
                            <!-- <div>锁定完状态可以恢复</div> -->
                        </span>
                        <span v-if="isLock==true">
                            <el-button type="success" :disabled="isOver" @click="recoverExperiment()">解锁实验</el-button>
                            <!-- <div>锁定完状态可以恢复</div> -->
                        </span>
                        <span>
                            <el-button type="danger" :disabled="isOver" @click="overExperiment()">完结实验</el-button>
                            <!-- <div>结束了就不可以恢复</div> -->
                        </span>
                        <span>
                            <el-button type="info" :disabled="!isOver" @click="delExperiment()">删除实验</el-button>
                            <!-- <div>只有完结课程才可以删除</div> -->
                        </span>
                    </el-row>
                    <div class="btnText">注：只有已结束的课程才可以被删除</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import breadCrumb from '@/components/breadCrumb'
import TinymceEditor from '@/components/tinymce-editor'
import uploadFile from '@/components/uploadFile'
export default {
    props: {

    },
    data() {
        return {
            navData:[
                {
                    name: "实验列表",
                    path: `/admin/courseList/experiment/${this.$route.params.courseId}`
                },{
                    name: "实验详情",
                    path: ""
                }
            ],
            isLock: false,
            isOver: false, // b
            detail: {},
            editMessage: false,
            editDetail: false,
            editFile: false,
            editAnswer: false,
            editAnswerFile: false,
            editOperate: false,
            form: {
                // experimentIntro: '',
                // isQuezhi:'0',//
                isAnswerQuezhi:'0',//
                // punishment:''
            },
            rules: {
                experimentName: [
                    { required: true, message: '不能为空', trigger: 'change'  }
                ],
                valve: [
                    { required: true, message: '不能为空', trigger: 'change'  }
                ]
            },
            experimentDetailFile: [], //.experimentDetailFile
            experimentAnswerFile:[] //this.detail.experimentAnswerFile
        };
    },
    computed: {

    },
    created() {
        this.init()
    },
    mounted() {

    },
    filters:{
        recordStatus(value){
            switch(value){
                case 0:return '正常';break;
                case 1:return '锁定';break;
                case 2:return '删除';break;
                case 3:return '结束';break;
                default:return '';
            }
        }
    },
    watch: {

    },
    methods: {
        handleFileSuccess(file, fileList) {
            if(file.response){
                this.detail.experimentDetailFile.push(file.response.data);
            }
            this.experimentDetailFile = fileList
            console.log("su",this.detail.experimentDetailFile)
        },
        handleFileRemove(file, fileList){
            this.$refs.uploadDetailFile.clearFiles()
            this.experimentDetailFile = fileList
            console.log("mv", this.experimentDetailFile)
        },
        handleAnswerFileSuccess(file, fileList) {
            if(file.response){
                this.detail.experimentAnswerFile.push(file.response.data);
            }
            this.experimentAnswerFile = fileList
        },
        handleAnswerFileRemove(file, fileList){
            this.$refs.uploadAnswerFile.clearFiles()
            this.experimentAnswerFile = fileList
        },
        updateInfo(formName){
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$http.post(`/teaching/teacher/experiment/updateExperimentInfo`,{
                        "experimentId": this.detail.experimentId,
                        "experimentName": this.detail.experimentName,
                        "valve": this.detail.valve,
                        "experimentIntro": this.detail.experimentIntro,
                        // "punishment": this.form.punishment
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
        updateDetail(){
            this.$http.post(`/teaching/teacher/experiment/updateExperimentDetail`,{
                   "experimentDetailId": this.detail.experimentDetailId, 
	                "experimentText": this.detail.experimentText
                }
            ).then((res) => { 
                if(res.data.code == "0"){
                    this.editDetail = false
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
                this.loading=false
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        updateDetailFile(param){
            console.log("123")
            this.$http.post(`/teaching/teacher/experiment/updateExperimentFile`,{
                    "experimentId": this.detail.experimentId,
                    "experimentDetailFile": param
                }
            ).then((res) => { 
                if(res.data.code == "0"){
                    this.editFile = false
                    this.init()
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
        },
        updateAnswer(){
            this.$http.post(`/teaching/teacher/experiment/updateExperimentAnswer`,{
                    "experimentAnswerId":this.detail.experimentAnswerId,
                    "experimentAnswerContent":this.detail.experimentAnswerContent,
                    "experimentId":this.detail.experimentId,
                    "punishment":this.detail.punishment
                }
            ).then((res) => { 
                if(res.data.code == "0"){
                    this.editAnswer = false
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
                this.loading=false
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        updateAnswerFile(){
            this.$http.post(`/teaching/teacher/experiment/updateExperimentAnswerFile`,{
                    "experimentAnswerId":this.detail.experimentAnswerId,
                    "experimentAnswerFile": this.filterFiles(this.detail.experimentAnswerFile,this.experimentAnswerFile)
                }
            ).then((res) => { 
                if(res.data.code == "0"){
                    this.editAnswerFile = false
                    this.init()
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
                this.loading=false
            })
            .catch(function (error) {
                console.log(error)
            })
        },
        lockExperiment(){
            this.$http.get(`/teaching/teacher/experiment/lock/${this.$route.params.experimentId}`
            ).then((res) => { 
                if(res.data.code == "0"){
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    });
                    this.isLock=true
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
        },
        recoverExperiment(){
            this.$http.get(`/teaching/teacher/experiment/unlock/${this.$route.params.experimentId}`
            ).then((res) => { 
                if(res.data.code == "0"){
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    });
                    this.isLock=false
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
        },
        overExperiment(){
            this.$http.get(`/teaching/teacher/experiment/end/${this.$route.params.experimentId}`
            ).then((res) => { 
                if(res.data.code == "0"){
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    });
                    this.isOver=true
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
        },
        delExperiment(){
            this.$http.get(`/teaching/teacher/experiment/invalid/${this.$route.params.experimentId}`
            ).then((res) => { 
                if(res.data.code == "0"){
                    this.$router.push(`/admin/courseList/experiment/${this.$route.params.courseId}`)
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
        },
        closeInfo(){
            this.editMessage=false
            this.init()
        },
        closeDetail(){
            this.editDetail=false
            this.init()
        },
        closeDetailFile(){
            this.editFile=false
            this.init()
        },
        closeAnswer(){
            this.editAnswer=false
            this.init()
        },
        closeAnswerFile(){
            this.editAnswerFile=false
            this.init()
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
            for(let i=0;i<files.length;i++){
                for(let j=0;j<allFiles.length;j++){
                    if(files[i].name==allFiles[j].fileName){
                        result.push(allFiles[j])
                        break;
                    }
                }
            }
            // console.log("filterFiles",result,allFiles, files)
            return result
        },
        init(){
            this.$http.get(`/teaching/teacher/experiment/detail/${this.$route.params.experimentId}`
            ).then((res) => { 
                if(res.data.code == "0"){
                    this.detail = res.data.data
                    this.experimentDetailFile = this.transformFile(this.detail.experimentDetailFile)
                    this.experimentAnswerFile = this.transformFile(this.detail.experimentAnswerFile)
                    // this.detail.experimentStatus = this.detail.experimentStatus.toString()
                    if(!this.detail.experimentDetailFile){
                        this.detail.experimentDetailFile = [] //.experimentDetailFile
                    }
                    if(!this.detail.experimentAnswerFile){
                        this.detail.experimentAnswerFile =[]
                    }
                    if(this.detail.experimentStatus==3){
                        this.isOver=true
                    }
                    if(this.detail.experimentStatus==1){
                        this.isLock=true
                    }
                    if(this.detail.experimentStatus==0){
                        this.isLock=false
                    }
                }else if (res.data.code == "1") {
                    this.$router.push('/login'); 
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
        breadCrumb,
        TinymceEditor,
        uploadFile
    },
};
</script>

<style scoped lang="scss">
.page{
    padding: 0 20px;
    .containner{
        // padding:0 1em;
        padding:10px 0 16px 16px;
        .colorText{
            color: #F75C39;
        }
        .btnText{
            color: #3D3D3D;
            font-size: 12px;
            margin-top: 6px;
            margin-left: 10px;
        }
        .session{
            .navTitle{
                padding:10px;
                position: relative;
                border-bottom: 1px solid #E9E9E9;
                height: 1em;
                line-height: 1em;
                .title{
                    float: left;
                }
                i{
                    float: right;
                }
            }
            .content{
                padding: 1em;
                color:#333333;
                // padding: 2em 5em 3em;
                .simpleInput{
                    margin-bottom: 1em;
                    .el-input{
                        width: 100px;
                    }
                }
                p{
                    line-height: 2em;
                }
                .item{
                    .description{
                        display: inline-block;
                        line-height: 2em;
                        margin-left: 1em;
                    }
                }
                .btnGroup-center{
                    margin: 2em 0;
                    text-align: center;
                }
                .btnGroup{
                    margin: 1em 0;
                }
                .uploadFile{
                    padding: 0.5em;
                    background: #F4F4F5;
                    span{
                        color: #6D7278;
                        margin-left: 1em;
                    }
                }
            }
            .specialContent{
                padding: 2em 5em 3em;
            }
            .editMessage{    
                .imageBox{
                    display: inline-block;
                    vertical-align: top;
                    padding-top: 4em;
                    width: 15%;
                    box-sizing: border-box;
                }
                .description{
                    border-left: 1px solid #E5E5E5;
                    padding: 0 2em;
                    width: 75%;
                    box-sizing: border-box;
                }
            }
            .operation{
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
            }

        }
    }
 
}
</style>
