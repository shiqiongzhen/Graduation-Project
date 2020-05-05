<template>
    <div class="page">
        <spin :loading="loading"/>
        <div class="empty" v-if="!loading && !answerContent && (answerFileList.length==0)">
            <img src="@/assets/image/empty/answer.png" alt="">
            <p>这里暂无答案哦，快提醒老师上传吧</p>
        </div>
       <div class="container" v-if="!loading">
            <div v-html="answerContent"></div>
            <div class="footer">
                <el-divider>答案附件</el-divider>
                <div v-for="(item,index) in answerFileList" :key="index">
                    <a class="item" :href="item.filePath">
                        <img src="@/assets/image/file/doc.png" alt="" v-if="item.fileType=='doc'">
                        <img src="@/assets/image/file/ppt.png" alt="" v-if="item.fileType=='ppt'">
                        <img src="@/assets/image/file/pdf.png" alt="" v-if="item.fileType=='pdf'">
                        <img src="@/assets/image/file/excel.png" alt="" v-if="item.fileType=='excel'">
                        <img src="@/assets/image/file/txt.png" alt="" v-if="item.fileType=='txt'">
                        <img src="@/assets/image/file/default.png" alt="" v-if="['doc','ppt','pdf','excel','txt'].indexOf(item.fileType)==-1">
                        <span class="description">
                            <h3>{{item.fileName}}.{{item.fileType}}</h3>
                            <div>{{item.fileSize||0}}</div>
                            <div>{{item.createTime}}</div>
                        </span>
                    </a>
                </div>
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
            answerContent:"",
            answerFileList:[],
            loading: true
        };
    },
    computed: {

    },
    created() {
        if(this.$route.params.experimentAnswerId!="null"){
             this.$http.get(`/teaching/student/experiment/answer/${this.$route.params.experimentAnswerId}`
            ).then((res) => {    
                if(res.data.code == "0"){
                    this.$confirm("提前查看答案会扣除一定比例的分数，是否继续？", '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.answerContent = res.data.data.experimentAnswerContent||""
                        this.answerFileList = res.data.data.experimentAnswerFileList||[]
                        this.loading=false
                    }).catch(() => {
                        this.$router.push(`/courseList/${this.$route.params.courseId}/content/${this.$route.params.experimentId}`)
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
        }else{
            console.log("wu1",this.$route.params.experimentAnswerId)
            this.loading=false
        }
    },
    mounted() {

    },
    watch: {

    },
    methods: {

    },
    components: {
        spin
    },
};
</script>

<style scoped lang="scss">
.page{
    .empty{
        color:#5EABFF;
        text-align: center;
        margin-top: 15vh;
        p{
            margin-top:5px;
            font-weight: bold;
        }
    }
    .container{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 60vh;
        overflow: auto;
    }
    .footer{
        .item{
            display: flex;
            border-bottom: 1px solid #E9E9E9;
            padding:1em;
            img{
                width:40px;
                height: 40px;
                border-radius: 4px;
            }
            .description{
                // display: inline-block;
                // line-height: 1.3em;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin-left: 12px;
                font-size: 0.7em;
                width: 75%;
                h3{
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                }
                div{
                    color:#7F7E7E;
                }
            }
        }
    }
}
</style>
