<template>
    <el-container>

        <el-aside width="260px">
            <div class="aside_header">
<!--                <img src="../assets/login_images/logo.png" alt="" style="height: 60px">-->
            </div>
            <el-menu unique-opened router :default-active="activePath">
                <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
                    <template slot="title">
                        <span>{{item.menuTitle}}</span>
                    </template>
                    <el-menu-item :index="'/index' + subItem.frontUrl" v-for="subItem in item.childList" :key="subItem.id" @click="saveNavState(subItem)">
                        <template slot="title">
                            <span>{{subItem.menuTitle}}</span>
                        </template>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <div class="system_title">诗词鉴赏后台管理系统</div>
                <div class="system_title_right">
                    <div class="system_username">欢迎登录,{{userInfo.name}}</div>
                    <el-button type="text" @click="logout">退出登录</el-button>
                    <el-button type="text" @click="dialogVisible = true">修改密码</el-button>
                </div>
            </el-header>
            <el-main>
                <div class="rt-body" id="rtBody">
                    <el-tabs style="width: 100%" v-model="editableTabsValue" type="border-card" @tab-click="tClick"  @tab-remove="removeTab">
                        <el-tab-pane
                                v-for="(item,index) in editableTabs"
                                :key="item.id"
                                :label="item.name"
                                :name="item.id"
                                :closable="index!=0"
                        >
                        </el-tab-pane>
                    </el-tabs>
                    <el-card>
                        <router-view></router-view>
                    </el-card>
                </div>
            </el-main>
        </el-container>
        <!-- 修改密码--弹窗部分 -->
        <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%" @close="handleDialogClose" center append-to-body>
            <el-form ref="formRef" :model="formData" :rules="formRules" label-width="90px" v-loading="fromLoading" element-loading-text="Loading">
                <div style="height: 30vh; overflow: auto">
                    <div class="form_block">
                        <el-form-item label="原密码：" prop="password">
                            <el-input v-model="formData.password" placeholder="请输入原密码" clearable show-password></el-input>
                        </el-form-item>
                        <el-form-item label="新密码：" prop="newPassword">
                            <el-input v-model="formData.newPassword" placeholder="请输入新密码" clearable show-password></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码：" prop="suerPassword">
                            <el-input v-model="formData.suerPassword" placeholder="再次输入密码" clearable show-password></el-input>
                        </el-form-item>
                </div>
                </div>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false"  size="small">取 消</el-button>
              <el-button type="primary" @click="submitUpdatePassword" size="small" :loading="fromLoading">提 交</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>
<script>
import {getMenu,checkPassword,updatePassword} from '@/requestFile/baseInfoApi.js'
import {checkPhone} from "../utils/checkInfo";
export default {
    data() {
        let validatePass = (rule, value, callback) => {
            if(this.formData.password!=null){
                checkPassword(this.formData).then(res => {
                    if(!res.data.data){
                        callback(new Error('密码错误，请重试'));
                    }else{
                        callback();
                    }
                });
            }
        };
        let validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.formData.newPassword) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            menuList: [],
            activePath: '',
            userInfo: sessionStorage.getItem('userLoginInfo'),
            editableTabs: [
                {
                    name:"首页",id: "0",frontActionUrl: "/index/come"
                }
            ],
            editableTabsValue:"",
            dialogVisible:false,
            formData: {
            },
            formRules: {
                password:[{ required: true, message: '请输入原密码', trigger: 'blur' },{ required: true, validator: validatePass, trigger: 'blur' }],
                newPassword:[{ required: true, message: '请输入新密码', trigger: 'blur' }],
                suerPassword:[{ required: true, message: '请确认密码', trigger: 'blur' },{ required: true, validator: validatePass2, trigger: 'blur' }],
            },
            fromLoading: false,
        }
    },
    created() {
        this.getMenuList();
        let tabs = JSON.parse(window.sessionStorage.getItem('editableTabs'));
        if(tabs){
            this.activePath = window.sessionStorage.getItem('activePath');
            this.editableTabsValue = window.sessionStorage.getItem('editableTabsValue');
            this.editableTabs=tabs;
        }
    },
    methods: {
        getMenuList() {
            getMenu().then(res => {
                if(res.data.code === 'SUCCESS') {
                    this.menuList = res.data.data;
                }
            });
        },
        tClick(){
            for (let i = 0; i < this.editableTabs.length; i++) {
                if (this.editableTabsValue=== this.editableTabs[i].id) {
                    this.$router.push(this.editableTabs[i].frontActionUrl);
                    this.activePath =this.editableTabs[i].frontActionUrl;
                    window.sessionStorage.setItem('activePath',this.editableTabs[i].frontActionUrl);
                    window.sessionStorage.setItem('editableTabsValue',this.editableTabsValue);
                    window.sessionStorage.setItem('editableTabs',JSON.stringify(this.editableTabs));
                }
            }
        },
        removeTab(targetName) {
            for(let i=0;i<this.editableTabs.length;i++){
                if(this.editableTabs[i].id===""+targetName){
                    if(this.editableTabs[i].id===this.editableTabsValue){
                        this.editableTabsValue=""+this.editableTabs[i-1].id;
                        window.sessionStorage.setItem('activePath',this.editableTabs[i-1].frontActionUrl);
                        window.sessionStorage.setItem('editableTabsValue',this.editableTabsValue);
                        this.activePath =this.editableTabs[i-1].frontActionUrl;
                        this.$router.push(this.editableTabs[i-1].frontActionUrl);
                    }
                    this.editableTabs.splice(i,1);
                    window.sessionStorage.setItem('editableTabs',JSON.stringify(this.editableTabs));
                }
            }
        },
        saveNavState(subItem) {
            let url= '/index' + subItem.frontUrl;
            window.sessionStorage.setItem('activePath',url);
            this.activePath = url;
            let tab={name:subItem.menuTitle,id: ""+subItem.id,frontActionUrl: url};
            this.editableTabsValue=""+subItem.id;
            let float=true;
            for(let i=0;i<this.editableTabs.length;i++){
                if(this.editableTabs[i].id===""+subItem.id){
                    float=false;
                    return
                }
            }
            this.editableTabs.push(tab);
            window.sessionStorage.setItem('editableTabsValue',this.editableTabsValue);
            window.sessionStorage.setItem('editableTabs',JSON.stringify(this.editableTabs));
        },
        logout() {
            this.$router.push('/');
            window.sessionStorage.clear();
        },

        //修改密码
        // 关闭弹窗
        handleDialogClose() {
            this.formData={};
            this.$refs.formRef.resetFields();
            this.dialogVisible = false;
        },


        //提交修改密码
        submitUpdatePassword(){
            this.$refs.formRef.validate(valid => {
                if(valid) {
                    this.$confirm('确认提交么？', '提示').then(() => {
                        this.fromLoading = true;
                        updatePassword(this.formData).then(res=>{
                            this.fromLoading = false;
                            if(res.data.code === 'SUCCESS') {
                                this.$alert('密码修改成功，请重新登录！', '提示').then(() =>{
                                    this.logout();
                                });
                                this.dialogVisible = false;
                            }
                        });
                    });
                }
            });
        },
    },
}
</script>
<style scoped>
.el-container {
    height: 100%;
}
.el-aside {
    box-shadow: rgb(225, 225, 225) 0px 2px 8px;
}
.el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.el-main {
    background: #eaedf1;
    height: 100%;
}
.el-menu {
    border-right: none;
    margin-top: 60px;
}
.el-card {
    height: 99%;
}
.system_title_right {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.system_title {
    font-weight: bold;
    font-size: 16px;
}
.system_username {
    margin-right: 20px;
    font-size: 14px;
}
.aside_header {
    height: 60px;
    width: 260px;
    box-shadow: rgb(225, 225, 225) 0px 2px 8px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 1;
    background: #fff;
    text-align: center;
}
</style>
