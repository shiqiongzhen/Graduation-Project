<template>
    <div class="page">
        <div class="title">
            全部
        </div>
        <div class="empty" v-if="!loading&&!experimentList">
            <img src="@/assets/image/empty/empty.png" alt="">
            <p>这里什么东西都没有哦，浏览其他页面吧</p>
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
                    <h4>{{item.fileName||"无"}}</h4>
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
             loading: true
        };
    },
    computed: {

    },
    created() {
        this.$http.get(`/teaching/student/course/resource/${this.$route.params.courseId}`
        ).then((res) => { 
            if(res.data.code == "0"){
                this.experimentList = res.data.data
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
.page{
    padding:0 20px;
    .title{
        padding:10px;
        position: relative;
        border-bottom: 1px solid #E9E9E9;
        font-weight: bold;
    }
    .empty{
        color:#7F7F7F;
        text-align: center;
        margin-top: 15vh;
        p{
            margin-top:5px;
            font-weight: bold;
        }
    }
    .item{
        display: block;
        border-bottom: 1px solid #E9E9E9;
        padding:1em;
        display: flex;
        img{
            border-radius: 4px;
        }
        .description{
            // display: inline-block;
            // line-height: 1.9em;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 12px;
            width: 75%;
            h4{
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
            }
            div{
                color:#7F7E7E;
                font-size: 14px;
            }
        }
    }
}
</style>
