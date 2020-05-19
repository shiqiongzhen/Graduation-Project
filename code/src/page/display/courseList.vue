<template>
    <div class="page">
        <div class="banner"></div>
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
                                    <p v-if="item.headUrl!=null"><img :src="item.headUrl">  {{item.teacherNickname}}</p>
                                    <p v-else><img src="@/assets/image/user/user30.png">  {{item.teacherNickname}}</p>
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
                                    <p v-if="item.headUrl!=null"><img :src="item.headUrl">  {{item.teacherNickname}}</p>
                                    <p v-else><img src="@/assets/image/user/user30.png">  {{item.teacherNickname}}</p>
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
            endList: []
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
        handleCurrentChange() {
            this.$http.get(`/teaching/student/course/listForNoPage?keyword=${this.searchContent}`
            // ,{params:{
            //     "offset":this.paginations.page_current-1,
            //     "limit":this.paginations.page_size
            // }}
            ).then((res) => { 
                if(res.data.code == "0"){
                    this.normalList = res.data.data.normal
                    this.endList = res.data.data.end
                    // console.log(this.normalList)
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
            this.$router.push('/courseList/experiment/'+ id)
        }
    },
    components: {

    },
};
</script>
<style scoped lang="scss">
  .page {
    .banner{
        background: url('~@/assets/image/oldBanner.png') no-repeat;
        background-size:contain;;
        height: 120px;
    }
    // @media screen and (-webkit-min-device-pixel-ratio: 2),screen and (min--moz-device-pixel-ratio: 2) {
    //     .banner{
    //         background-image: url('~@/assets/image/banner/banner@2x.png');
    //     }
    // }
    // /* 如果设备像素大于等于3，则用3倍图 */
    // @media screen and (-webkit-min-device-pixel-ratio: 3),screen and (min--moz-device-pixel-ratio: 3) {
    //     .banner{
    //         background-image: url('~@/assets/image/banner/banner@3x.png');
    //     }
    // }
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
                img{
                    vertical-align:middle;
                    width: 30px;
                    height: 30px;
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
