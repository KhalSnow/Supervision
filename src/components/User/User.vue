<template>
    <div>
        <el-button @click="addItem" class="addItem">新增</el-button>

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
                prop="ip"
                label="域名"
                column-key="ip">
            </el-table-column>
            <el-table-column
                prop="frequency"
                label="监测频率"
                column-key="frequency">
            </el-table-column>
            <el-table-column
                prop="receiver"
                label="接收人"
                column-key="receiver">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="deleteItem(scope.row.id)" size="small">删除</el-button>
                    <el-button @click="editItem([scope.row.id, scope.row.ip, scope.row.frequency, scope.row.receiver])" size="small">修改</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
            :visible.sync="editDialogVisible"
            width="30%"
            :before-close="handleEditClose">
            <span><editForm @editChildValue="editChildData" :Form="[id, ip, frequency, receiver]"></editForm></span>
        </el-dialog>
    </div>
</template>

<script>
    import { mapState, mapMutations } from 'vuex'
    import addForm from "@/components/AddForm/AddForm.vue"
    import editForm from "@/components/EditForm/EditForm.vue"
    import { getItem, deleteItem } from '@/api/crud/crud.js'

    export default {
        data() {
            return {
                id: "",
                ip: "",
                frequency: "",
                receiver: "",
                tableData: []
            }
        },
        created() {
            this.fetchData()
        },
        methods: {
            fetchData() {
                getItem().then(response => {
                    console.log(response.data.data)
                    this.tableData = response.data.data
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
                console.log(data)
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
            editItem([id, ip, frequency, receiver]) {
                this.id = id
                this.ip = ip
                this.frequency = frequency
                this.receiver = receiver
                this.editVisible()
            },
            handleEditClose() {
                this.editInvisible()
            },
            editChildData(data) {
                this.tableData = data
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
