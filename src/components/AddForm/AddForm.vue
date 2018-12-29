<template>
    <el-row type="flex" justify="center">
        <el-form ref="addForm" :rules="rules" :model="form" label-width="80px">
            <el-form-item label="域名">
                <el-input v-model="form.ip" clearable placeholder="请输入ip地址"></el-input>
            </el-form-item>
            <el-form-item label="监测频率">
                <el-select v-model="form.frequency" clearable placeholder="请选择监测频率">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="接收人">
                <el-input type="textarea" v-model="form.receiver" clearable placeholder="请输入接收人姓名(如有多位接收人请用回车键分隔)"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button type="primary" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-row>
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
                tableData: "",
                options: [{
                    value: '5min',
                    label: '5min'
                }, {
                    value: '10min',
                    label: '10min'
                }, {
                    value: '30min',
                    label: '30min'
                }, {
                    value: '1h',
                    label: '1h'
                }],
                value: '',
                rules: {
                    ip: [
                        {required: true, message: "ip地址不能为空", trigger: "blur"}
                    ],
                    frequency: [
                        {required: true, message: "接收频率不能为空", trigger: "blur"}
                    ],
                    receiver: [
                        {required: true, message: '接收人不能为空', trigger: "blur"}
                    ]
                }
            }
        },
        methods: {
            submit() {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        addItem({"id": this.form.id, "ip": this.form.ip, "frequency": this.form.frequency, "receiver": this.form.receiver}).then(response => {
                            console.log(response.data.msg)
                        })
                        this.addInvisible()
                        getItem().then(response => {
                            console.log(response.data.data)
                            this.tableData = response.data.data
                            this.$emit("addChildValue", this.tableData)
                        })
                    }
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