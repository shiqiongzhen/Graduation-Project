<template>
    <div class="page">
        <div class="title">
            全部
        </div>
        <div v-if="experimentList.length==0||!experimentList">
            <el-alert
                title="暂无数据"
                type="info"
                center
                show-icon>
            </el-alert>
        </div>
        <div v-for="(item,index) in experimentList" :key="index">
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
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
             experimentList: [],
        };
    },
    computed: {

    },
    created() {
        this.$http.get(`/teaching/student/course/resource/${this.$route.params.detailId}`
        ).then((res) => { 
            if(res.data.code == "0"){
                this.courseName = res.data.data.courseName
                this.experimentList = res.data.data
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
    padding:0 20px;
    .title{
        padding:10px;
        position: relative;
        border-bottom: 1px solid #E9E9E9;
        font-weight: bold;
    }
    .item{
        display: block;
        border-bottom: 1px solid #E9E9E9;
        padding:1em;
        .description{
            display: inline-block;
            line-height: 1.9em;
            margin-left: 0.3em;
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
</style>
