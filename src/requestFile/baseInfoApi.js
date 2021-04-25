import apiInstance from './api'

/*登录*/
export const Login = params =>{
    return apiInstance.post(`/v1/poetry-admin/sys-user-info/login`,params);
};

// 获取菜单
export const getMenu = () =>{
    return apiInstance.get(`/v1/poetry-admin/sys-menu-info/all`);
};

export const getPoetryBaseInfoPage =(params)=> {
    return apiInstance.get(`/v1/poetry-admin/poetry-base-info`,{params});
};

export const poetryBaseInfoById = id =>{
    return apiInstance.get(`/v1/poetry-admin/poetry-base-info/${id}`);
};

export const insertPoetryBaseInfo= params =>{
    return apiInstance.post(`/v1/poetry-admin/poetry-base-info`,params);
};

export const updatePoetryBaseInfo =(id,params)=>{
    return apiInstance.put(`/v1/poetry-admin/poetry-base-info/${id}`,params);
};

export const deletePoetryBaseInfo= id =>{
    return apiInstance.delete(`/v1/poetry-admin/poetry-base-info/${id}`);
};