<template>
    <div class="page">
        <div class="title">
            全部
        </div>
        <div class="filteBar">
            <el-button type="primary" size="medium" @click="experimentAdd()">添加实验<i class="el-icon-plus el-icon--right"></i></el-button>
        </div>
        <div class="title">
            已有实验
        </div>
        <div class="empty" v-if="!loading&&!experimentList">
            <img src="@/assets/image/empty/empty.png" alt="">
            <p>快点击左上角相应的图标，创建相应的实验吧~</p>
        </div>
        <spin :loading="loading"/>
        <div v-for="(item,index) in experimentList" :key="index">
            <div class="item" @click="experimentDetail(item.experimentId)">
                <div class="left">
                    <img src="@/assets/image/logo/logo80.png" alt="">
                    <span class="description">
                        <h4>{{item.experimentName||"无"}}</h4>
                        <div>{{item.experimentIntro||"无"}}</div>
                        <div>{{item.experimentCommitNum}}人已提交 | 2019-09-14</div>
                    </span>
                </div>
                <div class="right">
                    <div class="linkDetail"><i class="el-icon-info"></i> 详情</div>
                    <div v-if="item.experimentCommitNum==0"><i class="el-icon-lock"></i>未解锁</div>
                    <div v-if="item.experimentCommitNum==1" style="color:#5CB3FF;"><i class="el-icon-unlock"></i>已解锁</div>
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
             experimentList: [],
             loading: true
         };
     },
     computed: {
 
     },
     created() {
        this.$http.get(`/teaching/teacher/experiment/list/${this.$route.params.courseId}`
        ).then((res) => { 
            if(res.data.code == "0"){
                this.experimentList = res.data.data.experimentDTOList
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
    filters: {
    },
     mounted() {
 
     },
     watch: {
 
     },
     methods: {
      experimentDetail(id){
          this.$router.push(`/admin/courseList/experimentDetail/${this.$route.params.courseId}/${id}`)
      },
      experimentAdd(){
          this.$router.push(`/admin/courseList/${this.$route.params.courseId}/experimentAdd`)
      },
     },
    components: {
        spin
    },
};
</script>

<style scoped lang="scss">
.page{
    // height: 500px;
    padding:0 20px;
    .filteBar{
        padding: 1em 0;
    }
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
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #E9E9E9;
        padding:1em;
        .left{
            display: flex;
            img{
                border-radius: 4px;
            }
            .description{
                // display: inline-block;
                // line-height: 2em;
                display: flex;
                height: 80px;
                flex-direction: column;
                justify-content: space-between;
                margin-left: 12px;
                div{
                    color:#7F7E7E;
                    font-size: 14px;
                }
            }
        }
        .right{
            // display: flex;
            // align-items: flex-end;
            display: inline-block;
            line-height: 2em;
            div{
                font-size: 14px;
                color:#7F7E7E;
            }
            .linkDetail{
                cursor: pointer;
            }
        }
    }
}
</style>
