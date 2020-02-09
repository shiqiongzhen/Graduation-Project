<template>
    <div class="page">
        <div class="title">
            全部
        </div>
        <spin :loading="loading"/>
        <div class="empty" v-if="!loading&&empty">
            <img src="@/assets/image/empty/noScore.png" alt="">
            <p>这里什么东西都没有哦，浏览其他页面吧</p>
        </div>
        <div v-else>
            <div class="item" v-if="!loading">
                <el-progress type="circle" width="100" :percentage="percentage" v-if="percentage!==100"></el-progress>
                <el-progress type="circle" width="100" :percentage="percentage" status="success" v-if="percentage==100"></el-progress>
                <span class="description">
                    <h4>总成绩</h4>
                    <div><span class="colorText" style="font-size:16px;">{{percentage}}</span><span style="font-size:14px;"> / 100</span></div>
                </span>
            </div>
            <el-table
                v-if="!loading"
                :data="tableData"
                style="width: 100%"
                :header-cell-style="{background:'#F8F8F8'}"
                :row-class-name="tableRowClassName">
                <el-table-column
                prop="experimentName"
                label="实验名称"
                width="500">
                </el-table-column>
                <el-table-column
                label="成绩">
                    <template slot-scope="scope">
                        <span class="colorText">
                        {{ scope.row.experimentAchievement }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                label="操作"
                fixed="right">
                <template slot-scope="scope">
                    <el-button
                    @click="routeToExperiment(scope.row)"
                    type="text"
                    size="small">
                    详情
                    </el-button>
                </template>
                </el-table-column>
            </el-table>
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
            tableData: null,
            percentage: 0,
            loading: true,
            empty: false
        };
    },
    computed: {

    },
    created() {
        this.$http.get(`/teaching/student/course/score/${this.$route.params.courseId}`
        ).then((res) => { 
            if(res.data.code == "0"){
                if(res.data.data){
                    this.tableData = res.data.data.experiments
                    this.percentage = res.data.data.score
                }else{
                    this.empty=true
                }
                this.loading=false
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
      routeToExperiment(row){
        this.$router.push(`/courseList/${this.$route.params.courseId}/content/${row.experimentId}`)
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex%2==0) {
            // console.log("1")
          return 'grey-row';
        }
            // console.log("0")
        return '';
      }
    },
    components: {
        spin
    },
};
</script>

<style scoped lang="scss">
.page{
    padding:0 20px;
    .colorText{
        color: #F75C39;
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
    .title{
        padding:10px;
        position: relative;
        border-bottom: 1px solid #E9E9E9;
        font-weight: bold;
    }
    .item{
        // padding:1em;
        padding:30px;
        .el-progress{
            vertical-align: middle;
        }
        .description{
            display: inline-block;
            line-height: 1.8em;
            margin-left: 1em;
            vertical-align: middle;
        }
    }
}
</style>
