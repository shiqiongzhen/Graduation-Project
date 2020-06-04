<template>
    <div class="page">
        <div class="divideLine"></div>
        <div class="containner">
            <div class="leftMenu">
                <div class="title">
                    <img src="@/assets/icon/noticeGray.png" alt=""><span>消息中心</span>
                </div>
                <ul class="menu">
                    <li><router-link to="/admin/systemNotice"><span>系统通知</span><i class="el-icon-arrow-right"></i></router-link></li>
                    <li><router-link to="/admin/myNotice"><span>我的通知</span><i class="el-icon-arrow-right"></i></router-link></li>
                </ul>
            </div>
            <div class="rightContainner">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import spin from '@/components/spin.vue'
export default {
    props: {

    },
    data() {
        return {
            loading: true,
            containner: 'systemNotice',
            editMessage: false,
            noticeList: [],
            messageIdList: []
        };
    },
    computed: {

    },
    created() {
        this.$http.get(`/teaching/message/systemMessage`
        ).then((res) => { 
            if(res.data.code == "0"){
                this.noticeList = res.data.data
                this.messageIdList = this.noticeList.map(item => item.messageId)
            // }else if (res.data.code == "1") {
            //     this.$router.push('/login'); 
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
    watch: {

    },
    methods: {
        // navToSystemNotice(){
        //     this.containner='systemNotice'
        //     this.$router.push('/notice'); 
        // },
        // navToMyNotice(){
        //     this.containner='myNotice'
        //     this.$router.push('/myNotice'); 
        // },
        closeInfo(){
            this.editMessage=false
        },
        updateInfo(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http.post(``,{ // /teaching/teacher/course/updateCourseInfo
                            "userId": localStorage.getItem('userId'), 
                            "phone": this.userInfo.phone,
                            "mail": this.userInfo.mail
                        }
                    ).then((res) => {
                        if(res.data.code == "0"){
                            this.editMessage = false
                            this.$message({
                                message: "更新成功！",
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
            })
        },
        allRead(){
            this.$http.post(`/teaching/message/messageRead`, {
                messageIdList: this.messageIdList
            }
            ).then((res) => { 
                if(res.data.code == "0"){
                    this.$message({
                        message: "更新成功！",
                        type: 'success'
                    });
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
        }
    },
    components: {
        spin
    },
};
</script>

<style scoped lang="scss">
@import '@/assets/style/common/mixin.scss';
.page{
    background: #F4F4F4;
    height: calc(100vh - 60px);
    .divideLine{
        background: #F4F4F4;
        height: 3px;
    }
    .containner{
        width: 60%;
        margin:0 auto;
        .leftMenu{
            margin-top: 20px;
            background: #FFFFFF;
            height: 350px;
            float: left;
            width: 20%;
            text-align: center;
            box-sizing: border-box;
            .title{
                padding: 30px;
                img{
                    color: #6D7278;
                    vertical-align: middle;
                    margin-right: 4px;
                }
            }
            .menu{
                li{
                    padding: 0.8em;
                    &:hover{
                        background: #5CB3FF;
                        color: white;
                    }
                    span{
                        position: relative;
                        right: 10%;
                    }
                    i{
                        position: relative;
                        left: 20%;
                    }
                }
            }
        }
        .rightContainner{
            margin-top: 20px;
            // height: 100%;
            height: calc(100vh - 60px);
            float: right;
            width: 78%;
        }
    }
}
</style>
