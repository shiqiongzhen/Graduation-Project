<template>
    <div class="page">
        <div class="containner">
            <breadCrumb :data="navData"></breadCrumb>
            <div class="contain">
                <div class="headInfo">
                    <h4>{{experimentName}}</h4>
                    <p>{{commitNum}}人已经提交   |   {{time}}</p>
                </div>
                <div class="title"><h5>选择学生</h5></div>
                <div class="chooseBox">
                    <span>学生分类：</span>
                    <span>
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox :label="item.classId" v-for="(item,index) in classList" :key="index">{{item.className}}</el-checkbox>
                        </el-checkbox-group>
                    </span>
                    <div class="table"  
                        v-for="(item,index) in tableDatas" :key="index">
                        <div v-if="checkList.indexOf(item.classId)!=-1">
                            <div class="title">{{item.className}}</div>
                            <el-table
                                :data="item.userList" border
                                @selection-change="handleSelectionChange">
                                <el-table-column
                                type="selection"
                                width="55">
                                </el-table-column>
                                <el-table-column
                                prop="nickName"
                                label="学生名称">
                                </el-table-column>
                                <el-table-column
                                prop="userNumber"
                                label="学号">
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
                            </el-table>
                        </div>
                    </div>
                </div>
                <el-form ref="form" :rules="rules" :model="form" label-width="90px">
                    <div class="title"><h5>评分信息</h5></div>
                    <el-form-item label="是否通过"  prop="status">
                        <el-radio-group v-model="form.status">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="最终分数" v-if="form.status==1"  prop="experimentAchievement">
                        <el-input v-model="form.experimentAchievement"></el-input>
                    </el-form-item>
                    <el-form-item label="老师评语" prop="teacherComment">
                        <el-input
                        type="textarea"
                        :rows="6"
                        placeholder="请输入内容"
                        v-model="form.teacherComment">
                        </el-input>
                        <span class="randomComment" @click="getComment()">
                            点击随机生成 <i class="el-icon-edit"></i>
                        </span>
                        <div class="attachTxt">
                            最多200字
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('form')">确定</el-button>
                        <el-button @click="cancle()">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import TinymceEditor from '@/components/tinymce-editor'
import breadCrumb from '@/components/breadCrumb'
export default {
    props: {

    },
    data() {
        return {
            // editorHeight: "70vh", :height="editorHeight"
            navData:[
                {
                    name: "实验打分",
                    path: `/admin/courseList/score/${this.$route.params.courseId}`
                },{
                    name: "学生打分界面",
                    path: ""
                }
            ],
            form: {
                status: '0',
                experimentAchievement: 0,
                teacherComment: ""
            },
            experimentName:"",
            commitNum:"",
            time:"",
            tableDatas: [],  // 所有表格的数据
            classList:[],  // 班级选项
            checkList:[],  // 选中的班级
            selectStu:[],  // 选中的学生
            rules: {
                status: [
                    { required: true, message: '不能为空', trigger: 'blur'  }
                ],
                teacherComment: [
                    { required: true, message: '不能为空', trigger: 'blur'  }
                ],
                experimentAchievement: [
                    { required: true, pattern: /^([1-9]?\d|0|100)$/, message: '不能为空或数值应在0~100之间的整数', trigger: 'blur'  }
                ]
            },
        };
    },
    computed: {

    },
    created() {
            this.$http.get(`/teaching/teacher/achievement/judge/batch/${this.$route.params.experimentId}`
            ).then((res) => { 
                if(res.data.code == "0"){
                    this.experimentName= res.data.data.experimentName
                    this.commitNum=res.data.data.commitNum
                    this.time=res.data.data.time
                    this.tableDatas=res.data.data.tableDatas

                    this.classList=res.data.data.classList
                    this.checkList.push(this.classList[0].classId)
                // }else if (res.data.code == "1") {
                    //  this.$router.push('/login'); 
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
    },
    mounted() {

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
    watch: {

    },
    methods: {
       getComment(){
            this.$http.get(`/teaching/teacher/achievement/judge/getOneComment?score=${this.form.experimentAchievement}`)
            .then((res) => { 
                if(res.data.code == "0"){
                    this.form.teacherComment = res.data.data
                // }else if (res.data.code == "1") {
                //     this.$router.push('/login'); 
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
      cancle(){
        this.$router.push(`/admin/courseList/score/${this.$route.params.courseId}`)
      },
      handleSelectionChange(val) {
        val.length>0 && (this.selectStu[val[0].classId]=val)
      },
      transformSelectStu(stu){
          var result= new Set()
          stu.forEach(item => {
            for(let i=0;i<item.length;i++){
                result.add(item[i].userExperimentId)
            }
          });
        //   console.log("res",Array.from(result))
          return Array.from(result)
      },
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$http.post(`/teaching/teacher/achievement/judge/batch/save`,{
                    "userExperimentIdList": this.transformSelectStu(this.selectStu),
                    "teacherComment": this.form.teacherComment,
                    "status": this.form.status,
                    "experimentAchievement": this.form.experimentAchievement
                }
                ).then((res) => { 
                    if(res.data.code == "0"){
                        this.$message({
                            message: "打分成功！",
                            type: 'success'
                        });
                        this.$router.push(`/admin/courseList/score/${this.$route.params.courseId}`); 
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
             }
        })
      },
    },
    components: {
        breadCrumb,
        TinymceEditor
    },
};
</script>

<style scoped lang="scss">
.page{
    background: #F4F4F4;
    .containner{
        width: 60%;
        margin:0 auto;
        padding-top: 20px;
        .contain{
            background: white;
            padding: 2em;
            min-height: 80vh;
            .randomComment{
                color: #979797;
                position: absolute;
                bottom: 35px;
                right: 15px;
                cursor: pointer;
            }
            .headInfo{
                line-height: 1.9em;
                p{
                    color:#7F7E7E;
                    font-size: 14px;
                }
            }
            .title{
                background: #F4F4F5;
                padding:0.5em;
                margin: 1em 0;
            }
            .chooseBox{
                span{
                    padding: 0.5em;
                    display: inline-block;
                }
                .table{
                    padding: 0.5em;
                    .title{
                        background: #F4F4F5;
                        margin: 0;
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
                    }
                    .statusZero{
                        background-color:#ffcc66;
                    }
                    .statusOne{
                        background-color:#67C23A;
                    }
                    .statusTwo{
                        background-color:red;
                    }
                    .statusThree{
                        background-color:#909399;
                    }
                }
            }
        }
    }
}
</style>
