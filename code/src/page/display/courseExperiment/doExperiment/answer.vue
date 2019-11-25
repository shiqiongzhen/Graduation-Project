<template>
    <div class="page">
       <div class="container">
            <div>{{answerContent}}</div>
            <div class="footer">
                <el-divider>答案附件</el-divider>
                <div v-for="(item,index) in answerFileList" :key="index">
                    <a class="item" :href="item.filePath">
                        <img src="@/assets/image/file/doc.png" alt="" v-if="item.fileType=='doc'">
                        <img src="@/assets/image/file/ppt.png" alt="" v-if="item.fileType=='ppt'">
                        <img src="@/assets/image/file/pdf.png" alt="" v-if="item.fileType=='pdf'">
                        <span class="description">
                            <h3>{{item.fileName}}</h3>
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
export default {
    props: {

    },
    data() {
        return {
            answerContent:"",
            answerFileList:[]
        };
    },
    computed: {

    },
    created() {
        this.$http.get(`/teaching/student/experiment/answer/${this.$route.params.experimentId}`
        ).then((res) => {    
            if(res.data.code == "0"){
                this.answerContent = res.data.data.experimentAnswerContent
                this.answerFileList = res.data.data.experimentAnswerFileList
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
    mounted() {

    },
    watch: {

    },
    methods: {

    },
    components: {

    },
};
</script>

<style scoped lang="scss">
.page{
    .container{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 60vh;
        overflow: auto;
    }
    .footer{
        .item{
            display: block;
            border-bottom: 1px solid #E9E9E9;
            padding:1em;
            img{
                width:40px;
                height: 40px;
            }
            .description{
                display: inline-block;
                line-height: 1.3em;
                margin-left: 0.3em;
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
