<template>
    <div class="page">
        <div class="title">
            <el-select v-model="selectValue" size="small" placeholder="时间排序">
                <el-option label="区域一"  value="123">降序</el-option>
                <el-option label="区域二"  value="123">升序</el-option>
            </el-select>
        </div>
        <div v-if="!loading&&(!experimentList||experimentList.length==0)">
            <!-- <el-alert
                title="暂无数据"
                type="info"
                center
                show-icon>
            </el-alert> -->
            <div class="empty">
                <img src="@/assets/image/empty/resource.png" alt="">
                <p>这里暂无资源哦，快提醒老师上传吧</p>
            </div>
        </div>
        <spin :loading="loading"/>
        <div v-for="(item,index) in experimentList" :key="index">
            <a class="item" :href="item.filePath">
                <img src="@/assets/image/file/doc.png" alt="" v-if="item.fileType=='doc'">
                <img src="@/assets/image/file/ppt.png" alt="" v-if="item.fileType=='ppt'">
                <img src="@/assets/image/file/pdf.png" alt="" v-if="item.fileType=='pdf'">
                <img src="@/assets/image/file/excel.png" alt="" v-if="item.fileType=='excel'">
                <img src="@/assets/image/file/txt.png" alt="" v-if="item.fileType=='txt'">
                <img src="@/assets/image/file/rar.png" alt="" v-if="item.fileType=='rar' || item.fileType=='zip'">
                <img src="@/assets/image/file/default.png" alt="" v-if="['doc','ppt','pdf','excel','txt','rar','zip'].indexOf(item.fileType)==-1">
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
import spin from '@/components/spin.vue'
export default {
    props: {

    },
    data() {
        return {
             experimentList: [],
             selectValue:"",
             loading: true
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
    },
    components: {
        spin
    },
};
</script>

<style scoped lang="scss">
@import '@/assets/style/common/mixin.scss';
.page{
    margin-top: -1em;
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
    .empty{
        color:#5EABFF;
        text-align: center;
        margin-top: 15vh;
        p{
            margin-top:5px;
            font-weight: bold;
        }
    }
    .item{
        border-bottom: 1px solid #E9E9E9;
        padding:1em;
        display: flex;
        img{
            width:40px;
            height: 40px;
            border-radius: 4px;
        }
        .description{
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
</style>
