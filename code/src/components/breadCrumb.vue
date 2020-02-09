<template>
    <div class="bread-page">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item v-for="(item,index) in data" :key="index" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    props: ['data'],
    data() {
        return {
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
.bread-page{
    padding: 10px 0;
    border-bottom: 1px solid #E9E9E9;
}
</style>
