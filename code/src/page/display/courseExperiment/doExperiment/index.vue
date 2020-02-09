<template>
    <div class="page">
        <div class="title">
            <h3>{{ experimentName }}</h3>
        </div>
        <div class="content">
            <div class="leftContent">   
                <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
                    <el-tab-pane label="实验内容" name="content"></el-tab-pane>
                    <el-tab-pane label="实验资源" name="resource"></el-tab-pane>
                    <el-tab-pane label="查看答案" name="answer"></el-tab-pane>
                    <el-tab-pane label="老师评价" name="evaluation"></el-tab-pane>
                </el-tabs>
                <div class="experimentContent">
                    <router-view></router-view>
                </div>
            </div>
            <div class="rightContent">   
                <div class="editor">
                    <tinymceEditor v-model="recordText" :height="editorHeight"></tinymceEditor>
                </div>
                <div class="upload">
                    <uploadFile
                    :allFile= "recordFile"
                    :someFile= "someFile"
                    v-on:updateFile= "updateRecordFile"
                    :isClose= "false"
                    ></uploadFile>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="leftFooter">
                <el-button @click="drawer = true" type="primary"><i class="el-icon-s-unfold"></i> 实验列表</el-button>
            </div>
            <div class="rightFooter">
                <el-button type="primary" @click="submit()" :disabled="isDisable">提交</el-button>
            </div>
        </div>
        <el-drawer
        title="实验列表"
        :visible.sync="drawer"
        direction="ltr">
            <ul class="sidebar">
                <li v-for="(item,index) in experimentList" :key="index" @click="doExperiment(item.experimentId)">
                    <span class="left">{{item.experimentName}}</span>
                    <div class="right">
                        <span class="statusZero ball" v-if="item.recordStatus=='0'"></span>
                        <span class="statusOne ball" v-if="item.recordStatus=='1'"></span>
                        <span class="statusTwo ball" v-if="item.recordStatus=='2'"></span>
                        <span class="statusThree ball" v-if="item.recordStatus=='3'"></span>
                        <span class="statusFour ball" v-if="item.recordStatus=='4'"><i class="el-icon-lock"></i></span>
                        <span>{{item.recordStatus | recordStatus}}</span>
                    </div>
                </li>
            </ul>
        </el-drawer>
    </div>
</template>

<script>
import TinymceEditor from '@/components/tinymce-editor'
import uploadFile from '@/components/uploadFile'

export default {
    props: {
        
    },
    data() {
        return {
            activeName: 'content',
            experimentName: "",
            experimentList: [],
            recordText: '',
            editorHeight: "55vh",
            recordFile:[],
            someFile: [],
            drawer: false, // 侧边栏
            isDisable: true, // 不可提交
        };
    },
    computed: {

    },
    created() {
        this.clearData(this.init())
    },
    mounted() {

    },
    filters: {
      recordStatus: (value) => {
        switch(value){
            case 0:return '待审核';break;
            case 1:return '已审核';break;
            case 2:return '未通过';break;
            case 3:return '未提交';break;
            case 4:return '未解锁';break;
            default:return '';
        }
      },
    },
    methods: {
      updateRecordFile(data){
          this.recordFile=data
          this.$message({
             message: "保存成功！",
             type: 'success'
          });
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
      init(){
            this.$http.get(`/teaching/student/experiment/info/${this.$route.params.experimentId}`
            ).then((res) => {   
                if(res.data.code == "0"){
                    if(res.data.data.experiment){
                        const experiment = res.data.data.experiment
                        this.experimentName = experiment.experimentName
                    }
                    if(res.data.data.record){
                        const record = res.data.data.record
                        this.recordFile = record.userExperimentFile||[]
                        this.someFile = this.transformFile(this.recordFile)
                        this.recordText = record.userExperimentText
                        if(res.data.data.experiment.experimentStatus==0 && record.status!=1 && record.status!=4){
                            this.isDisable=false // 能提交
                        }
                    }else{
                        if(res.data.data.experiment && res.data.data.experiment.experimentStatus==0){
                            this.isDisable=false // 能提交
                        }
                    }
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
            // 侧边弹出框的实验列表
            this.$http.get(`/teaching/student/course/info/${this.$route.params.courseId}`
            ).then((res) => { 
                if(res.data.code == "0"){
                    this.experimentList = res.data.data.experimentDTOList
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
      clearData(){
        this.experimentName= ""
        this.experimentList= []
        this.recordText= ''
        this.recordFile= []
        this.isDisable= true // 是否可提交
      },
      handleClick(tab, event) {
        switch(tab.label){
            case '实验内容':this.$router.push(`/courseList/${this.$route.params.courseId}/content/${this.$route.params.experimentId}`);break;
            case '实验资源':this.$router.push(`/courseList/${this.$route.params.courseId}/resource/${this.$route.params.experimentId}`);break;
            case '查看答案':this.$router.push(`/courseList/${this.$route.params.courseId}/answer/${this.$route.params.experimentId}`);break;
            case '老师评价':this.$router.push(`/courseList/${this.$route.params.courseId}/evaluation/${this.$route.params.experimentId}`);break;
            default:return;
        }
      },
      doExperiment(id){
          this.drawer=false
          this.$router.push(`/courseList/${this.$route.params.courseId}/content/${id}`)
          this.clearData(this.init())
      },
      // 提交实验内容
      submit(){
        this.$http.post(`/teaching/record/save`,{
            experimentId: this.$route.params.experimentId,
            userExperimentText: this.recordText,
            userExperimentFile: this.recordFile,
	        // teacherId:1
        }).then((res) => { 
            if(res.data.code == "0"){
                this.$message({
                    message: '提交成功！',
                    type: 'success'
                });
                this.$router.push('/courseList/experiment/'+ this.$route.params.courseId)
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
    },
    components: {
      TinymceEditor,
      uploadFile
    },
};
</script>

<style scoped lang="scss">
@import '@/assets/style/common/mixin.scss';
.page{
    background: #FBFBFB;
    color: #333333;
    .title{
        border: 1.5px solid #E9EEF3;
        box-shadow:0px 0px 3px 1px #E9EEF3;
        padding: 1em;
        height: 60px;
        box-sizing: border-box;
    }
    .content{
        .leftContent{
            float: left;
            width: 49%;
            .experimentContent{
                border: 1px solid #E9EEF3;
                padding:1em;
                position: relative;
                top: -15px;
                height: 60vh; // debug
                overflow: auto;
            }
        }
        .rightContent{
            float: right;
            width: 50%;
            margin-top: 1em;
        }
        @include clearfix;
    }
    .footer{
        .leftFooter{
            float: left;
            margin: 1em;
        }
        .rightFooter{
            float: right;
            margin: 1em;
        }
    }
}
.el-drawer{
    .sidebar{
        li{
            padding: 1em;
            border-bottom: 1px solid #eee;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            &:hover{
                cursor: pointer;
            }
            .right{
                display: inline-block;
                span{
                    vertical-align: middle;
                    position: relative;
                    font-size: 14px;
                    color:#7F7E7E;
                }
                .ball{
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    display: inline-block;
                }
                .statusZero{
                    background-color:#ffcc66;
                }
                .statusOne{
                    background-color:#67C23A;
                }
                .statusTwo{
                    background-color:red;
                }
                .statusThree{
                    background-color:#909399;
                }
            }
        }
    }
}
</style>
