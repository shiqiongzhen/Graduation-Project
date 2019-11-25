<template>
    <div class="page">
        <div class="title">
            <h3>{{ experimentName }}</h3>
        </div>
        <div class="content">
            <div class="leftContent">   
                <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
                    <el-tab-pane label="实验内容" name="content">
                        <div class="experimentContent">
                            {{ experimentText }}
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="实验资源" name="resource">
                        <div class="experimentContent">
                            <router-view></router-view>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="查看答案" name="answer">
                        <div class="experimentContent">
                            <router-view></router-view>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="老师评价" name="evaluation">
                        <div class="experimentContent">
                            <router-view></router-view>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="rightContent">   
                <div>
                    <tinymceEditor v-model="recordText" :height="editorHeight"></tinymceEditor>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="leftFooter">
                <el-button @click="drawer = true" type="primary"><i class="el-icon-s-unfold"></i> 实验列表</el-button>
            </div>
            <div class="rightFooter">
                <el-button type="primary" @click="submit()" :disabled="disabled">提交</el-button>
            </div>
        </div>
        <el-drawer
        title="实验列表"
        :visible.sync="drawer"
        direction="ltr">
            <ul class="sidebar">
                <li v-for="(item,index) in experimentList" :key="index" @click="doExperiment(item.experimentId)">
                    {{item.experimentName}}-{{item.experimentText}}
                </li>
            </ul>
        </el-drawer>
    </div>
</template>

<script>
import TinymceEditor from '@/components/tinymce-editor'

export default {
    props: {
        
    },
    data() {
        return {
            activeName: 'content',
            experimentName: "",
            experimentText: "",
            experimentList: [],
            recordText: '',
            recordFile:[],
            editorHeight: "70vh",
            drawer: false, // 侧边栏
            disabled: false, // 是否可提交
        };
    },
    computed: {

    },
    created() {
        this.clearData(this.init())
    },
    mounted() {

    },
    watch: {
    },
    methods: {
      init(){
            this.$http.get(`/teaching/student/experiment/info/${this.$route.params.experimentId}`
            ).then((res) => {    
                if(res.data.code == "0"){
                    if(res.data.data.experiment){
                        const experiment = res.data.data.experiment
                        this.experimentName = experiment.experimentName
                        this.experimentText = experiment.experimentText
                    }
                    if(res.data.data.record){
                        const record = res.data.data.record
                        this.recordFile = record.userExperimentFile
                        this.recordText = record.userExperimentText
                        if(record.status==1||record.status==4){
                            this.disabled=true
                        }
                    }
                }else if (res.data.code == "1") {
                    this.$router.push('/login'); 
                }else{
                    this.$message({
                        message: res.data.msg,
                        type: 'error'
                    });
                    console.log("1")
                }
            })
            .catch(function (error) {
                console.log(error)
            })
            // 侧边弹出框的实验列表
            this.$http.get(`/teaching/student/course/info/${this.$route.params.detailId}`
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
        this.experimentText= ""
        this.experimentList= []
        this.recordText= ''
        this.recordFile= []
      },
      handleClick(tab, event) {
          console.log(tab)
        switch(tab.label){
            case '实验内容':this.$router.push(`/courseList/${this.$route.params.detailId}/${this.$route.params.experimentId}`);break;
            case '实验资源':this.$router.push(`/courseList/${this.$route.params.detailId}/resource/${this.$route.params.experimentId}`);break;
            case '查看答案':this.$router.push(`/courseList/${this.$route.params.detailId}/answer/${this.$route.params.experimentId}`);break;
            case '老师评价':this.$router.push(`/courseList/${this.$route.params.detailId}/evaluation/${this.$route.params.experimentId}`);break;
            default:return;
        }
      },
      doExperiment(id){
          this.drawer=false
          this.$router.push(`/courseList/${this.$route.params.detailId}/${id}`)
          this.clearData(this.init())
      },
      // 提交实验内容
      submit(){
        this.$http.post(`/teaching/record/save`,{
            experimentId: this.$route.params.experimentId,
            userExperimentText: this.recordText,
            userExperimentFile: this.recordFile,
	        teacherId:1
        }).then((res) => { 
            if(res.data.code == "0"){
                this.$message({
                    message: '提交成功！',
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
    },
    components: {
      TinymceEditor
    },
};
</script>

<style scoped lang="scss">
@import '@/assets/style/common/mixin.scss';
.page{
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
            &:hover{
                cursor: pointer;
            }
        }
    }
}
</style>
