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
            <div @click="doExperiment(item.experimentId)" class="item">
                <div class="left">
                    <img src="@/assets/image/logo/logo80.png" alt="">
                    <span class="description">
                        <h3>{{item.experimentName}}</h3>
                        <div>{{item.experimentText}}</div>
                        <div>{{item.submitNumber}}人已提交 | 2019-09-14</div>
                    </span>
                </div>
                <div class="right">
                    <span class="statusZero ball" v-if="item.recordStatus=='0'"></span>
                    <span class="statusOne ball" v-if="item.recordStatus=='1'"></span>
                    <span class="statusTwo ball" v-if="item.recordStatus=='2'"></span>
                    <span class="statusThree ball" v-if="item.recordStatus=='3'"></span>
                    <span class="statusFour ball" v-if="item.recordStatus=='4'"><i class="el-icon-lock"></i></span>
                    <span>{{item.recordStatus | recordStatus}}</span>
                </div>
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
             experimentList: []
         };
     },
     computed: {
 
     },
     created() {
        this.$http.get(`/teaching/student/course/info/${this.$route.params.detailId}`
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
            default:return '';
        }
      },
    },
     mounted() {
 
     },
     watch: {
 
     },
     methods: {
      handleClick(tab, event) {
        switch(tab.label){
            case '实验':this.$router.push(`/courseList/${this.$route.params.detailId}`);break;
            case '资源':this.$router.push(`/courseList/resource/${this.$route.params.detailId}`);break;
            case '课程详情':this.$router.push(`/courseList/detail/${this.$route.params.detailId}`);break;
            default:return;
        }
      },
      doExperiment(id){
          this.$router.push(`/courseList/${this.$route.params.detailId}/${id}`)
      }
     },
    components: {

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
    .item{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #E9E9E9;
        padding:1em;
        .left{
            .description{
                display: inline-block;
                line-height: 1.9em;
                margin-left: 0.3em;
                div{
                    color:#7F7E7E;
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
            }
            .ball{
                width: 1em;
                height: 1em;
                border-radius: 50%;
                display: inline-block;
            }
            .statusZero{
                background-color:#ffcc66;
            }
            .statusOne{
                background-color:#67C23A;
            }
            .statusTwo{
                background-color:red;
            }
            .statusThree{
                background-color:#909399;
            }
        }
    }
}
</style>
