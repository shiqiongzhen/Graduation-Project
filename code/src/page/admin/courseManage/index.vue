<template>
    <div class="page">
        <div class="title">
            全部
        </div>
        <div class="filteBar">
            <div>
                <el-button type="primary" size="medium" @click="routeToClassManage()">
                    <i class="el-icon-user"></i>班级管理
                </el-button> 
                <el-button type="primary" size="medium">
                    <a :href="'/teaching/teacher/achievement/export/'+this.$route.params.courseId"><i class="el-icon-folder-opened"></i>导出成绩</a>
                </el-button>
            </div>
            <div>
                <el-select v-model="classSelect" size="small">
                    <el-option v-for="(item,index) in classList" :key="index" :value="item.classId" :label="item.className"></el-option>
                </el-select>
            </div>
        </div>
        <spin :loading="loading"/>
        <div class="empty" v-if="!loading&&(!tableDatas||tableDatas.length==0)">
            <img src="@/assets/image/empty/noStudent.png" alt="">
            <p>你还没有添加相应班级哦 请点击左上角相应图标，进行班级管理吧~</p>
        </div>
        <div v-else>
            <div v-if="!loading&&classSelect=='全部'">
                <div class="table"  v-for="(item,index) in tableDatas" :key="index">
                    <el-collapse v-model="activeNames">
                        <el-collapse-item :title="item.className"  :name="index.toString()">
                            <el-table
                                border
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
                                prop="courseAchievement"
                                label="成绩">
                                    <template slot-scope="scope">
                                        <span class="score">{{scope.row.courseAchievement}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                label="操作"
                                fixed="right">
                                    <template slot-scope="scope">
                                        <el-button
                                        @click="routeToExperiment(scope.row.userId)"
                                        type="text"
                                        size="small">
                                        详情
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
                    <el-collapse v-model="activeNames" v-if="item.classId==classSelect">
                        <el-collapse-item :title="item.className"  :name="index.toString()">
                            <el-table
                                border
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
                                prop="courseAchievement"
                                label="成绩">
                                    <template slot-scope="scope">
                                        <span class="score">{{scope.row.courseAchievement}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                label="操作"
                                fixed="right">
                                    <template slot-scope="scope">
                                        <el-button
                                        @click="routeToExperiment(scope.row.userId)"
                                        type="text"
                                        size="small">
                                        详情
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
            classList:[],
            classSelect:"全部",
            activeNames: [],
            classSelectArray:[],
            loading:true,
        };
    },
    computed: {

    },
    created() {
        this.$http.get(`/teaching/teacher/achievement/list/${this.$route.params.courseId}`
        ).then((res) => { 
            if(res.data.code == "0"){
                this.tableDatas = res.data.data.tableDatas
                this.classList = res.data.data.classList

                this.updateActiveNames(this.tableDatas)
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
        // classChange(val){
        //     console.log("cal",val,this.classSelectArray)
        // },
        scoreExport(){
            
        },
        updateActiveNames(data){
            if(data instanceof Array){
                for(var i = 0; i < data.length; i++) {
                    this.activeNames.push(i.toString())
                }
            }
        },
        routeToExperiment(userId){
            this.$router.push(`/admin/courseList/manage/${this.$route.params.courseId}/${userId}`)
        },
        routeToClassManage(){
            this.$router.push(`/admin/courseList/manageClass/${this.$route.params.courseId}`)
        },
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
        border-bottom: 1px solid #E9E9E9;
        font-weight: bold;
    }
    .filteBar{
        padding:30px 0;
        display: flex;
        justify-content: space-between;
        .el-input{
            width: 200px;
        }
        .el-select{
            width: 120px;
        }
        .el-button{
            a{
                color: #FFF;
                font-weight: 500;
                &:hover{
                    color: #FFF;
                }
            }
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
        .el-table{
            margin-bottom: 50px;
        }
        .el-collapse-item__header {
            background-color: #ECECEC;
            padding: 0 1em;
        }
        .score{
            color:#F75C39;
        }
    }
}
</style>
