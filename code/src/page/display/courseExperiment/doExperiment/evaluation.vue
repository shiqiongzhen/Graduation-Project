<template>
    <div class="page">
        <!-- <div class="header">
            <img src="@/assets/image/user/teacher.png" alt="">
            {{teacherName}}
        </div> -->
        <spin :loading="loading"/>
        <div class="content" v-if="!loading">
            <div class="empty" v-if="score!=0&&!score&&!comment">
                <img src="@/assets/image/empty/evaluation.png" alt="">
                <p>老师还未点评哦，请耐心等待吧</p>
            </div>
            <div v-else>
                <div>实验成绩：<el-tag type="danger">{{score||(score=='0'&&'0')||"无"}}</el-tag></div>
                <div>老师评价：{{comment||"无"}}</div>
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
            // teacherName:"测试老师",
            score: null,
            comment: null,
            loading: true
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
    // .header{
    //     img{
    //         vertical-align: middle;
    //     }
    // }
    .content{
        .empty{
            color:#5EABFF;
            text-align: center;
            margin-top: 15vh;
            p{
                margin-top:5px;
                font-weight: bold;
            }
        }
        div{
            margin-bottom: 0.5em;
            .el-tag{
                border-radius: 40%;
            }
        }
    }
}
</style>
