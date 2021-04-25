<template>
    <el-dialog title="诗词信息"
               :visible.sync="poetryBaseInfoDialog"
               top="5vh" width="70%" @close="closedDialog" center>
        <div style="height:65vh;margin-top: 20px">
            <el-form ref="formData" label-width="160px" :model="formData" :rules="rules">
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="类型" prop="type">
                            <el-select v-model="formData.type" :disabled="showInfo" placeholder="请选择类型">
                                <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="标题" prop="titleName">
                            <el-input placeholder="请输入标题" style="width: 300px" v-model="formData.titleName" :disabled="showInfo"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="朝代" prop="chaodai">
                            <el-input placeholder="请输入朝代" style="width: 300px" v-model="formData.chaodai" :disabled="showInfo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item label="作者" prop="author">
                            <el-input placeholder="请输入作者" style="width: 300px" v-model="formData.author" :disabled="showInfo"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="标签" prop="label">
                            <el-input placeholder="请输入标签" style="width: 300px" v-model="formData.label" :disabled="showInfo"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="正文" prop="poetryText">
                            <el-input type="textarea" placeholder="请输入正文" v-model="formData.poetryText" :disabled="showInfo"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="译文" prop="translation">
                            <el-input type="textarea" placeholder="请输入译文" v-model="formData.translation" :disabled="showInfo"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="注释" prop="notes">
                            <el-input type="textarea" placeholder="请输入注释" v-model="formData.notes" :disabled="showInfo"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20">
                        <el-form-item label="赏析" prop="appreciation">
                            <el-input type="textarea" placeholder="请输入赏析" v-model="formData.appreciation" :disabled="showInfo"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div slot="footer" class="dialog-footer">
            <el-button @click="closedDialog" size="small">取 消</el-button>
            <el-button type="primary" v-show="openType=='create'|| openType=='update'" size="small" @click="submitData">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {
        insertPoetryBaseInfo,
        updatePoetryBaseInfo,
    } from "../../../requestFile/baseInfoApi";
    import {
        apiUtils
    } from "../../../utils/ApiUtils";
    export default {
        name: "poetryBaseInfo",
        data(){
            return{
                formData: {
                },
                openType:'',
                poetryBaseInfoDialog: false,
                userLoginInfo:apiUtils.getUserLoginInfo(),
                showInfo:false,
                typeList: [{id: 1, name: '小学'},{id: 2, name: '初中'}, {id: 3, name: '高中'},{id: 4, name: '课外'}],
                rules:{
                    type: [
                        {required: true, message: '请选择诗词类型', trigger: 'change'}
                    ],
                    titleName: [
                        {required: true, message: '请输入标题名称', trigger: 'blur'}
                    ],
                    chaodai: [
                        {required: true, message: '请选朝代', trigger: 'blur'}
                    ],
                    author: [
                        {required: true, message: '请输入作者', trigger: 'blur'}
                    ],
                    label: [
                        {required: true, message: '请输入标签信息', trigger: 'blur'}
                    ],
                    poetryText: [
                        {required: true, message: '请输入正文内容', trigger: 'blur'}
                    ],
                    translation: [
                        {required: true, message: '请输入译文', trigger: 'blur'}
                    ],
                    notes: [
                        {required: true, message: '请输入注释', trigger: 'blur'}
                    ],
                    appreciation: [
                        {required: true, message: '请输入赏析', trigger: 'blur'}
                    ],
                }
            }
        },
        created() {
        },

        methods: {
            openDialog(type) {
                this.poetryBaseInfoDialog = true;
                this.openType=type;
                if (type == 'view') {
                    this.showInfo=true;
                }
            },

            closedDialog() {
                this.poetryBaseInfoDialog = false;
                this.showInfo=false;
                this.$refs.formData.resetFields();
            },


            submitData() {
                this.$refs.formData.validate(valid => {
                    if (valid) {
                        this.$confirm('确定提交客户信息么？', '提示').then(() => {
                            let params = this.formData;
                            params.personId=this.userLoginInfo.relationId;
                            insertPoetryBaseInfo(params).then(res => {
                                if (res.data.code === 'SUCCESS') {
                                    this.$message.success('新增成功！')
                                    this.poetryBaseInfoDialog = false
                                    this.$parent.searchList()
                                }
                            })
                        }).catch(() => {
                            return false;
                        });

                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>