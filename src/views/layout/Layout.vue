<template>
    <el-container>
        <el-header>
            <h3>异常监测后台管理系统</h3>
        </el-header>
        <el-container>
            <el-aside width="200px"><VerticalMenu></VerticalMenu></el-aside>
            <el-main><router-view></router-view></el-main>
        </el-container>
    </el-container>
</template>

<script>
    import VerticalMenu from "@/components/Menu/VerticalMenu.vue"

    export default {
        components: {
            VerticalMenu
        }
    }
</script>

<style>
</style>