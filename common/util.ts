import * as CryptoJS from 'crypto-js';
import * as jwt from 'jsonwebtoken'

const secret = "CRMJAVI2022/09/23"
export const secret_token = "CRMTOKENLOGIN2022/09/23"


export const encrypted  = (str: any) => {
    let encrypted = CryptoJS.AES.encrypt(str, secret).toString();
    return encrypted;
}

export const decrypted  = (str: any) => {
    let decrypted = CryptoJS.AES.decrypt(str, secret);
    return decrypted.toString(CryptoJS.enc.Utf8);
}

export const getToken = (user: any) => {
    let token = jwt.sign({user}, secret_token, {
        expiresIn: '3h'
    })
    return token;
}