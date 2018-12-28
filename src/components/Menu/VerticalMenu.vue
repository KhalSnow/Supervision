<template>
        <div>
            <el-row>
                <el-col>
                    <el-menu router>
                        <el-submenu index="programA">
                            <template slot="title">
                                <span>项目一</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="categoryA">类型1</el-menu-item>
                                <el-menu-item index="categoryB">类型2</el-menu-item>
                                <el-menu-item index="categoryC">类型3</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-menu-item index="programB">
                            <span slot="title">项目二</span>
                        </el-menu-item>
                        <el-menu-item index="programC">
                            <span slot="title">项目三</span>
                        </el-menu-item>
                        <el-menu-item index="programD">
                            <span slot="title">项目四</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>
        </div>
    </template>
    
    <script>
        export default {}
    </script>
    