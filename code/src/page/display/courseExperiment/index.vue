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
            <div @click="doExperiment(item.experimentId)" class="item">
                <div class="left">
                    <img src="@/assets/image/logo/logo80.png" alt="">
                    <span class="description">
                        <h4>{{item.experimentName||"无"}}</h4>
                        <div>{{item.experimentIntro||"无"}}</div>
                        <div>{{item.experimentCommitNum}}人已提交 | 2019-09-14</div>
                    </span>
                </div>
                <div class="right">
                    <span class="statusZero ball" v-if="item.recordStatus=='0'"></span>
                    <span class="statusOne ball" v-if="item.recordStatus=='1'"></span>
                    <span class="statusTwo ball" v-if="item.recordStatus=='2'"></span>
                    <span class="statusThree ball" v-if="item.recordStatus=='3'"></span>
                    <span class="statusFour ball" v-if="item.recordStatus=='4'"><i class="el-icon-lock"></i></span>
                    <span class="statusFive ball" v-if="item.recordStatus=='5'"></span>
                    <span  :class="addStatusClass(item.recordStatus)">{{item.recordStatus | recordStatus}}</span>
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
        this.$http.get(`/teaching/student/course/info/${this.$route.params.courseId}`
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
      recordStatus: (value) => {
        switch(value){
            case 0:return '待审核';break;
            case 1:return '已审核';break;
            case 2:return '未通过';break;
            case 3:return '未提交';break;
            case 4:return '未解锁';break;
            case 5:return '已结束';break;
            default:return '';
        }
      },
    },
     mounted() {
 
     },
     watch: {
 
     },
     methods: {
      doExperiment(id){
          this.$router.push(`/courseList/${this.$route.params.courseId}/content/${id}`)
      },
      addStatusClass(status){
        switch (status) {
            case 0:
                return 'textZero';
            case 1:
                return 'textOne';
            case 2:
                return 'textTwo';
            case 3:
                return 'textThree';
            case 4:
                return 'textFour';
            case 5:
                return 'textFive';
        }
       }
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
        cursor: pointer;
        .left{
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
            span{
                vertical-align: middle;
                position: relative;
                font-size: 14px;
                color:#7F7E7E;
            }
            .ball{
                width: 14px;
                height: 14px;
                border-radius: 50%;
                display: inline-block;
            }
            .statusZero{
                background-color:#ffcc66;
            }
            .textZero{
                color: #ffcc66;
            }
            .statusOne{
                background-color:#67C23A;
            }
            .textOne{
                color: #67C23A;
            }
            .statusTwo{
                background-color:red;
            }
            .textTwo{
                color: red;
            }
            .statusThree{
                background-color:#909399;
            }
            .textThree{
                color: #909399;
            }
            .statusFive{
                background-color:#E1E1E1;
            }
            .textFive{
                color: #BABABA;
            }
        }
    }
}
</style>
