<template>
    <div class="page">
        <div class="head">
            <breadCrumb :data="navData"></breadCrumb>
            <h4>添加班级</h4>
        </div>
        <div class="container">
            <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
                <el-menu-item index="1">信息填写</el-menu-item>
                <!-- <el-menu-item index="2" :route="{path:'/super/addTeacher/file'}">文件导入</el-menu-item> -->
            </el-menu>
                <!-- <transition name="fade">
                    <router-view></router-view>
                </transition> -->
            <div class="contain">
                <el-form :model="form" :rules="rules" ref="form" label-width="80px">
                    <el-form-item label="班级名称" prop="className">
                        <el-input v-model="form.className"></el-input>
                    </el-form-item>
                    <el-form-item label="所在专业" prop="major">
                        <el-input v-model="form.major"></el-input>
                    </el-form-item>
                    <el-form-item label="所在系" prop="series">
                        <el-input v-model="form.series"></el-input>
                    </el-form-item>
                    <el-form-item label="所在院" prop="college">
                        <el-input v-model="form.college"></el-input>
                    </el-form-item>
                    <el-form-item label="学生信息" prop="student">
                    </el-form-item>
                </el-form>
                <div class="filteBar">
                    <div>
                        <el-button type="primary" size="small" @click="add()">
                            <i class="el-icon-plus"></i> 新增
                        </el-button> 
                        <!-- <el-button size="small" class="file-upload">
                            批量导入
                            <input class="file-upload-input" 
                            id="upfile" type="file" @change="uploadFile">
                        </el-button> -->
                        <el-upload style="display:inline-block;"
                            action="/teaching/common/file/readFile" 
                            :show-file-list="false"
                            :on-success="readFile">
                            <el-button size="small">批量导入</el-button>
                        </el-upload>
                    </div>
                    <!-- <el-button type="primary" size="small" @click="submit()">
                        确认添加
                    </el-button>  -->
                </div>
                <div class="content">
                    <el-alert
                        type="info"
                        show-icon>
                         <template slot='title'>
                            <div>注：上传符合规格的execl文件即可完成信息批量导入，点击文件即可下载导入模板：<a href="/teaching/common/file/getExcelTemple" class="colorText">添加学生模板.xls</a></div>
                        </template>
                    </el-alert>
                    <div class="list">
                        <ul>
                            <li style="background:#F4F4F5;color:#909399;">
                                <span class="liContent">
                                    <span>学号/工号</span>
                                    <span>学生姓名</span>
                                    <span>初始密码</span>
                                    <span>操作</span>
                                </span>
                            </li>
                            <li v-for="(item,index) in list" :key="index">
                                <span class="liContent confirm" v-if="isConfirm[index]=='true'">
                                    <span>{{item.userNumber}}</span>
                                    <span>{{item.nickname}}</span>
                                    <span>{{item.password}}</span>
                                    <span>
                                        <el-button @click="edit(index)" type="text" size="small">编辑</el-button>
                                        <el-button type="text" size="small">删除</el-button>
                                    </span>
                                </span>
                                <span v-else class="liContent edit">
                                    <span><el-input size="small" v-model="item.userNumber"></el-input></span>
                                    <span><el-input size="small" v-model="item.nickname"></el-input></span>
                                    <span><el-input size="small" v-model="item.password" placeholder="默认为工号"></el-input></span>
                                    <span style="padding-left: calc(1em + 15px);">
                                        <el-button @click="confirm(index)" class="colorText1" type="text" size="small">确认</el-button>
                                        <el-button type="text" size="small">删除</el-button>
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div class="footer">
                        <el-button type="primary" size="small" @click="submit()">
                            确认添加
                        </el-button> 
                    </div>
                </div>
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
                    name: "班级管理",
                    path: ""
                },{
                    name: "添加班级",
                    path: ""
                }
            ],
            list:[],
            isConfirm: [],
            form:[],
            rules: {
                className: [
                    { required: true, message: '不能为空', trigger: 'blur'  }
                ],
                college: [
                    { required: true, message: '不能为空', trigger: 'blur'  }
                ],
                series: [
                    { required: true, message: '不能为空', trigger: 'blur'  }
                ],
                major: [
                    { required: true, message: '不能为空', trigger: 'blur'  }
                ],
                student: [
                    { required: true, message: '不能为空', trigger: 'blur'  }
                ],
            }
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {
        add(){
            this.list.push({
                userNumber: "",
                nickname: "",
                password: ""
            })
            const len = this.list.length
            this.isConfirm[len-1]='false'
            this.$set(this.isConfirm,len-1,this.isConfirm[len-1])
        },
        edit(index){
            this.isConfirm[index]='false'
            this.$set(this.isConfirm,index,this.isConfirm[index])
        },
        confirm(index){
            this.isConfirm[index]='true'
            this.$set(this.isConfirm,index,this.isConfirm[index])
        },
        initIsConfirm(list){
            list.forEach(()=>{
                this.isConfirm.push("true")
            })
        },
        readFile(response){
            if(response.code == "0"){
                this.$message({
                    message: "导入成功，请核对数据",
                    type: 'success'
                });
                response.data.forEach((item)=>{
                    this.list.push(item)
                })
                this.initIsConfirm(this.list)
            }else if (response.code == "1") {
                this.$router.push('/login'); 
            }else{
                this.$message({
                    message: response.msg,
                    type: 'error'
                });
            }
        },
        submit(){
            // console.log("isConfirm",this.isConfirm,this.isConfirm.indexOf('false')==-1)
            if(this.isConfirm.indexOf('false')==-1){
                this.$http.post(`/teaching/admin/class/addStudentByBatch`,{
                    className: this.form.className,
                    college: this.form.college,
                    series: this.form.series,
                    major: this.form.major,
                    userList: this.list
                }).then((res) => { 
                    if(res.data.code == "0"){
                        this.$message({
                            message: "新增成功！",
                            type: 'success'
                        });
                        this.list=[]
                        this.form={}
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
            }else{
                this.$message({
                    message: "请先确认信息！",
                    type: 'error'
                });
            }
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
        margin:2em;
        background: #FFFFFF;
        .el-menu-item, .el-submenu__title {
            height: 40px;
            line-height: 40px;
        }
        .contain{
            padding: 2em;
            .el-form{
                .el-input{
                    width: 300px;
                }
            }
            .filteBar{
                display: flex;
                justify-content: space-between;
                .el-input{
                    width: 200px;
                }
            }
            .content{
                padding: 1em 0; 
                .colorText{
                    color: #FA6400;
                }
                .list{
                    padding: 1em 0;
                    .colorText1{
                        color:#F76A4A;
                    }
                    ul{
                        color:#606266;
                        li{
                            .liContent{
                                display: flex;
                                flex-direction: row;
                                justify-content: space-between;
                                // display: flex;
                                text-align: left;
                                span{
                                    padding-left: calc(1em + 14px);
                                    line-height: 48px;
                                    font-size: 14px;
                                    border: 1px solid #F4F4F5;
                                    width: 100%;
                                }
                            }
                            .edit{
                                span{
                                    .el-input{
                                        margin-left: calc(-1em - 14px);
                                        font-size: 14px;
                                        padding: 0 1em;
                                        box-sizing: border-box;
                                         /deep/ .el-input__inner{
                                            width: calc(100% + 15px + 1em);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                .footer{
                    margin-top: 24px;
                }
            }
        }
    }
}

//  .file-upload {
//     position: relative;
//     overflow: hidden;
//     .file-upload-input {
//         background-color: transparent;
//         position: absolute;
//         width: 999px;
//         height: 999px;
//         top: -10px;
//         right: -10px;
//         cursor: pointer;
//     }
// }
</style>
