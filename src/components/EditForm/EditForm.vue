<template>
    <el-row type="flex" justify="center">
        <el-form ref="editForm" :rules="rules" :model="form" label-width="80px" status-icon>
            <el-form-item label="域名" prop="domain">
                <el-input v-model="form.domain" placeholder="请输入域名" clearable></el-input>
            </el-form-item>
            <el-form-item label="监测间隔" prop="intervals">
                <el-select v-model="form.intervals" placeholder="请选择监测间隔" clearable>
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="接收人" prop="member">
                <el-input type="textarea" v-model="form.member" placeholder="请输入接收人姓名(如有多位接收人请用回车键分隔)" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit">确定</el-button>
                <el-button type="primary" @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-row>
</template>

<script>
    import store from '@/vuex/index.js'
    import { mapMutations } from 'vuex'
    import { editItem, getItem } from '@/api/crud/crud.js'

    export default {
        props: ["Form"],
        data() {
            return {
                form: {
                    id: "",
                    domain: "",
                    intervals: "",
                    memeber: ""
                },
                tableData: "",
                options: [{
                    value: '1',
                    label: '1'
                }, {
                    value: '5',
                    label: '5'
                }, {
                    value: '10',
                    label: '10'
                }, {
                    value: '30',
                    label: '30'
                }, {
                    value: '60',
                    label: '60'
                }],
                value: '',
                rules: {
                    domain: [
                        {required: true, message: "域名不能为空", trigger: "blur"}
                    ],
                    intervals: [
                        {required: true, message: "监测间隔不能为空", trigger: "blur"}
                    ],
                    member: [
                        {required: true, message: '接收人不能为空', trigger: "blur"}
                    ]
                }
            }
        },
        methods: {
            submit() {
                // this.form.ip = this.Form[1]
                // this.form.frequency = this.Form[2]
                // this.form.receiver = this.Form[3]
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        editItem({"id": this.Form[0], "domain": this.form.domain, "intervals": this.form.intervals, "member": this.form.member}).then(response => {
                            //console.log(response.data.msg)
                        })
                        this.editInvisible()
                        getItem().then(response => {
                            //console.log(response.data.data)
                            this.tableData = response.data.data
                            this.$emit("editChildValue", this.tableData)
                        })
                    }
                })
            },
            cancel() {
                this.editInvisible()
            },
            ...mapMutations ([
                'editVisible',
                'editInvisible'
            ])
        },
        created() {
            console.log(this.Form)
        },
        watch: {
            form() {
                this.form.domain = this.Form[1]
                this.form.intervals = this.Form[2]
                this.form.member = this.Form[3]
            },
            immediate: true
        }
    }
</script>