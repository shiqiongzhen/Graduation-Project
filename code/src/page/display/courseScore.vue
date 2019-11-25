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
        <div>
            <div class="item">
                <el-progress type="circle" width="100" :percentage="percentage" v-if="percentage!==100"></el-progress>
                <el-progress type="circle" width="100" :percentage="percentage" status="success" v-if="percentage==100"></el-progress>
                <span class="description">
                    <h4>总成绩</h4>
                    <div>{{percentage}}/100</div>
                </span>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%"
                :row-class-name="tableRowClassName">
                <el-table-column
                prop="experimentName"
                label="实验名称"
                width="500">
                </el-table-column>
                <el-table-column
                prop="experimentAchievement"
                label="成绩">
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
export default {
    props: {

    },
    data() {
        return {
            detail:"123",
            tableData: [],
            percentage: 0,
        };
    },
    computed: {

    },
    created() {
        this.$http.get(`/teaching/student/course/score/${this.$route.params.detailId}`
        ).then((res) => { 
            if(res.data.code == "0"){
                this.tableData = res.data.data.experiments
                this.percentage = res.data.data.score
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
        this.$router.push(`/courseList/${this.$route.params.detailId}/${row.experimentId}`)
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
    .el-table .grey-row{
        background: #F4F4F4;
    }
}
</style>
