<template>
    <div class="page">
        <div class="head">
            <breadCrumb :data="navData"></breadCrumb>
            <h4>查看信息</h4>
        </div>
        <div class="container">
            <div class="filteBar">
                <div>
                    <el-button type="primary" size="small" @click="batchStop()">
                        批量停用
                    </el-button> 
                    <el-button type="primary" size="small" @click="batchRecover()">
                        批量恢复
                    </el-button> 
                    <el-button size="small" type="danger" plain @click="batchDel()">
                        批量删除
                    </el-button> 
                </div>
                <div>
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
                <el-table
                    :data="tableData"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    width="55"
                    v-if="isSelection">
                    </el-table-column>
                    <el-table-column
                    fixed
                    prop="userNumber"
                    label="教师工号">
                    </el-table-column>
                    <el-table-column
                    prop="nickname"
                    label="教师姓名">
                    </el-table-column>
                    <el-table-column
                    prop="userStatus"
                    label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.userStatus==0">
                                <span class="ball blueBall"></span><span style="vertical-align: middle;">运行中</span>
                            </span>
                            <span v-if="scope.row.userStatus==1">
                                 <span class="ball redBall"></span><span style="vertical-align: middle;">已停用</span>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    label="操作"
                    width="250">
                    <template slot-scope="scope">
                        <span class="operation">
                            <!-- <span v-if="isStop[scope.$index]==false"> -->
                            <span v-if="scope.row.userStatus==0">
                                <el-button  class="colorText" @click="stop(scope.row,scope.$index)" type="text" size="small">停用</el-button>
                            </span>
                            <span v-else>
                                <el-button class="recover" @click="recover(scope.row,scope.$index)" type="text" size="small">恢复</el-button>
                                <i class="el-icon-arrow-down" style="color:#409EFF;cursor: pointer;" @click="showDel(scope.$index)"></i>
                                <el-button class="del" v-if="isShowDel[scope.$index]==true" @click="del(scope.row)" type="text" size="small">删除</el-button>
                            </span>
                            <span>
                                <el-button @click="routeToDetail(scope.row)" type="text" size="small">查看</el-button>
                            </span>
                            <span>
                                <el-button @click="resetPass(scope.row)" type="text" size="small">重置密码</el-button>
                            </span>
                        </span>
                    </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                layout="prev, pager, next, jumper"
                :total="paginations.total"
                :page-size="paginations.page_size"
                :current-page.sync="paginations.page_current"
                @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="修改密码" :visible.sync="isPass" width="30%">
            <el-form :model="form" :rules="rules" ref="form">
                <el-form-item prop="newPass">
                    <el-input v-model="form.newPass" type="password" autocomplete="off" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item prop="checkNewPass">
                    <el-input v-model="form.checkNewPass" type="password" autocomplete="off" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item>
                     <!-- <div slot="footer" class="dialog-footer"> -->
                        <el-button @click="isPass = false">取 消</el-button>
                        <el-button type="primary" @click="updatePass('form')">确 定</el-button>
                    <!-- </div> -->
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import breadCrumb from '@/components/breadCrumb'
export default {
    props: {

    },
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.form.checkNewPass !== '') {
                    this.$refs.form.validateField('checkNewPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.newPass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            navData:[
                {
                    name: "教师管理",
                    path: ""
                },{
                    name: "查看信息",
                    path: ""
                }
            ],
            searchContent:"",
            tableData:[],
            paginations: {
                page_current: 1,  // 当前位于哪页
                page_size: 5,   // 1页显示多少条
                total:0
            },
            isStop:[],
            isShowDel:[],
            batchSelection:[],
            isSelection: false,
            isPass: false,
            dialogId:"",
            form: {},
            rules: {
                newPass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkNewPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
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
    methods: {
        resetPass(row){
            this.dialogId = row.userId
            this.isPass = true
        },
        updatePass(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http.post(`/teaching/user/resetPassword`,this.Qs.stringify({
                        "userId": this.dialogId,
                        "password": this.form.newPass
                    })).then((res) => {    
                        if(res.data.code == "0"){
                            this.$message({
                                message: '修改成功！',
                                type: 'success'
                            });
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
                    this.isPass = false 
                } else {
                    return false;
                }
            });
        },
        initIsStopAndIsShowDel(list){
            list.forEach(item => {
                if(item.userStatus=='0'){
                    this.isStop.push(false)
                }else{
                    this.isStop.push(true)
                }
                this.isShowDel.push(false)
            });
        },
        handleSelectionChange(val) {
            const arr=[]
            val.forEach((item)=>{
                arr.push(item.userId)
            })
            this.batchSelection = arr;
            // console.log(arr)
        },
        showDel(index){
            this.isShowDel[index]=!this.isShowDel[index]
            this.$set(this.isShowDel,index,this.isShowDel[index])
        },
        stop(row,index){
            const arr = []
            arr.push(row.userId)
            this.$http.post(`/teaching/user/banUsers`,arr
            ).then((res) => { 
                if(res.data.code == "0"){
                    // this.isStop[index]=true
                    // this.$set(this.isStop,index,this.isStop[index])
                    this.handleCurrentChange()
                    this.$message({
                        message: "状态已停用",
                        type: 'success'
                    });
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
        recover(row,index){
            const arr = []
            arr.push(row.userId)
            this.$http.post(`/teaching/user/recoverUsers`,arr
            ).then((res) => { 
                if(res.data.code == "0"){
                    // this.isStop[index]=false
                    // this.$set(this.isStop,index,this.isStop[index])
                    this.handleCurrentChange()
                    this.$message({
                        message: "状态已恢复",
                        type: 'success'
                    });
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
        del(row){
            this.$confirm('此操作将永久删除该成员, 是否继续?', '删除成员', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const arr = []
                arr.push(row.userId)
                this.$http.post(`/teaching/user/invalidUser`,arr
                ).then((res) => { 
                    if(res.data.code == "0"){
                        this.handleCurrentChange()
                        this.$message({
                            message: "已删除",
                            type: 'success'
                        });
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
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        batchStop(){
            if(this.isSelection==false){
                this.isSelection=true
                this.$message("请选择需要操作的记录!");
            }else{
                const arr = this.batchSelection
                this.$http.post(`/teaching/user/banUsers`,arr
                ).then((res) => { 
                    if(res.data.code == "0"){
                        this.handleCurrentChange()
                        this.$message({
                            message: "状态已批量停用",
                            type: 'success'
                        });
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
            }
        },
        batchRecover(){
            if(this.isSelection==false){
                this.isSelection=true
                this.$message("请选择需要操作的记录!");
            }else{
                const arr = this.batchSelection
                this.$http.post(`/teaching/user/recoverUsers`,arr
                ).then((res) => { 
                    if(res.data.code == "0"){
                        this.handleCurrentChange()
                        this.$message({
                            message: "状态已批量恢复",
                            type: 'success'
                        });
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
            }
        },
        batchDel(){
            this.$confirm('此操作将永久删除该成员, 是否继续?', '删除成员', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(this.isSelection==false){
                    this.isSelection=true
                    this.$message("请选择需要操作的记录!");
                }else{
                    const arr = this.batchSelection
                    this.$http.post(`/teaching/user/invalidUser`,arr
                    ).then((res) => { 
                        if(res.data.code == "0"){
                            this.handleCurrentChange()
                            this.$message({
                                message: "已批量删除",
                                type: 'success'
                            });
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
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        routeToDetail(row){
            // console.log("asd",row)
            this.$router.push(`/super/${row.userId}`)
        },
         handleCurrentChange(page) {
            this.$http.get(`/teaching/admin/teacher/teacherList?page=${this.paginations.page_current}&size=${this.paginations.page_size}&keyword=${this.searchContent}`
            ).then((res) => { 
                if(res.data.code == "0"){
                    this.tableData = res.data.data.list
                    this.initData()
                    this.initIsStopAndIsShowDel(this.tableData)
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
        initData(){
            this.isSelection=false
            this.isStop=[]
            this.isShowDel=[]
            this.batchSelection=[]
            this.searchContent=""
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
        h4{
            padding: 1em 0;
        }
    }
    .container{
        padding: 2em;
        margin:2em;
        background: #FFFFFF;
        .filteBar{
            display: flex;
            justify-content: space-between;
            .el-input{
                width: 200px;
            }
        }
        .content{
            padding: 1em 0; 
            .el-table{
                .operation{
                    span{
                        width: 3.5em;
                        padding: 0 10px;
                        display: inline-block;
                    } 
                    span:nth-child(3){
                        margin-left: -1em;
                    } 
                }
            }
            .colorText{
                color:#F75C39;
            }
            .recover{
                position: relative;
            }
            .del{
                position: absolute;
                top: 2.8em;
                left: 1.8em;
            }
            .ball{
                width: 6px;
                height: 6px;
                border-radius: 50%;
                display: inline-block;
                vertical-align: middle;
                margin-right: 6px;
            }
            .blueBall{
                background: #1890FF;
            }
            .redBall{
                background: #F75C39;
            }
            .el-pagination {
                text-align: right;
                margin-top: 3em;
            }
        }
    }
}
</style>
