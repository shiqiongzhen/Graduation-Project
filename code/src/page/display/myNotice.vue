<template>
    <div class="page">
        <div class="title">
            我的通知
        </div>
        <div class="content">
            <!-- <el-input v-model="mess" style="width: 30%;"></el-input>
            <el-button @click="websocketsend()">发消息</el-button> -->
            <div class="leftList">
                <div class="leftTitle">近期消息</div>
                <ul>
                    <li v-for="(item,index) in noticeList" :key="index" @click="routeToChat(item.conversationID)">
                        <img v-if="item.targetHeadUrl" :src="item.targetHeadUrl" alt="">
                        <img v-else src="@/assets/image/user/user80.png" alt="">
                        <span class="description">
                            <p>{{item.targetName}}</p>
                            <p>{{item.content}}</p>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="rightChat">
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
            websock: null,
            noticeList: [],
            mess: ""
        };
    },
    computed: {

    },
    created() {
        this.$http.get(`/teaching/message/conversationList`
        ).then((res) => { 
            if(res.data.code == "0"){
                this.noticeList = res.data.data.conversations
                Array.isArray(this.noticeList) && (this.noticeList.length > 0) && this.$router.push({ path: `/myNotice/${this.noticeList[0].conversationID}`, query: { targetName: this.noticeList[0].targetName } })
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
        this.initWebSocket();
    },
    mounted() {

    },
    watch: {

    },
    methods: {
        routeToChat(id){
            this.$router.push(`/myNotice/${id}`)
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">
@import '@/assets/style/common/mixin.scss';
.page{
    .title{
        background: #FFFFFF;
        height: 40px;
        line-height: 40px;
        padding-left: 1em;
        color: #787878;
        font-weight: 600;
        margin-bottom: 21px;
    }
    .content{
        // padding:27px;
        background: #FFFFFF;
        .leftList{
            vertical-align: top;
            display: inline-block;
            float: left;
            width: 19%;
            .leftTitle{
                font-size: 12px;
                font-weight: 400;
                color: #666666;
                padding: 10px 24px;
                border-bottom: 1px solid #E9E9E9;
            }
            ul{
                li{
                    border-bottom: 1px solid #E9E9E9;
                    padding: 24px;
                    cursor: pointer;
                    &:hover{
                        background: #eee;
                    }
                    img{
                        width: 45px;
                        height: 45px;
                        border-radius: 50%;
                        vertical-align: middle;
                    }
                    .description{
                        vertical-align: middle;
                        display: inline-block;
                        margin-left: 1em;
                        p{
                            font-weight: 400;
                        }
                        p:nth-child(1){
                            font-size: 14px;
                            color: #373737;
                            line-height: 20px;
                        }
                        p:nth-child(2){
                            font-size: 12px;
                            color: #555555;
                            line-height: 17px;
                        }
                    }
                }
            }
        }
        .rightChat{
            display: inline-block;
            width: 80%;
            float: right;
            background: #FAFAFA;
            border: 1px solid #e9eaec;
            min-height: 70vh;
        }
        @include clearfix;
    }
}
</style>
