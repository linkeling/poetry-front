<template>
    <div class="login-container" style="background-color: #93defe">
        <div class="login_box">
            <img src="../assets/login_images/login-img.png"/>
            <div class="login_form">
                <div class="login_logo">
                    <img src="../assets/login_images/login_logo.png"/>
                </div>
                <div class="login_name">诗词鉴赏后台管理系统</div>
                <el-form ref="formRef" :model="formData" :rules="rules" class="antd_form">
                    <el-form-item prop="userName">
                        <el-input v-model="formData.userName" placeholder="请输入账号" prefix-icon="el-icon-user"></el-input>
                    </el-form-item>
                    <el-form-item prop="passWord">
                        <el-input v-model="formData.passWord" placeholder="请输入密码" prefix-icon="el-icon-lock"
                                  show-password>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="width: 100%" @click="login" :loading="btnLoading">登 录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    import {Login} from "../requestFile/baseInfoApi"
    export default {
        data() {
            return {
                formData: {
                    userName: '',
                    passWord: '',
                },
                rules: {
                    userName: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                    ],
                    passWord: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ]
                },
                btnLoading: false,
            }
        },
        methods: {
            // 登录
            login() {
                this.$refs.formRef.validate(valid => {
                    if (valid) {
                        let params = {
                            userName: this.formData.userName,
                            password: this.formData.passWord,
                        };
                        this.btnLoading = true;
                        Login(params).then((res) => {
                            this.btnLoading = false;
                            if(res.data.code==="SUCCESS"){
                                sessionStorage.setItem('userLoginInfo',JSON.stringify(res.data.data));
                                this.$router.push('Index/come');
                            }else {
                                this.$message.info(res.data.message)
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
        }
    }
</script>
<style scoped lang="scss">
    .login-container {
        height: 100%;

        .login_box {
            width: 1100px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            justify-content: space-between;
            align-items: center;

            .login_form {
                width: 400px;
                height: 360px;
                background: #fff;
                border-radius: 6px;
                position: relative;

                .login_logo {
                    width: 120px;
                    height: 120px;
                    border: 5px solid #93defe;
                    border-radius: 50%;
                    background: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }

                .login_name {
                    margin-top: 80px;
                    font-size: 18px;
                    color: #444;
                    text-align: center;
                }

                .antd_form {
                    margin: 30px 30px;
                }
            }
        }
    }
</style>
