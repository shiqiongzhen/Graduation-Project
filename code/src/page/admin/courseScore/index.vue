<template>
    <div class="page">
        <div class="title">
            全部
        </div>
        <div class="filteBar">
            <div>
                <el-button type="primary" size="medium" @click="judgeBatch()">
                    <i class="el-icon-user"></i>批量批改
                </el-button>
            </div>
            <div>
                <el-select v-model="experimentSelect" size="small" @change="changeExperimentSelect">
                    <el-option v-for="(item,index) in experimentList" :key="index" :label="item.experimentName" :value="item.experimentId"></el-option>
                </el-select>
                <el-select v-model="classSelect" size="small">
                    <el-option v-for="(item,index) in classList" :key="index" :label="item.className" :value="item.classId"></el-option>
                </el-select>
            </div>
        </div>
        <spin :loading="loading"/>
        <div class="empty" v-if="!loading&&(!tableDatas||tableDatas.length==0)">
            <img src="@/assets/image/empty/noGrade.png" alt="">
            <p>尚未有学生提交该实验~</p>
        </div>
        <div v-else>
            <div v-if="!loading&&classSelect=='全部'">
                <div class="table"  v-for="(item,index) in tableDatas" :key="index">
                    <el-collapse v-model="activeNames">
                        <el-collapse-item :title="item.className" :name="index.toString()">
                            <el-table border
                                :data="item.userList">
                                <el-table-column
                                prop="userNumber"
                                label="学号">
                                </el-table-column>
                                <el-table-column
                                prop="nickName"
                                label="学生名称">
                                </el-table-column>
                                <el-table-column
                                prop="status"
                                label="状态">
                                <template slot-scope="scope">
                                    <span class="statusZero ball" v-if="scope.row.status=='0'"></span>
                                    <span class="statusOne ball" v-if="scope.row.status=='1'"></span>
                                    <span class="statusTwo ball" v-if="scope.row.status=='2'"></span>
                                    <span class="statusThree ball" v-if="scope.row.status=='3'"></span>
                                    <span class="statusFour ball" v-if="scope.row.status=='4'"><i class="el-icon-lock"></i></span>
                                    <span>{{scope.row.status | recordStatus}}</span>
                                     <!-- style="vertical-align:middle;" -->
                                </template>
                                </el-table-column>
                                <el-table-column
                                label="操作"
                                fixed="right">
                                    <template slot-scope="scope">
                                        <el-button
                                        @click="judge(scope.row.userId)"
                                        type="text" style="font-size:20px;">
                                        <i class="el-icon-edit-outline"></i>
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </div>
            <div v-if="!loading&&classSelect!=='全部'">
                <div class="table"  v-for="(item,index) in tableDatas" :key="index">
                    <el-collapse v-model="activeNames">
                        <el-collapse-item v-if="item.classId==classSelect" :title="item.className" :name="index.toString()">
                            <el-table border
                                :data="item.userList">
                                <el-table-column
                                prop="userNumber"
                                label="学号">
                                </el-table-column>
                                <el-table-column
                                prop="nickName"
                                label="学生名称">
                                </el-table-column>
                                <el-table-column
                                prop="status"
                                label="状态">
                                <template slot-scope="scope">
                                    <span class="statusZero ball" v-if="scope.row.status=='0'"></span>
                                    <span class="statusOne ball" v-if="scope.row.status=='1'"></span>
                                    <span class="statusTwo ball" v-if="scope.row.status=='2'"></span>
                                    <span class="statusThree ball" v-if="scope.row.status=='3'"></span>
                                    <span class="statusFour ball" v-if="scope.row.status=='4'"><i class="el-icon-lock"></i></span>
                                    {{scope.row.status | recordStatus}}
                                </template>
                                </el-table-column>
                                <el-table-column
                                label="操作"
                                fixed="right">
                                    <template slot-scope="scope">
                                        <el-button
                                        @click="judge(scope.row.userId)"
                                        type="text"
                                        size="small">
                                        <i class="el-icon-edit-outline"></i>
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-collapse-item>
                    </el-collapse>
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
            tableDatas: [],
            experimentList:[],
            classList:[],
            experimentSelect:"",
            classSelect:"全部",
            activeNames: [],
            loading: true
        };
    },
    computed: {

    },
    created() {
        this.$http.get(`/teaching/teacher/achievement/judge/${this.$route.params.courseId}`
        ).then((res) => { 
            if(res.data.code == "0"){
                this.tableDatas = res.data.data.tableDatas
                this.experimentList = res.data.data.experimentList
                this.classList = res.data.data.classList 

                if(this.experimentList instanceof Array){
                    this.experimentSelect=this.experimentList[0].experimentId // 默认第一个选项
                }
                this.updateActiveNames(this.tableDatas) // 获取折叠栏默认打开的所有项
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
    filters:{
        recordStatus(value){
            switch(value){
                case 0:return '待审核';break;
                case 1:return '已审核';break;
                case 2:return '未通过';break;
                case 3:return '未提交';break;
                case 4:return '未解锁';break;
                default:return '';
            }
        }
    },
    mounted() {

    },
    watch: {

    },
    methods: {
        changeExperimentSelect(id){
            new Promise((resolve, reject)=> {
                this.loading=true
                resolve();
            }).then((r)=>{
                this.$http.get(`/teaching/teacher/achievement/judge/${this.$route.params.courseId}?experimentId=${id}`
                ).then((res) => { 
                    if(res.data.code == "0"){
                        this.tableDatas = res.data.data.tableDatas
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
            }).catch(function (reason) {
                console.log('Failed: ' + reason);
            });
        },
        updateActiveNames(data){
            if(data instanceof Array){
                for(var i = 0; i < data.length; i++) {
                    this.activeNames.push(i.toString())
                }
            }
        },
        judgeBatch(){
            this.$router.push(`/admin/judgeBatch/${this.$route.params.courseId}/${this.experimentSelect}`)
        },
        judge(userId){
            this.$router.push(`/admin/judge/${this.$route.params.courseId}/${this.experimentSelect}/${userId}`)
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
    .title{
        padding:10px;
        position: relative;
        border-bottom: 1px solid #E9E9E9;
        font-weight: bold;
    }
    .filteBar{
        padding:30px 0px;
        display: flex;
        justify-content: space-between;
        .el-input{
            width: 200px;
        }
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
    .table{
        // padding: 1em;
        // .el-collapse-item__header {
        //     padding-left: 1em;
        //     background-color: #E1E1E1;
        // }
        .el-table{
            margin-bottom: 50px;
        }
        .el-collapse {
            border-top: 0px;
            border-bottom: 0px;
        }
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
            // vertical-align:middle;
        }
        .statusZero{
            background-color:#ffcc66;
        }
        .statusOne{
            background-color:#67C23A;
        }
        .statusTwo{
            background-color:#F75C39;
        }
        .statusThree{
            background-color:#909399;
        }
    }
}
</style>
