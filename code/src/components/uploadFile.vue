<template>
    <div class="page">
        <el-upload
        ref="uploadFile"
        class="uploadFile"
        action="/teaching/common/file/upload"
        :file-list="some"
        :on-change="handleFileSuccess"
        :on-remove="handleFileRemove">
            <el-button size="small" type="primary">点击选择附件</el-button>
            <span slot="tip" class="el-upload__tip">可上传最多30个资源附件，单个附件不可超过300MB</span>
        </el-upload>
        <div class="btnGroup">
            <el-button size="small" type="primary" plain @click="update">确认上传</el-button>
            <el-button v-if="isClose" size="small" type="info" @click="close">取消</el-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        allFile:{
            type: Array,
        },
        someFile:{
            type: Array,
        },
        isClose: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            all: this.allFile,
            some: this.someFile
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {
         allFile:function(newVal,oldVal){
            this.all = newVal;
         },
         someFile:function(newVal,oldVal){
            this.some = newVal;
         }
    },
    methods: {
        update(){
            this.$emit('updateFile', this.filterFiles(this.all,this.some))
                this.$message({
                    message: "更新成功",
                    type: 'success'
                });
        },
        close(){
            this.$emit('closeFile', '')
        },
        handleFileSuccess(file, fileList) {
            if(file.response){
                this.all.push(file.response.data);
            }
            this.some = fileList
            // console.log("su",this.all)
        },
        handleFileRemove(file, fileList){
            this.$refs.uploadFile.clearFiles()
            this.some = fileList
            // console.log("mv", this.some)
        },
        filterFiles(allFiles, files){
            var result = []
            for(let i=0;i<files.length;i++){
                for(let j=0;j<allFiles.length;j++){
                    if(files[i].name==allFiles[j].fileName){
                        result.push(allFiles[j])
                        break;
                    }
                }
            }
            // console.log("filterFiles-result,allFiles, files",result,allFiles, files)
            return result
        },
    },
    components: {

    },
};
</script>

<style scoped lang="scss">
.page{
    background: white;
    .uploadFile{
        padding: 0.5em;
        background: #F4F4F5;
        span{
            color: #6D6D6D;
            margin-left: 1em;
        }
    }
    .btnGroup{
        margin: 1em 0;
    }
}
</style>
