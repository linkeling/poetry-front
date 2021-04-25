/*验证电话*/
export const checkPhone = (rule, value, callback) => {
    const ckPhone = /^1(?:3[0-9]|4[5-9]|5[0-9]|6[12456]|7[0-8]|8[0-9]|9[0-9])[0-9]{8}$/;
    const cktel = /^0[1-9][0-9]{1,2}-[2-8][0-9]{6,7}$/;
    if (ckPhone.test(value) || cktel.test(value)) {
        callback()
    } else {
        callback(new Error('请输入正确的手机号或座机'));
    }
};

/** 纯数字校验*/
export const validateNumber = (rule, value, callback) => {
    let numberReg = /^\d+$|^\d+[.]?\d+$/
    if (value != '' && value != null) {
        if (!numberReg.test(value)) {
            callback(new Error('请输入数字'))
        } else {
            callback()
        }
    } else {
        callback()
    }
}
// 验证手机号
export const checkMobilePhone = (rule, value, callback) => {
    const ckPhone = /^1(?:3[0-9]|4[5-9]|5[0-9]|6[12456]|7[0-8]|8[0-9]|9[0-9])[0-9]{8}$/;
    if (ckPhone.test(value)) {
        callback()
    } else {
        callback(new Error('请输入正确的手机号'));
    }
};

//验证货币金额
export function validatPrices(rule, value, callback) {
    if (rule.required === false && (value === '' || value === null || value === undefined)) {
        callback()
    }
    const isPrice = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/
    if (isPrice.test(value)) {
        callback()
    } else {
        callback(new Error(rule.message || '请输入正确的数值，例：10, 10.00'))
    }
}

//验证邮箱
export function validateEMail(rule, value,callback) {
    const reg =/^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
    if(value==''||value==undefined||value==null){
        callback();
    }else{
        if (!reg.test(value)){
            callback(new Error('请输入正确的邮箱'));
        } else {
            callback();
        }
    }
}
//最多以为小数
export const onePoint = (rule, value, callback) => {
    if (!/^[0-9]+([.]{1}[0-9]{1})?$/.test(value)) {
        callback(new Error('最多一位小数！'));
    } else {
        callback();
    }
};
