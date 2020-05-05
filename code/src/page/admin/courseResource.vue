<template>
    <div class="page">
        <div class="title">
            全部
        </div>
        <div class="filteBar">
            <el-input
                size="small"
                placeholder="请输入内容"
                suffix-icon="el-icon-search"
                v-model="searchContent"
                @change="init()">
            </el-input>
            <div>
                <el-button type="primary"  size="small" @click="dialogFormVisible = true">添加资源<i class="el-icon-plus el-icon--right"></i></el-button>
                <!-- <el-select v-model="value1" size="small" placeholder="时间排序">
                    <el-option label="区域一"  value="1">降序</el-option>
                    <el-option label="区域一"  value="2">升序</el-option>
                </el-select> -->
                <el-select v-model="timeOrder" size="small" @change="changeTimeOrder()">
                    <el-option label="时间正序"  value="1"></el-option>
                    <el-option label="时间倒序"  value="2"></el-option>
                </el-select>
            </div>
        </div>
        <el-dialog title="添加资源" :visible.sync="dialogFormVisible">
            <uploadFile
            :allFile= "allFile"
            :someFile= "someFile"
            v-on:updateFile= "updateDetailFile"
            :isClose= "false"
            ></uploadFile>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancleResourceFile">取 消</el-button>
                <el-button type="primary" @click="submitResourceFile">确 定</el-button>
            </div>
        </el-dialog>
        <div class="title">
            已有资源
        </div>
        <div class="empty" v-if="!loading&&(!experimentList||experimentList.length==0)">
            <img src="@/assets/image/empty/noResource.png" alt="">
            <p>你还没有上传资源哦 请点击右上角相应图标，上传资源吧~</p>
        </div>
        <spin :loading="loading"/>
        <div v-for="(item,index) in experimentList" :key="index">
            <a class="item" :href="item.filePath">
                <img src="@/assets/image/file/doc.png" alt="" v-if="item.fileType=='doc'">
                <img src="@/assets/image/file/ppt.png" alt="" v-if="item.fileType=='ppt'">
                <img src="@/assets/image/file/pdf.png" alt="" v-if="item.fileType=='pdf'">
                <img src="@/assets/image/file/excel.png" alt="" v-if="item.fileType=='excel'">
                <img src="@/assets/image/file/txt.png" alt="" v-if="item.fileType=='txt'">
                <img src="@/assets/image/file/default.png" alt="" v-if="['doc','ppt','pdf','excel','txt'].indexOf(item.fileType)==-1">
                <span class="description">
                    <h4>{{item.fileName||"无"}}</h4>
                    <div>{{item.fileSize||0}}</div>
                    <div>{{item.createTime}}</div>
                </span>
            </a>
        </div>
    </div>
</template>

<script>
import spin from '@/components/spin.vue'
import uploadFile from '@/components/uploadFile'
export default {
    props: {

    },
    data() {
        return {
             experimentList: [],
             loading: true,
             searchContent:"",
             timeOrder:"不限时间",
             allFile:[],
             someFile:[],
             dialogFormVisible:false
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
      changeTimeOrder(){
          var list=this.experimentList.sort(function(a,b) {
            return Date.parse(b.createTime.replace(/-/g,"/"))-Date.parse(a.createTime.replace(/-/g,"/"));
          });
          if(this.timeOrder=="1"){
              this.experimentList=list.reverse();
          }
          if(this.timeOrder=="2"){
              this.experimentList=list
          }
      },
      updateDetailFile(data){
          this.allFile=data
          this.$message({
            message: "已确认！",
            type: 'success'
          });
      },
      cancleResourceFile(){
        this.dialogFormVisible = false
        this.clearFile()
      },
      submitResourceFile(){
        this.$http.post(`/teaching/teacher/course/addCourseFile`,{
            courseId:this.$route.params.courseId,
            courseFile: this.allFile,
        }).then((res) => { 
            if(res.data.code == "0"){
                this.dialogFormVisible = false
                this.init()
                this.clearFile()
                this.$message({
                    message: "成功新增资源！",
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
      },
      clearFile(){
          this.allFile=[]
          this.someFile=[]
      },
      init(){
          this.$http.get(`/teaching/teacher/course/resource/${this.$route.params.courseId}?keyword=${this.searchContent}`
            ).then((res) => { 
                if(res.data.code == "0"){
                    // this.courseName = res.data.data.courseName || ""
                    this.experimentList = res.data.data
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
    },
    components: {
        spin,uploadFile
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
    .empty{
        color:#7F7F7F;
        text-align: center;
        margin-top: 15vh;
        p{
            margin-top:5px;
            font-weight: bold;
        }
    }
    .filteBar{
        padding:1em 0;
        display: flex;
        justify-content: space-between;
        .el-input{
            width: 200px;
        }
        .el-select{
            width: 120px;
        }
    }
    .item{
        display: block;
        border-bottom: 1px solid #E9E9E9;
        padding:1em;
        display: flex;
        img{
            border-radius: 4px;
        }
        .description{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 12px;
            width: 75%;
            h4{
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
            }
            div{
                color:#7F7E7E;
                font-size: 14px;
            }
        }
    }
}
</style>
