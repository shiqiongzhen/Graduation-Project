<template>
    <div class="page">
        <div class="title" style="font-weight: bold;">
            全部
        </div>
        <spin :loading="loading"/>
        <div v-if="!loading&&detail==''">
            <el-alert
                title="暂无数据"
                type="info"
                center
                show-icon>
            </el-alert>
        </div>
        <div v-if="detail!==''">
            <div class="item">
                <span class="image">
                    <img v-if="detail.courseCover!=''" :src="detail.courseCover">
                    <img v-else src="@/assets/image/logo/logo100.png"> 
                </span>
                <span class="description">
                    <div>老师：{{detail.teacherNickname}}</div>
                    <div>课程：{{detail.courseName}}</div>
                    <div>代码：{{detail.courseCode}}</div>
                    <div>学分：{{detail.courseCredit}}</div>
                    <div>状态：<span class="textColor">{{detail.courseStatus | courseStatus}}</span></div>
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
import spin from '@/components/spin.vue'
export default {
    props: {

    },
    data() {
        return {
            detail:"",
            loading: true
        };
    },
    computed: {

    },
    created() {
        this.$http.get(`/teaching/student/course/detail/${this.$route.params.courseId}`
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
            this.loading=false
        })
        .catch(function (error) {
            console.log(error)
        })
    },
    mounted() {

    },
    filters: {
      courseStatus: (value) => {
        switch(value){
            case 1:return '进行中';break;
            case 2:return '锁定中';break;
            case 3:return '已结束';break;
            default:return '';
        }
      },
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
    }
    .item{
        // padding:1em;
        padding:2em 5em;
        display: flex;
        .image{
            padding: 20px 0;
            padding-right: 50px;
            border-right: 1px solid#E9E9E9;
            img{
                width: 100px;
                height: 100px;
            }
        }
        .description{
            display: flex;
            // line-height: 1.8em;
            margin-left: 50px;
            flex-direction: column;
            justify-content: space-between;
            .textColor{
                color: #F75C39;
            }
        }
    }
    .introContent{
        // padding:1em;
        padding:2em 5em;
        color: #333333;
    }
}
</style>
