<template>
    <div class="page">
        <div class="containner">
            <breadCrumb :data="navData"></breadCrumb>
            <div class="contain">
                <el-form ref="form" :model="form"  :rules="rules" label-width="120px">
                    <el-form-item label="选择已有课程" prop="courseValue">
                        <el-select v-model="form.courseValue" filterable placeholder="请选择">
                            <el-option
                            v-for="item in courseOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-alert
                            title="提示：选择已有课程，即可选择导入已创建课程的相关信息与实验信息"
                            type="info" show-icon style="line-height: 1em;margin-top:1em;">
                        </el-alert>
                    </el-form-item>
                    <el-form-item label="课程名称" prop="courseName">
                        <el-input v-model="form.courseName"></el-input>
                    </el-form-item>
                    <el-form-item label="班级"  :rules="{ required: true }">
                        <tree-transfer 
                        :title="title" 
                        height="300px"
                        :from_data='form.fromData' 
                        :to_data='form.toData' 
                        :defaultProps="{label:'label'}" 
                        @addBtn='add' 
                        @removeBtn='remove' 
                        :mode='mode'
                        filter openAll>
                        </tree-transfer>
                    </el-form-item>
                    <el-form-item label="课程代码" prop="courseCode">
                        <el-input v-model="form.courseCode"></el-input>
                    </el-form-item>
                    <el-form-item label="课程学分" prop="courseCredit">
                        <el-input v-model="form.courseCredit"></el-input>
                    </el-form-item>
                    <el-form-item label="课程介绍">
                        <el-input
                        type="textarea"
                        :rows="6"
                        placeholder="请输入内容"
                        v-model="form.courseIntroduction">
                        </el-input>
                        <div class="attachTxt">
                            最多200字
                        </div>
                    </el-form-item>
                    <el-form-item label="设置课程封面">
                        <el-upload
                        class="avatar-uploader"
                        action=""
                        :show-file-list="false"
                        :before-upload="beforeAvatarUpload">
                        <div class="uploadBox">
                            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item class="footer">
                        <el-button type="primary" @click="onSubmit('form')">确定</el-button>
                        <el-button @click="cancle">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import TinymceEditor from '@/components/tinymce-editor'
import breadCrumb from '@/components/breadCrumb'
import treeTransfer from 'el-tree-transfer'
export default {
    props: {

    },
    data() {
        return {
            // editorHeight: "70vh", :height="editorHeight"
            navData:[
                {
                    name: "首页",
                    path: "/admin"
                },{
                    name: "导入已有课程",
                    path: ""
                }
            ],
            form: {
                courseValue: "",
                courseCode: "",
                courseName: "",
                teacherId: "",
                courseCredit: "",
                courseIntroduction: "",
                fromData:[],
                toData:[],
                imageUrl: ''
            },
            mode: "transfer", // transfer addressList
            title:["未加入课程学生", "已加入课程学生"],
            courseOptions: [],
            rules: {
                courseValue: [
                    { required: true, message: '不能为空', trigger: 'blur'  }
                ],
                courseName: [
                    { required: true, message: '不能为空', trigger: 'blur'  }
                ],
                courseCode: [
                    { required: true, message: '不能为空', trigger: 'blur'  }
                ],
                courseCredit: [
                    { required: true, message: '不能为空', trigger: 'blur'  }
                ]
            },
        };
    },
    computed: {

    },
    created() {
        this.$http.get(`/teaching/teacher/course/courseImport`
        ).then((res) => { 
            if(res.data.code == "0"){
                this.courseOptions =  res.data.data.options
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
        this.$http.get(`/teaching/teacher/course/classSelectList`
        ).then((res) => { 
            if(res.data.code == "0"){
                this.form.fromData =  res.data.data
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
    mounted() {

    },
    watch: {

    },
    methods: {
      onSubmit(formName){
        this.$refs[formName].validate((valid) => {
            if(this.form.toData.length == 0){
                this.$message({
                    message: "班级学生不能为空",
                    type: 'error'
                });
                return
            }
            if (valid) {
                this.$http.post(`/teaching/teacher/course/import`,{
                    courseId: this.form.courseValue,
                    courseCode: this.form.courseCode,
                    courseName: this.form.courseName,
                    teacherId: localStorage.getItem('userId'),
                    courseCredit: this.form.courseCredit,
                    courseIntroduction: this.form.courseIntroduction,
                    addStudentIdList: this.transToData(this.form.toData),
                    courseCover: this.form.imageUrl
                }).then((res) => { 
                    if(res.data.code == "0"){
                        this.$message({
                            message: "成功导入课程！",
                            type: 'success'
                        });
                        this.$router.push('/admin'); 
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
            })
      },
      cancle(){
        this.$router.push('/admin'); 
      },
    //   handleAvatarSuccess(res, file) {
    //     this.form.imageUrl = res.data.url;
    //   },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        if(isJPG && isLt2M){
            var formData = new FormData();
            formData.append('file', file);
            this.$http.post(`/teaching/common/file/uploadPic`,formData).then(res=>{
                this.form.imageUrl = res.data.data.url
            }).catch(error=>{
                this.$message({
                    message: `上传失败！${error}`,
                    type: 'error'
                });
            })
            return false // 返回false不会自动上传
        }else{
            return false
        }
      },
      // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
      changeMode() {
        if (this.mode == "transfer") {
          this.mode = "addressList";
        } else {
          this.mode = "transfer";
        }
      },
      transToData(data){
          var result = []
          for(let i=0;i<data.length;i++){
              if(data[i].children){
                  for(let j=0;j<data[i].children.length;j++){
                      result.push(data[i].children[j].id)
                  }
              }
          }
          return result
      },
      // 监听穿梭框组件添加
      add(fromData,toData,obj){
        // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
        // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
        this.form.toData=toData
      },
      // 监听穿梭框组件移除
      remove(fromData,toData,obj){
        // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
        // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
        this.form.toData=toData
      }
    },
    components: {
        breadCrumb,
        TinymceEditor,
        treeTransfer 
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
            padding: 2em 5em 2em 2em;
            .attachTxt{
                color:#777; 
            }
            .uploadBox{
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                &:hover{
                    border-color: #409EFF;
                }
                .avatar-uploader-icon{
                    font-size: 28px;
                    color: #8c939d;
                    width: 178px;
                    height: 178px;
                    line-height: 178px;
                    text-align: center;
                }
                .avatar {
                    width: 178px;
                    height: 178px;
                    display: block;
                }
            }
            .footer{
                text-align: center;
                .el-button:nth-child(1){
                    margin-right: 12px;
                }
                .el-button:nth-child(2){
                    margin-left: 12px;
                }
            }
        }
    }
}
</style>
