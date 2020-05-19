<template>
    <div class="page" v-html="experimentText">
    </div>
</template>

<script>
import spin from '@/components/spin.vue'
export default {
    props: {

    },
    data() {
        return {
            experimentText:""
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
		$route() {
            this.init(); //路由变化时就重新执行这个方法 更新传来的参数
		}
	},
    methods: {
        init(){
            this.$http.get(`/teaching/student/experiment/info/${this.$route.params.experimentId}`
            ).then((res) => {   
                if(res.data.code == "0"){
                    if(res.data.data.experiment){
                        this.experimentText = res.data.data.experiment.experimentText
                    }
                // }else if (res.data.code == "1") {
                    //  this.$router.push('/login'); 
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
.page{
    // .header{
    //     img{
    //         vertical-align: middle;
    //     }
    // }
    .content{
        div{
            margin-bottom: 0.5em;
            .el-tag{
                border-radius: 40%;
            }
        }
    }
}
</style>
