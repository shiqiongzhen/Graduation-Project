<template>
    <div class="page">
        <div class="addCourse">
            <!-- <i class="el-icon-circle-plus"
            @mouseover="selectAdd='true'"
            @mouseout="selectAdd='false'"></i> -->
            <el-button type="primary" size="small" @click="addCourse()">创建新的班课 <i class="el-icon-circle-plus-outline"></i></el-button>
            <el-button type="primary" size="small" @click="importCourse()">导入已有课程 <i class="el-icon-circle-plus-outline"></i></el-button>
            <!-- <ul v-if="selectAdd == 'true'">
                <li>创建新的班课</li>
                <li>导入已有课程</li>
            </ul> -->
        </div>
        <div class="content">
            <div class="listTitle">
                <span class="title">进行中的课程</span>
                <span class="search">
                    <el-input v-model="searchContent" placeholder="请输入内容" size="small"></el-input>
                    <el-button type="primary" size="small" @click="handleCurrentChange()"><i class="el-icon-search"/></el-button>
                </span>
            </div>
            <div class="imgList">
                <el-row>
                    <el-col :span="6" v-for="(item,index) in normalList" :key="index">
                        <el-card style="margin: 5px">
                            <div @click="getCourseExperiment(item.courseId)">
                                <img class="image" v-if="item.courseCover!=''" :src="item.courseCover">
                                <img class="image" v-else src="@/assets/image/logo/logo250.png"> 
                                <div>
                                    <p>{{item.courseName}}</p>
                                    <p>
                                    <img class="userImage" v-if="item.headUrl!=null" :src="item.headUrl">
                                    <img class="userImage" v-else src="@/assets/image/user/user30.png"> 
                                    {{item.teacherNickname}}</p>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            
            <!-- <div style="text-align:center;">
                <el-pagination
                style="margin-top:30px;"
                background
                layout="prev, pager, next"
                :total="paginations.total"
                :page-size="paginations.page_size"
                :current-page.sync="paginations.page_current"
                @current-change="handleCurrentChange">
                </el-pagination>
            </div> -->
        </div>
        <div class="content">
            <div class="listTitle">
                <span class="title">已结束的课程</span>
                <!-- <span class="search">
                    <el-input v-model="searchContent" placeholder="请输入内容" size="small"></el-input>
                    <el-button type="primary" size="small"><i class="el-icon-search"/></el-button>
                </span> -->
            </div>
            <div class="imgList">
                <el-row>
                    <el-col :span="6" v-for="(item,index) in endList" :key="index">
                        <el-card style="margin: 5px">
                            <div @click="getCourseExperiment(item.courseId)">
                                <img class="image" v-if="item.courseCover!=''" :src="item.courseCover">
                                <img class="image" v-else src="@/assets/image/logo/logo250.png"> 
                                <div>
                                    <p>{{item.courseName}}</p>
                                    <p>
                                        <img class="userImage" v-if="item.headUrl!=null" :src="item.headUrl">
                                        <img class="userImage" v-else src="@/assets/image/user/user30.png"> 
                                        {{item.teacherNickname}}
                                    </p>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
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
            searchContent:"",
            normalList: [],
            endList: [],
            // selectAdd: 'false'
            // paginations: {
            //     page_current: 1,  // 当前位于哪页
            //     page_size: 20,   // 1页显示多少条
            //     total: 0,        // 总数
            // }
        };
    },
    computed: {

    },
    created() {
        this.handleCurrentChange()
    },
    mounted() {

    },
    watch: {

    },
    methods: {
        addCourse(){
            this.$router.push('/admin/courseAdd')
        },
        importCourse(){
            this.$router.push('/admin/importCourse')
        },
        handleCurrentChange() {
            this.$http.get(`/teaching/teacher/course/list?keyword=${this.searchContent}`
            // ,{params:{
            //     "offset":this.paginations.page_current-1,
            //     "limit":this.paginations.page_size
            // }}
            ).then((res) => { 
                if(res.data.code == "0"){
                    this.normalList = res.data.data.normal
                    this.endList = res.data.data.end
                // }else if (res.data.code == "1") {
                    //  this.$router.push('/login'); 
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
        getCourseExperiment(id){
            this.$router.push('/admin/courseList/experiment/'+ id)
        }
    },
    components: {

    },
};
</script>
<style scoped lang="scss">
  .page {
    // background-color:#F4F4F4;
    // height: calc(100vh - 60px);
    .addCourse{
        width: 60%;
        margin:30px auto 8px;
        // position: relative;
        // i{
        //     font-size: 2em;
        //     color: #409EFF;
        // }
        // ul{
        //     position: absolute;
        //     left: 3em;
        //     top: -0.5em;
        //     li{
        //         color: #6D7278;
        //         font-size: 14px;
        //         line-height: 1.7em;
        //         cursor: pointer;
        //         &:hover{
        //             color: #409EFF;
        //         }
        //     }
        // }
        .el-button{
            // font-size: 12px;
        }
    }
    .content{
        width: 60%;
        margin:0 auto;
        margin-bottom: 20px;
        .listTitle{
            // padding: 10px 0;
            padding: 1em 0 8px 0;
            border-bottom: 1px solid #D8D8D8;
            margin-bottom: 10px;
            .title{
                float:left;
                line-height: 2em;  
            }
            .search{
                float:right;
                display: inline-block;
                margin-right:50px;
                position: relative;
                button{
                    position: absolute;
                    right: -50px;
                }
            }
            &::after {
                display: block;
                content: "";
                clear: both;
            }
        }
        .imgList{
            p{
                margin-bottom: 0em;
                text-align: left;
                line-height: 2em;
                .userImage{
                    vertical-align:middle;
                    height: 30px;
                    width: 30px;
                    border-radius: 50%;
                }
            }
            .image {
                width: 100%;
                display: block;
                height: 120px;
                margin-bottom: 0.5em;
            }

            .clearfix:before,
            .clearfix:after {
                display: table;
                content: "";
            }
            
            .clearfix:after {
                clear: both
            }
        }
    }
  }
  

</style>
