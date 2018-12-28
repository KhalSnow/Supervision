<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="编号">
                <el-input v-model="form.id" placeholder="请输入id编号"></el-input>
            </el-form-item>
            <el-form-item label="域名">
                <el-input v-model="form.ip" placeholder="请输入ip地址"></el-input>
            </el-form-item>
            <el-form-item label="监测频率">
                <el-input v-model="form.frequency" placeholder="请输入监测频率"></el-input>
            </el-form-item>
            <el-form-item label="接收人">
                <el-input v-model="form.receiver" placeholder="请输入接收人姓名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button type="primary" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import store from '@/vuex/index.js'
    import { mapMutations } from 'vuex'
    import { addItem, getItem } from '@/api/crud/crud.js'

    export default {
        data() {
            return {
                form: {
                    id: "",
                    ip: "",
                    frequency: "",
                    receiver: ""
                },
                tableData: ""
            }
        },
        methods: {
            submit() {
                addItem({"id": this.form.id, "ip": this.form.ip, "frequency": this.form.frequency, "receiver": this.form.receiver}).then(response => {
                    console.log(response.data.msg)
                })
                this.addInvisible()
                getItem().then(response => {
                    console.log(response.data.data)
                    this.tableData = response.data.data
                    this.$emit("addChildValue", this.tableData)
                })
            },
            cancel() {
                this.addInvisible()
            },
            ...mapMutations ([
                'addVisible',
                'addInvisible'
            ])
        }
    }
</script>