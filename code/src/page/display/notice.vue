<template>
    <div class="page">
        <div class="divideLine"></div>
        <div class="containner">
            <div class="leftMenu">
                <div class="title">
                    <img src="@/assets/icon/noticeGray.png" alt=""><span>消息中心</span>
                </div>
                <ul class="menu">
                    <li @click="navToSystemNotice()"><span>系统通知</span><i class="el-icon-arrow-right"></i></li>
                    <li @click="navToMyNotice()"><span>我的通知</span><i class="el-icon-arrow-right"></i></li>
                </ul>
            </div>
            <div class="rightContainner" v-if="containner=='systemNotice'">
                <div class="contentTitle">
                    系统通知
                </div>
                <div class="content">
                    <div class="readTitle"><span @click="allRead()">全部标记已读</span></div>
                    <ul>
                        <li  v-for="(item,index) in noticeList" :key="index">
                            <div class="title">{{item.tittle||"无"}}</div>
                            <div class="time">{{item.time||0}}</div>
                            <div class="message">{{item.msg}} <router-link  :to = "item.routerUrl">>>点击查看>></router-link></div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="rightContainner" v-if="containner=='myNotice'">
                <router-view></router-view>
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
        navToSystemNotice(){
            this.containner='systemNotice'
            this.$router.push('/notice'); 
        },
        navToMyNotice(){
            this.containner='myNotice'
            this.$router.push('/myNotice'); 
        },
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
            height: 100%;
            float: right;
            width: 78%;
            .contentTitle{
                background: #FFFFFF;
                height: 40px;
                line-height: 40px;
                padding-left: 1em;
                color: #787878;
                font-weight: 600;
                margin-bottom: 21px;
            }
            .content{
                padding:0 27px;
                background: #FFFFFF;
                .readTitle{
                    border-bottom: 1px solid #E1E1E1;
                    span{
                        color: #7D7D7D;
                        line-height: 50px;
                        height: 50px;
                        float: right;
                        cursor: pointer;
                    }
                    @include clearfix;
                }
                ul{
                    li{
                        padding: 24px 0;
                        border-bottom: 1px solid #E1E1E1;
                        .title{
                            font-size: 16px;
                            color: #787878;
                            line-height: 22px;
                            font-weight: 600;
                            font-family: PingFangSC, PingFangSC-Semibold;
                        }
                        .time{
                            font-size: 12px;
                            color: #B3B3B3;
                            line-height: 17px;
                            margin-bottom: 10px;
                            font-weight: 400;
                            font-family: PingFangSC, PingFangSC-Regular;
                        }
                        .message{
                            font-size: 14px;
                            color: #7D7D7D;
                            line-height: 20px;
                            font-weight: 500;
                            font-family: PingFangSC, PingFangSC-Medium;
                        }
                    }
                }
            }
        }
    }
}
</style>
