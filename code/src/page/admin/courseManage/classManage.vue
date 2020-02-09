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
        <div class="container">
            <tree-transfer 
            :title="title" 
            height="400px"
            :from_data='fromData' 
            :to_data='toData' 
            :defaultProps="{label:'label'}" 
            @addBtn='add' 
            @removeBtn='remove' 
            :mode='mode'
            filter openAll>
            </tree-transfer>
            <div class="btnGroup">
                <el-button type="primary" @click="onSubmit">确定</el-button>
                <el-button @click="cancle">取消</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import breadCrumb from '@/components/breadCrumb'
import treeTransfer from 'el-tree-transfer'
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
                    name: "班级管理",
                    path: ""
                }
            ],
            mode: "transfer", // transfer addressList
            title:["未加入课程学生", "已加入课程学生"],
            fromData:[],      
            toData:[],
            addStudentIdList:new Set(),
            deleteStudentIdList:new Set()
        };
    },
    computed: {

    },
    created() {
        this.init()
    },
    mounted() {

    },
    watch: {

    },
    methods: {
      cancle(){
          this.init()
      },
      init(){
          this.$http.get(`/teaching/teacher/course/manage/${this.$route.params.courseId}`
            ).then((res) => { 
                if(res.data.code == "0"){
                    this.fromData = res.data.data.studentForSelect
                    this.toData =  res.data.data.studentHadSelect
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
      onSubmit() {
        this.$http.post(`/teaching/teacher/course/updateNumber`,{
            courseId: this.$route.params.courseId,
            addStudentIdList: this.delIntersection(Array.from(this.addStudentIdList),Array.from(this.deleteStudentIdList)),
            deleteStudentIdList: this.delIntersection(Array.from(this.deleteStudentIdList),Array.from(this.addStudentIdList))
        }).then((res) => { 
            if(res.data.code == "0"){
                this.$message({
                    message: "成功新增课程！",
                    type: 'success'
                });
                this.$router.push(`/admin/courseList/experiment/${this.$route.params.courseId}`); 
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
      // 监听穿梭框组件添加
      add(fromData,toData,obj){
        obj.keys = obj.keys.filter((item)=>{
            return item.includes('-')
        })
        for(let i = 0; i < obj.keys.length; i++) {
			this.addStudentIdList.add(obj.keys[i]);
        }
      },
      // 监听穿梭框组件移除
      remove(fromData,toData,obj){
        obj.keys = obj.keys.filter((item)=>{
            return item.includes('-')
        })
        for(let i = 0; i < obj.keys.length; i++) {
			this.deleteStudentIdList.add(obj.keys[i]);
        }
      },
      delIntersection(a, b){
        const result  = a.filter(v => !a.includes(b))
        return result
      }
    },
    components: {
        breadCrumb,
        treeTransfer 
    },
};
</script>

<style scoped lang="scss">
.page{
    padding:0 20px;
    .container{
        padding:32px 20px;
        .btnGroup{
            text-align: center;
            margin: 48px;
            .el-button{
                width: 180px;
            }
        }
    }
}
</style>
