<template>
    <div class="page">
        <div v-if="experimentList.length==0||!experimentList">
            <el-alert
                title="暂无数据"
                type="info"
                center
                show-icon>
            </el-alert>
        </div>
       <div v-else>
            <div class="title">
                <el-select v-model="selectValue" size="small" placeholder="时间排序">
                    <el-option>降序</el-option>
                    <el-option>升序</el-option>
                </el-select>
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
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
             experimentList: [],
             selectValue:"",
        };
    },
    computed: {

    },
    created() {
        this.$http.get(`/teaching/student/experiment/info/${this.$route.params.experimentId}`
        ).then((res) => {    
            if(res.data.code == "0"){
                if(res.data.data.experiment){
                    const experiment = res.data.data.experiment
                    this.experimentList = experiment.experimentDetailFile
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
@import '@/assets/style/common/mixin.scss';
.page{
    .title{
        padding:10px;
        position: relative;
        border-bottom: 1px solid #E9E9E9;
        font-weight: bold;
        .el-select{
            float: right;
        }
        @include clearfix;
    }
    .item{
        border-bottom: 1px solid #E9E9E9;
        padding:1em;
        display: block;
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
</style>
