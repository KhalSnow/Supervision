<template>
    <div>
        <el-button @click="addItem" class="addItem">新增</el-button>
        <el-button @click="activiteSupervision">监测</el-button>

        <el-dialog
            :visible.sync="addDialogVisible"
            width="30%"
            :before-close="handleAddClose">
            <span><addForm @addChildValue="addChildData"></addForm></span>
        </el-dialog>

        <el-table
            :data="tableData"
            :cell-style="cellStyle"
            :header-cell-style="rowClass"
            stripe
            ref="filterTable"
            border
            style="width:100%"
            id="table">
            <el-table-column
                prop="id"
                label="编号"
                column-key="id">
            </el-table-column>
            <el-table-column
                prop="domain"
                label="域名"
                column-key="domain">
            </el-table-column>
            <el-table-column
                prop="intervals"
                label="监测频率"
                column-key="intervals">
            </el-table-column>
            <el-table-column
                prop="member"
                label="接收人"
                column-key="member">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="deleteItem(scope.row.id)" size="small">删除</el-button>
                    <el-button @click="editItem([scope.row.id, scope.row.domain, scope.row.intervals, scope.row.member])" size="small">编辑</el-button>
                </template>
            </el-table-column>
            <el-table-column
                prop="enable"
                label="激活"
                column-key="enable">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.enable"
                        active-color="#13ce66"
                        @change="changeSwitch(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
            :visible.sync="editDialogVisible"
            width="30%"
            :before-close="handleEditClose">
            <span><editForm @editChildValue="editChildData" :Form="[id, domain, intervals, member]"></editForm></span>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import addForm from "@/components/AddForm/AddForm.vue"
    import editForm from "@/components/EditForm/EditForm.vue"
    import { getItem, deleteItem } from '@/api/crud/crud.js'
    import { getContents, switchChange } from '@/api/supervision/supervision.js'

    export default {
        data() {
            return {
                id: "",
                domain: "",
                intervals: "",
                member: "",
                tableData: [],
                enable: ""
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                getItem().then(response => {
                    //console.log(response.data.code)
                    //console.log(response.data.data)
                    if (response.data.code == 400) {
                        this.$notify({
                            type: 'error',
                            message: '未登陆，请先登陆',
                            duration: 2000
                        })
                        this.$router.replace("/login")
                    } else if (response.data.code == 401) {
                        this.$notify({
                            type: 'error',
                            message: '登陆过期，请重新登陆',
                            duration: 2000
                        })
                        this.$router.replace("/login")
                    } else {
                        this.tableData = response.data.data
                    }
                })
            },
            cellStyle({ row, column, rowIndex, columnIndex }) {
                return "text-align:center"
            },
            rowClass({ row, rowIndex }) {
                return "text-align:center"
            },
            ...mapMutations([
                'addVisible',
                'addInvisible',
                'editVisible',
                'editInvisible'
            ]),
            addItem() {
                this.addVisible()
            },
            handleAddClose() {
                this.addInvisible()
            },
            addChildData(data) {
                //console.log(data)
                this.tableData = data
            },
            deleteItem(id) {
                if(!confirm('是否要删除数据？')) {
                    return
                }
                deleteItem({"id": id}).then(response => {
                    this.fetchData()
                })
            },
            editItem([id, domain, intervals, member]) {
                this.id = id
                this.domain = domain
                this.intervals = intervals
                this.member = member
                this.editVisible()
            },
            handleEditClose() {
                this.editInvisible()
            },
            editChildData(data) {
                this.tableData = data
            },
            changeSwitch(data) {
                console.log(data)
                switchChange({ "enable": data.enable, "tt": Number(new Date()), "id": data.id }).then(response => {
                    console.log(response.code, response.data)
                })
            },
            activiteSupervision() {
                getContents().then(response => {
                    return
                })
            }
        },
        components: {
            addForm,
            editForm
        },
        computed: {
            ...mapState([
                'addDialogVisible',
                'editDialogVisible'
            ]),
            addDialogVisible: {
                get: function() {
                    return this.$store.state.addDialogVisible
                },
                set: function() {}
            },
            editDialogVisible: {
                get: function() {
                    return this.$store.state.editDialogVisible
                },
                set: function() {}
            }
        }
    }
</script>

<style>
    .addItem {
        float:right;
        margin-bottom: 20px
    }
</style>
