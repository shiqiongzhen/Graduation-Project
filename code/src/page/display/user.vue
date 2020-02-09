<template>
    <div class="page">
        <div class="divideLine"></div>
        <div class="containner">
            <div class="leftMenu">
                <div class="userInfo">
                    <img  :src="headUrl" alt="" class="headPic">
                    <div class="describe">
                        <h3>{{userInfo.nickname}}</h3>
                        <p>{{userInfo.userIdent}}</p>
                        <p>学号：{{userInfo.userNumber}}</p>
                    </div>
                </div>
                <ul class="menu">
                    <li @click="navToPersonalMsg()"><span>个人信息</span><i class="el-icon-arrow-right"></i></li>
                    <li @click="navToIdentify()"><span>身份认证</span><i class="el-icon-arrow-right"></i></li>
                </ul>
            </div>
            <div class="rightContainner" v-if="containner=='personalMsg'">
                <div class="title">
                    个人信息
                </div>
                <div class="content">
                    <div class="headInfo">
                        <img :src="headUrl" alt="">
                        <div>{{userInfo.nickname}}</div>
                    </div>
                    <div class="title">
                        基本信息
                    </div>
                    <div class="userInfo">
                        <div><span class="label">姓名</span><span>{{userInfo.nickname}}</span></div>
                        <div><span class="label">身份</span><span>{{userInfo.userIdent}}</span></div>
                        <div><span class="label">学号/工号</span><span>{{userInfo.userNumber}}</span></div>
                        <div><span class="label">所在院</span><span>{{userInfo.college}}</span></div>
                        <div><span class="label">所在系</span><span>{{userInfo.series}}</span></div>
                        <div><span class="label">所在专业</span><span>{{userInfo.major}}</span></div>
                        <div><span class="label">班级</span><span>{{userInfo.className}}</span></div>
                        <div><span class="label">手机号码</span><span>{{userInfo.phone}}</span></div>
                        <div><span class="label">邮箱</span><span>{{userInfo.mail}}</span></div>
                    </div>
                </div>
            </div>
            <div class="rightContainner" v-if="containner=='identify'">
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
            containner: 'personalMsg',
            headUrl: localStorage.getItem('headUrl')||"",
            userInfo: {
                userId: '',
                nickname: "",
                userNumber: "",
                headUrl: "",
                userIdent: "",
                mail: "",
                phone: "",
                college: "",
                series: "",
                major: "",
                className: ""
            }
        };
    },
    computed: {

    },
    created() {
        this.$http.get(`/teaching/user/info/${localStorage.getItem('userId')}`
        ).then((res) => { 
            if(res.data.code == "0"){
                this.userInfo = res.data.data
            }else if (res.data.code == "1") {
                this.$router.push('/login'); 
            }else{
                this.userInfo=res.data.data
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
        navToPersonalMsg(){
            this.containner='personalMsg'
            this.$router.push('/user'); 
        },
        navToIdentify(){
            this.containner='identify'
            this.$router.push('/identify'); 
        }
    },
    components: {

    },
};
</script>

<style scoped lang="scss">
@import '@/assets/style/common/mixin.scss';
.page{
    .divideLine{
        background: #F4F4F4;
        height: 3px;
    }
    .containner{
        width: 60%;
        margin:0 auto;
        .leftMenu{
            margin-top: 20px;
            background: #F8FAFC;
            height: 350px;
            float: left;
            width: 25%;
            text-align: center;
            box-sizing: border-box;
            .headPic{
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background:#D8D8D8; 
                margin-top: 20px;
            }
            .describe{
                padding:10px;
            }
            .menu{
                margin-top: 10px;
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
            background: #FFFFFF;
            height: 100%;
            float: right;
            width: 73%;
            .title{
                padding:10px;
                position: relative;
                border-bottom: 1px solid #E9E9E9;
                font-weight: bold;
            }
            .content{
                padding:10px;
                .headInfo{
                    text-align: center;
                    img{
                        width: 80px;
                        height: 80px;
                        border-radius: 50%;
                        background:#D8D8D8; 
                    }
                }
                .title{
                    font-size: 0.5em;
                }
                .userInfo{
                    line-height: 2.5em;
                    padding:1em;
                    .label{
                        width: 100px;
                        display: inline-block;
                    }
                }
            }
        }
    }
    @include clearfix;
}
</style>
