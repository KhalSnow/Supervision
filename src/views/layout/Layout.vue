<template>
    <el-container>
        <el-header>
            <h3>异常监测后台管理系统</h3>
        </el-header>
        <el-container>
            <el-aside width="200px" class="menu"><VerticalMenu></VerticalMenu></el-aside>
            <el-main class="main"><router-view></router-view></el-main>
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
    .el-header {
        background-color:#E0E0E0;
        padding:2px
    }
    .menu {
        background-color: #E8E8E8;
        text-align: center;
    }
    .main {
        background-color: #F0F0F0;
        text-align: center;
    }
</style>