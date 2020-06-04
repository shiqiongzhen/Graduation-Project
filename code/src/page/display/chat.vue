<template>
    <div class="page">
        <div class="title">{{targetName}}</div>
        <ul class="chat">
            <li v-for="(item,index) in noticeList.message" :key="index">
                <div class="left" v-if="item.fromMe == false">
                    <img v-if="noticeList.targetHeadUrl" :src="noticeList.targetHeadUrl" alt="">
                    <img v-else src="@/assets/image/user/user80.png" alt="">
                    <span class="description">
                        <p>{{item.time}}</p>
                        <p>{{item.content}}</p>
                    </span>
                </div>
                <div class="right" v-else>
                    <span class="description">
                        <p>{{item.time}}</p>
                        <p>{{item.content}}</p>
                    </span>
                    <img v-if="myHeadUrl" :src="myHeadUrl" alt="">
                    <img v-else src="@/assets/image/user/user80.png" alt="">
                </div>
            </li>
        </ul>
        <div class="footer">
            <el-input
                placeholder="回复一下吧"
                v-model="content"
                maxlength="500"
                show-word-limit
                :autosize="{ minRows: 4, maxRows: 4}"
            >
                <template slot="append">
                    <el-button @click="websocketsend()" >发送</el-button>
                </template>
            </el-input>
            <!-- <el-button class="submit">发送</el-button> -->
        </div>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        const { targetName, targetId, unreadIdList } = this.$route.query
        return {
            myHeadUrl: localStorage.getItem('headUrl')||"", 
            websock: null,
            noticeList: [], // 会话列表
            targetName, // 对话窗口的对方名
            targetId, // 对话窗口的对方id
            unreadIdList,
            content: "" // 发送的内容
        };
    },
    computed: {

    },
    created() {
        this.initChat()
        this.initWebSocket();
    },
    destroyed() {
      this.websock.close() //离开路由之后断开websocket连接
    },
    mounted() {

    },
    watch: {
		$route(to, from , next) {
            console.log("route1", this.$route.params.chatId, this.$route.query.targetName)
            this.initData()
            this.initChat();
            this.initWebSocket();
		}
    },
    // beforeRouteEnter(){
    //     console.log("beforeRouteEnter", to, from , next)
    // },
    // beforeRouteLeave (to, from , next) {
    //     console.log("beforeRouteLeave", to, from , next)
    //   this.websock.close() //离开路由之后断开websocket连接
    //   next()
    // },
    methods: {
      read(){
        console.log("read", this.unreadIdList)
        if(Array.isArray(this.unreadIdList) && this.unreadIdList.length != 0){
            const content = JSON.stringify({
                "fromId": localStorage.getItem('userId')||"", 
                "toId": this.targetId, 
                "type": 1,
                "content": this.unreadIdList,
                "timestamp": new Date().getTime(), 
                "Describe": "" 
            })
            this.websock.send(content);
            // this.$router.go(0)
        }
      },
      initData(){
        const { targetName, targetId } = this.$route.query
        this.websock = null
        this.noticeList = [] // 会话列表
        this.targetName = targetName // 对话窗口的对方名
        this.targetId = targetId // 对话窗口的对方id
        this.content = "" // 发送的内容
        console.log("initData",this.noticeList)
      },
      initChat(){
          this.$http.get(`/teaching/message/conversation?page=1&size=10&conversationId=${this.$route.params.chatId}`
            ).then((res) => { 
                if(res.data.code == "0"){
                    this.noticeList = res.data.data
                    console.log("initChat",this.noticeList)
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
      initWebSocket(){ //初始化weosocket
        console.log("initWebSocket")
        // const wsuri = `/teaching/imserver/${localStorage.getItem('userId')||""}`;
        const wsuri = `ws://120.77.242.172:8080/teaching/imserver/${localStorage.getItem('userId')||""}`;
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
      },
      websocketonopen(e){ //连接建立之后执行send方法发送数据
         console.log("socket连接成功", e)
         this.read()
      },
      websocketonerror(e){//连接建立失败重连,且需要限制次数
        console.log("连接错误", e)
        this.initWebSocket();
      },
      websocketonmessage(e){ //数据接收
        console.log("数据接收", e.data)
        const res = JSON.parse(e.data);
        if(res && res.type == 0){ // 发送成功
            this.content = ""
            this.initChat()
        }else if(res && res.type == 2){ // 接收即使消息成功
            this.content = ""
            this.initChat()
            // this.$router.go(0)
        }else{
            this.$message({
                message: "发送失败，请重试！",
                type: 'error'
            });
        }
      },
      websocketsend(){//数据发送
        console.log("数据发送", this.content)
        const content = JSON.stringify({
            "fromId": localStorage.getItem('userId')||"", 
            "toId": this.targetId, 
            "type": 0,
            "content": this.content,
            "timestamp": new Date().getTime(), 
            "Describe": "" 
        })
        this.websock.send(content);
      },
      websocketclose(e){  //关闭
        console.log('断开连接',e);
      },
    },
    components: {

    },
};
</script>

<style scoped lang="scss">
@import '@/assets/style/common/mixin.scss';
.page{
    position: relative;
    min-height: 70vh;
    .title{
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        background: #FFFFFF;
        color: #000000;
        padding: 10px 24px;
        border-bottom: 1px solid #E9E9E9;
    }
    .chat{
        position: absolute;
        bottom: 40px;
        width: 100%;
        height: calc(100% - 80px);
        overflow: scroll;
        padding: 0 1em;
        box-sizing: border-box;
        li{
            margin: 10px 0;
            img{
                width: 45px;
                height: 45px;
                border-radius: 50%;
                vertical-align: middle;
            }
            .description{
                vertical-align: middle;
                display: inline-block;
                // margin-left: 1em;
                background: #FFFFFF;
                color: #333333;
                padding: 7px 16px;
                box-shadow: 0pt 2pt 4pt 0pt rgba(0,0,0,0.1);
                p{
                    font-weight: 400;
                }
                p:nth-child(1){
                    font-size: 12px;
                    color: #555555;
                    line-height: 17px;
                }
                p:nth-child(2){
                    font-size: 14px;
                    color: #373737;
                    line-height: 20px;
                }
            }
            .left{
                float: left;
                .description{
                    border-radius: 0pt 16pt 16pt 16pt;
                }
            }
            .right{
                float: right;
                text-align: right;
                .description{
                    border-radius: 16pt 0px 16pt 16pt;
                }
            }
            @include clearfix;
        }
    }
    .footer{
        position: absolute;
        bottom: 0;
        width: 100%;
        .submit{
            position: absolute;
            bottom: 10px;
            right: 10px;
        }
    }
}
</style>
