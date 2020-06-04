<template>
    <div class="page" v-if="containner=='systemNotice'">
        <div class="contentTitle">
            系统通知
        </div>
        <div class="content">
            <div class="readTitle"><span @click="allRead()">全部标记已读</span></div>
            <div class="empty" v-if="!loading&&(noticeList.length==0)">
                <img src="@/assets/image/empty/noMessage.png" alt="">
                <p>暂无通知~</p>
            </div>
            <spin :loading="loading"/>
            <ul>
                <li  v-for="(item,index) in noticeList" :key="index">
                    <div class="title">{{item.tittle||"无"}}</div>
                    <div class="time">{{item.time||0}}</div>
                    <div class="message">{{item.msg}} <router-link  :to = "item.routerUrl">>>点击查看>></router-link></div>
                </li>
            </ul>
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
        spin
    },
};
</script>

<style scoped lang="scss">
@import '@/assets/style/common/mixin.scss';
.page{
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
        min-height: 70%;
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
        .empty{
            color:#7F7F7F;
            text-align: center;
            margin-top: 15vh;
            p{
                margin-top:5px;
                font-weight: bold;
            }
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
</style>
