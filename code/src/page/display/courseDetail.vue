<template>
    <div class="page">
        <div class="title">
            全部
        </div>
        <div v-if="detail==''">
            <el-alert
                title="暂无数据"
                type="info"
                center
                show-icon>
            </el-alert>
        </div>
        <div v-if="detail!==''">
            <div class="item">
                <img src="@/assets/image/logo/logo100.png" alt="">
                <span class="description">
                    <div>老师：{{detail.teacherNickname}}</div>
                    <div>课程：{{detail.courseName}}</div>
                    <div>代码：{{detail.courseCode}}</div>
                    <div>学分：{{detail.courseCredit}}</div>
                </span>
            </div>
        </div>
        <div class="title">
            基础介绍
        </div>
        <div class="introContent">
            {{detail.courseIntroduction}}
        </div>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            detail:""
        };
    },
    computed: {

    },
    created() {
        this.$http.get(`/teaching/student/course/detail/${this.$route.params.detailId}`
        ).then((res) => { 
            if(res.data.code == "0"){
                this.detail = res.data.data
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
        padding:1em;
        img{
            width: 100px;
            height: 100px;
        }
        .description{
            display: inline-block;
            line-height: 1.8em;
            margin-left: 1em;
        }
    }
    .introContent{
        padding:1em;
    }
}
</style>
