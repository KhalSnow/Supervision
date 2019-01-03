<template>
    <el-row type="flex" justify="center" class="login">
        <el-form :model="user" :rules="rules" ref="loginForm" label-width="80px" status-icon>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="user.username" placeholder="请输入您的用户名" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="user.password" placeholder="请输入密码" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
    </el-row>
</template>

<script>
    import md5 from 'js-md5'
    import { logIn } from '@/api/crud/crud.js'

    export default {
        data() {
            return {
                user: {username: "", password: "", datetime: new Date()},
                rules: {
                    username: [
                        {required: true, message: "用户名不能为空", trigger: "blur"}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: "blur"},
                        {min:6, max:16, message: "长度在6-16个字符", trigger: "blur"}
                    ]
                },
                token: ""
            }
        },
        methods: {
            login() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        logIn({ "username": this.user.username, "password": this.user.password, "datetime": Number(this.user.datetime)}).then(response => {
                            console.log(response.data.data)
                            console.log(window.localStorage)
                            if (response.data.data[0] == true) {
                                this.$store.dispatch('login', response.data.data[1]).then(() => {
                                    this.$notify({
                                        type: 'success',
                                        message: '欢迎您, ' + this.user.username,
                                        duration: 2000
                                    })
                                    this.$router.replace("/user")
                                })
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '用户名或密码错误',
                                    showClose: true
                                })
                            }
                        }).catch((err) => {
                            console.log(err)
                            this.$message({
                                type: 'error',
                                message: '网络错误，请重试',
                                showClose: true
                            })
                        })
                    }
                    else {
                        return false
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .login {
        margin-top: 100px
    }
</style>