<template>
    <div class="page">
         <breadCrumb :data="navData"></breadCrumb>
        <!-- <div v-if="detail==''">
            <el-alert
                title="暂无数据"
                type="info"
                center
                show-icon>
            </el-alert>
        </div> -->
        <div>
            <div class="item">
                <img :src="headUrl" alt="" class="headUrl">
                <span class="description">
                    <span>{{nickName}}</span>
                    <div> <span>总成绩</span><span class="score">{{score}}</span>/100</div>
                </span>
            </div>
            <el-table
                :header-cell-style="{background:'#F5F7FA'}"
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
                    <template slot-scope="scope">
                        <span class="score">{{scope.row.experimentAchievement}}</span>
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
                    修改
                    </el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import breadCrumb from '@/components/breadCrumb'
export default {
    props: {

    },
    data() {
        return {
            navData:[
                {
                    name: "学生管理",
                    path:`/admin/courseList/manage/${this.$route.params.courseId}`
                },{
                    name: "学生成绩详情",
                    path: ""
                }
            ],
            tableData: [],
            score:"",
            nickName:"",
            headUrl: ""
        };
    },
    computed: {

    },
    created() {
        this.$http.get(`/teaching/teacher/achievement/score/${this.$route.params.courseId}?userId=${this.$route.params.userId}`
        ).then((res) => { 
            if(res.data.code == "0"){
                this.tableData = res.data.data.experiments
                this.score = res.data.data.score
                this.nickName=res.data.data.nickName
                this.headUrl=res.data.data.headUrl
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
        this.$router.push(`/admin/judge/${this.$route.params.courseId}/${row.experimentId}/${this.$route.params.userId}`)
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
        breadCrumb
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
        padding:30px;
        .headUrl{
            width: 60px;
            height: 60px;
            border-radius: 50%;
            vertical-align: middle;
        }
        .description{
            display: inline-block;
            line-height: 2.1em;
            margin-left: 1em;
            vertical-align: middle;
            span{
                font-weight: bold;
            }
            .score{
                color:#FB6430;
                margin-left: 1em;
            }
        }
    }
    .el-table{
        .score{
            color:#F75C39;
        }
    }
}
</style>
