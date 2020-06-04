<template>
    <div class="page">
        <div class="title">
            我的通知
        </div>
        <div class="content">
            <div class="empty" v-if="!loading && (noticeList.length==0)">
                <img src="@/assets/image/empty/noMessage.png" alt="">
                <p>暂无通知~</p>
            </div>
            <spin :loading="loading"/>
            <!-- <el-input v-model="mess" style="width: 30%;"></el-input>
            <el-button @click="websocketsend()">发消息</el-button> -->
            <div class="leftList" v-if="noticeList.length!=0">
                <div class="leftTitle">近期消息</div>
                <ul>
                    <li v-for="(item,index) in noticeList" :key="index" @click="routeToChat(item.conversationID, item.targetName, item.targetId, this.noticeList[0].unreadIdList)">
                        <el-badge :value="item.unreadCount" style="width: 100%;" :hidden = "item.unreadCount == 0">
                            <img v-if="item.targetHeadUrl" :src="item.targetHeadUrl" alt="">
                            <img v-else src="@/assets/image/user/user80.png" alt="">
                            <span class="description">
                                <p>{{item.targetName}}</p>
                                <p>{{item.content}}</p>
                            </span>
                        </el-badge>
                    </li>
                </ul>
            </div>
            <div class="rightChat" v-if="noticeList.length!=0">
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
            websock: null,
            noticeList: [],
            mess: "",
            // readCount: 0
        };
    },
    computed: {

    },
    watch: {
		$route(to, from , next) {
            console.log("route1，周期created")
		}
    },
    created() {
        this.$http.get(`/teaching/message/conversationList`
        ).then((res) => { 
            if(res.data.code == "0"){
                this.noticeList = res.data.data.conversations
                // this.noticeList = this.noticeList.reverse()
                if(this.noticeList[0].unreadIdList){
                    Array.isArray(this.noticeList) && (this.noticeList.length > 0) && this.routeToChat(this.noticeList[0].conversationID, this.noticeList[0].targetName, this.noticeList[0].targetId, this.noticeList[0].unreadIdList )
                }else{
                    Array.isArray(this.noticeList) && (this.noticeList.length > 0) && this.routeToChat(this.noticeList[0].conversationID, this.noticeList[0].targetName, this.noticeList[0].targetId, [] )
                }
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
        // this.initWebSocket();
    },
    mounted() {

    },
    watch: {

    },
    methods: {
        routeToChat(id, targetName, targetId, unreadIdList){
            this.$router.push({ path:`/myNotice/${id}`, query: { 'targetName': targetName, 'targetId': targetId,  'unreadIdList': unreadIdList } })
        },
    },
    components: {
        spin
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
        min-height: 70%;
        .empty{
            color:#7F7F7F;
            text-align: center;
            margin-top: 15vh;
            p{
                margin-top:5px;
                font-weight: bold;
            }
        }
        .leftList{
            vertical-align: top;
            display: inline-block;
            float: left;
            width: 29%;
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
                        .description{
                            p:nth-child(2){
                                color: #555555;
                            }
                        }
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
                        margin-left: 0.5em;
                        width: calc(100% - 60px);
                        p{
                            font-weight: 400;
                            white-space: nowrap;  
                            text-overflow:ellipsis; 
                            overflow:hidden;
                        }
                        p:nth-child(1){
                            font-size: 14px;
                            color: #373737;
                            line-height: 2em;
                        }
                        p:nth-child(2){
                            font-size: 12px;
                            color: #999999;
                            line-height: 1.5em;
                        }
                    }
                }
            }
        }
        .rightChat{
            display: inline-block;
            width: 70%;
            float: right;
            background: #FAFAFA;
            border: 1px solid #e9eaec;
            min-height: 70vh;
        }
        @include clearfix;
    }
}
</style>
