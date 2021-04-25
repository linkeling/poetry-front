import axios  from 'axios';
import {MessageBox} from 'element-ui'
var apiInstance=axios.create({
    baseURL:process.env.VUE_APP_PATH,
    timeout:10000,
    withCredentials:true
})
/*为请求添加请求头中的token和请求所需参数userid*/
apiInstance.interceptors.request.use(config=>{
    if(sessionStorage.token){
        config.headers.Authorization="bearer "+sessionStorage.getItem('token');
        if(typeof(config.params) == "undefined"){
            config.params={}
        }
    }
    return config;//赋值完后把config返回回去
},error => {
    // 请求错误后把我们的error返回回去
    return Promise.reject(error);
})
//响应拦截器
apiInstance.interceptors.response.use(
    response => {
        if(response.data.code==="BIZ.BUSSINESS_EXCEPTION"){
            MessageBox.confirm(`${response.data.msg}`, '提示').then(()=>{
                return true;
            }).catch(()=>{
                return false;
            });
        }
        if(response.data.code==="PARAM.EXCEPTION"){
            MessageBox.confirm("系统异常请联系客服", '提示').then(()=>{
                return true;
            }).catch(()=>{
                return false;
            });
        }
        if(response.data.code==="SYS.UNKNOWN_EXCEPTION"){
            MessageBox.confirm("系统异常请联系客服", '提示').then(()=>{
                return true;
            }).catch(()=>{
                return false;
            });
        }
        return response
    }
);
export default apiInstance;
