<template>
    <div class="page">
        <div class="head">
            <breadCrumb :data="navData"></breadCrumb>
            <div class="item">
                <div class="user">
                    <span><img :src="user.headUrl" alt="">姓名: {{user.nickname}}</span>
                    <!-- <span v-else><img src="@/assets/image/user/user30.png" alt="">姓名: {{user.nickname}}</span> -->
                    <el-button type="primary" size="small">主操作</el-button>
                </div>
                <p><span class="label">教师工号：</span>{{user.userNumber}}</p>
                <!-- <p><span class="label">表头标签：</span>{{user.userNumber}}</p> -->
            </div>
        </div>
        <div class="container">
            <div class="filteBar">
                <span class="leftTitle">课程列表</span>
                <div>
                    <el-button-group>
                        <el-button :class="status=='全部'?'statusBlue':''" size="small" @click="statusAll()">全部</el-button> 
                        <el-button :class="status=='0'?'statusBlue':''" size="small" @click="statusDoing()">进行中</el-button> 
                        <el-button :class="status=='3'?'statusBlue':''" size="small" @click="statusOver()">已结束</el-button> 
                    </el-button-group>
                    <el-input
                        size="small"
                        placeholder="根据姓名搜索"
                        suffix-icon="el-icon-search"
                        v-model="searchContent"
                        @change="handleCurrentChange">
                    </el-input>
                </div>
            </div>
            <div class="content">
                <div v-for="(item,index) in list" :key="index">
                    <a class="item" href="">
                        <span class="intro">
                            <img v-if="item.courseCover!=''" :src="item.courseCover" alt="">
                            <img v-else src="@/assets/image/logo/logo80.png" alt="">
                            <span class="description">
                                <p>{{item.courseName}}</p>
                                <p>{{item.courseIntroduction}}</p>
                            </span>
                        </span>
                        <span class="time">
                            <p>开始时间</p>
                            <p>{{item.createTime}}</p>
                        </span>
                        <span class="link">
                            编辑
                        </span>
                    </a>
                </div>
                <el-pagination
                layout="prev, pager, next, jumper"
                :total="paginations.total"
                :page-size="paginations.page_size"
                :current-page.sync="paginations.page_current"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange">
                </el-pagination>
            </div>
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
                    name: "教师管理",
                    path: ""
                },
                {
                    name: "查看信息",
                    path: "/super"
                },{
                    name: "查看详情页",
                    path: ""
                }
            ],
            user:{},
            list:[],
            searchContent:"",
            status:"全部",
            paginations: {
                page_current: 1,  // 当前位于哪页
                page_size: 5,   // 1页显示多少条
                total:0
            }
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
        statusAll(){
            this.status='全部'
            this.handleCurrentChange()
        },
        statusDoing(){
            this.status=0
            this.handleCurrentChange()
        },
        statusOver(){
            this.status=3
            this.handleCurrentChange()
        },
         handleCurrentChange(page) {
             let url=''
             if(this.status=='全部'){
                 url=`/teaching/admin/teacher/teacherInfo?page=${this.paginations.page_current}&size=${this.paginations.page_size}&teacherId=${this.$route.params.teacherId}&keyword=${this.searchContent}`
             }else{
                 url=`/teaching/admin/teacher/teacherInfo?page=${this.paginations.page_current}&size=${this.paginations.page_size}&teacherId=${this.$route.params.teacherId}&keyword=${this.searchContent}&status=${this.status}`
             }
            this.$http.get(url).then((res) => { 
                if(res.data.code == "0"){
                    this.user = res.data.data.user
                    this.list = res.data.data.list
                    this.paginations.total = res.data.data.total
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
         handleSizeChange(){

         }
    },
    components: {
        breadCrumb
    },
};
</script>

<style scoped lang="scss">
.page{
    padding:0.5em;
    .head{
        padding:0 1em;
        background: #FFFFFF;
        .item{
            padding:1em;
            .user{
                display: flex;
                justify-content: space-between;
                span{
                    color:#615151;
                    font-weight: bold;
                    img{
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        vertical-align: middle;
                        margin-right: 1em;
                    }
                }
            }
            p{
                margin-left: calc(1em + 30px);
                color:#676767;
                line-height: 1.5em;
                .label{
                    color: #333333;
                }
            }
        }
        
    }
    .container{
        padding: 2em;
        margin:2em;
        background: #FFFFFF;
        .filteBar{
            display: flex;
            justify-content: space-between;
            .statusBlue{
                color: #fff;
                background-color: #409eff;
            }
            .leftTitle{
                color:#4E4E4E;
            }
            .el-input{
                width: 200px;
            }
        }
        .content{
            padding: 1em 0; 
            .item{
                border-bottom: 1px solid #E9E9E9;
                padding:1em;
                display: flex;
                flex-direction: row;
                .intro{
                    display: flex;
                    flex:3;
                    img{
                        width: 50px;
                        height: 50px;
                    }
                    .description{
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        margin-left: 1em;
                        p{
                            color:#7F7E7E;
                            font-size: 14px;
                        }
                    }
                }
                .time{
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                    justify-content: space-between;
                    p{
                        color:#7F7E7E;
                        font-size: 14px;
                    }
                }
                .link{
                    display: inline-block;
                    text-align: right;
                    color:#7ABBFF;
                }
            }
            .el-pagination {
                text-align: right;
                margin-top: 3em;
            }
        }
    }
}
</style>
