<template>
    <div class="app-container">
        <div class="search-left-item">
            <label>类型</label>
            <el-select v-model="searchForm.type">
                <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
            </el-select>
        </div>
        <div class="search-left-item">
            <label>标题名称</label>
            <el-input v-model="searchForm.titleName" placeholder="标题" style="width: 200px"></el-input>
        </div>
        <div class="search-left-item">
            <el-button type="primary" class="search-btn" @click="searchList">查 询</el-button>
        </div>

        <div class="search-right-item">
            <el-button type="primary" class="search-btn" @click="createPersonBaseInfo" icon="el-icon-edit-outline">新增</el-button>
        </div>

        <div style="clear: both"></div>

        <div class="table-container">
            <el-table v-loading="listLoading" :data="tableData" size="mini" element-loading-text="Loading" fit border
                      highlight-current-row :height="tableHeight">
                <el-table-column label="标题" prop="titleName" align="left" show-overflow-tooltip></el-table-column>
                <el-table-column label="分类" prop="typeName" align="left" show-overflow-tooltip></el-table-column>
                <el-table-column label="朝代" prop="chaodai" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column label="作者" prop="author" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column label="标签" prop="label" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column label="阅读量" prop="readNum" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column label="添加时间" prop="created" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作" align="center" width="240px" fixed="right">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="viewPoetryBaseInfo(scope.row.id)">查看
                        </el-button>
                        <el-button type="danger" size="mini" @click="deletePoetryBaseInfo(scope.row.id)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页部分 -->
            <div class="content-page">
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="current_change"
                        :current-page="pageInfo.currentPage"
                        :page-sizes="pageInfo.pageSizes"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="pageInfo.total"
                        :page-size="pageInfo.pageSize">
                </el-pagination>
            </div>
        </div>
        <poetry-base-info ref="poetryBaseInfoDialog"></poetry-base-info>
    </div>
</template>

<script>
    import {
        getPoetryBaseInfoPage,
        deletePoetryBaseInfo,
        poetryBaseInfoById
    } from "../../requestFile/baseInfoApi";
    import PoetryBaseInfo from "./components/poetryBaseInfo";
    export default {
        components: {PoetryBaseInfo},
        data() {
            return {
                customId:'',
                searchForm: {
                },
                listLoading: false,
                tableData: [],
                tableHeight: window.innerHeight - 270,

                pageInfo: {
                    total: 0,
                    pageSize: 10,
                    pageSizes: [10, 20, 30, 50],
                    currentPage: 1
                },
                typeList: [{id: null, name: '所有...'},{id: 1, name: '小学'},{id: 2, name: '初中'}, {id: 3, name: '高中'},{id: 4, name: '课外'}],
            }
        },
        created() {
            this.searchList();
        },
        methods: {

            createPersonBaseInfo(){
                this.$refs.poetryBaseInfoDialog.openDialog('create');
            },

            viewPoetryBaseInfo(id){
                this.personPoetryInfoById(id);
                this.$refs.poetryBaseInfoDialog.openDialog('view');
            },

            personPoetryInfoById(id) {
                poetryBaseInfoById(id).then(res => {
                    if (res.data.code === 'SUCCESS') {
                        let data=res.data.data;
                        this.$refs.poetryBaseInfoDialog.formData=data;
                    }
                });
            },

            deletePoetryBaseInfo(id){
                this.$confirm('确定删除本条信息么？删除后不可恢复！', '提示').then(() => {
                    deletePoetryBaseInfo(id).then(res=> {
                        if (res.data.code === 'SUCCESS') {
                            this.$message.success('删除成功！')
                            this.searchList()
                        }
                    })
                }).catch(() => {
                    return false;
                });
            },

            handleSizeChange(val) {
                this.pageInfo.pageSize = val;
                this.searchList();
            },
            current_change(currentPage) {
                this.pageInfo.currentPage = currentPage;
                this.searchList();
            },


            searchList() {
                this.listLoading = true;
                let params = {
                    pageIndex: this.pageInfo.currentPage,
                    pageSize: this.pageInfo.pageSize,
                    titleName:this.searchForm.titleName,
                    type:this.searchForm.type,
                }
                getPoetryBaseInfoPage(params).then(res=> {
                    this.listLoading = false;
                    let data=res.data;
                    if (data.code === 'SUCCESS') {
                        this.tableData = data.data.dataList;
                        this.pageInfo.total = data.data.total;
                    }
                });
            },
        }
    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
