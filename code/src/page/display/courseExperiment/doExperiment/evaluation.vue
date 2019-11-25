<template>
    <div class="page">
        <!-- <div class="header">
            <img src="@/assets/image/user/teacher.png" alt="">
            {{teacherName}}
        </div> -->
        <div class="content">
            <div>实验成绩：<el-tag type="danger">{{score}}</el-tag></div>
            <div>老师评价：{{comment}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            // teacherName:"测试老师",
            score: '无',
            comment: "无"
        };
    },
    computed: {

    },
    created() {
        this.$http.get(`/teaching/student/experiment/info/${this.$route.params.experimentId}`
        ).then((res) => {    
            if(res.data.code == "0"){
                if(res.data.data.record){
                    const record = res.data.data.record
                    this.score = record.experimentAchievement
                    this.comment = record.teacherComment
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
.page{
    // .header{
    //     img{
    //         vertical-align: middle;
    //     }
    // }
    .content{
        div{
            margin-bottom: 0.5em;
            .el-tag{
                border-radius: 40%;
            }
        }
    }
}
</style>
