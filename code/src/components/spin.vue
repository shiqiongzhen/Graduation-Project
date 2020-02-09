<template>
    <div class="spin"
        v-if="loading" 
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading">
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {

        };
    },
    props:['loading'],
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
    .spin{
        top: 150px;
    }
</style>
