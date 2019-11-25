<template>
    <div class="page">
        <div class="title">
            身份认证
        </div>
        <ul class="content">
            <li>
                <div>
                    <span><img src="@/assets/icon/lock.png" alt=""></span>
                    <span><div>密码</div><div class="description">用于保护账号信息和登录安全</div></span>
                </div>
                <div><el-button size="medium" @click="updatePass = true">修改密码</el-button></div>
            </li>
            <li>
                <div>
                    <span><img src="@/assets/icon/lock.png" alt=""></span>
                    <span><div>密码</div><div class="description">用于保护账号信息和登录安全</div></span>
                </div>
                <div><el-button size="medium" @click="bindPhone = true">立即绑定</el-button></div>
            </li>
        </ul>
        <el-dialog title="修改密码" :visible.sync="updatePass" width="30%">
            <el-form :model="form">
                <el-form-item>
                    <el-input v-model="form.name" autocomplete="off" placeholder="请输入原密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.name" autocomplete="off" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="form.name" autocomplete="off" placeholder="请输入新密码"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updatePass = false">取 消</el-button>
                <el-button type="primary" @click="updatePass = false">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="绑定手机号码" :visible.sync="bindPhone" width="30%">
            <el-form :model="form">
                <el-form-item label="手机号码" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off" placeholder="请输入你的手机号码"></el-input>
                </el-form-item>
                <el-form-item label="短信验证码" label-width="120px">
                    <el-input v-model="form.name" autocomplete="off" placeholder="请输入新密码"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="bindPhone = false">取 消</el-button>
                <el-button type="primary" @click="bindPhone = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            updatePass: false,
            bindPhone: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },

        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    methods: {

    },
    components: {

    },
};
</script>

<style scoped lang="scss">
.page{
    .title{
        padding:10px;
        position: relative;
        border-bottom: 1px solid #E9E9E9;
        font-weight: bold;
    }
    .content{
        li{
            border-bottom: 1px solid #E9E9E9;
            padding:1em 2em;
            display: flex;
            justify-content: space-between;
            span{
                display: inline-block;
                margin-left: 1em;
                .description{
                    color: #747474;
                }
            }
        }
    }
}
</style>
