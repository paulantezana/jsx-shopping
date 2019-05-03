import decoder from 'jwt-decode';
import CryptoJS  from 'crypto-js';

// KEYS
const TOKEN_KEY = '/&AV(%Y';
const ROLE_KEY = '(-NJ*$';
const ROLE_AUTH = 'V?(%A¡T';

// Recupera el token
export const getToken = () => {
    let token = localStorage.getItem(TOKEN_KEY);
    if (token === null) {
        token = sessionStorage.getItem(TOKEN_KEY);
    }
    return token;
};

// Recuperal el perfil
const getRole = ()=> {
    let remember = true;
    let role = localStorage.getItem(ROLE_KEY);
    if (role === null) {
        role = sessionStorage.getItem(ROLE_KEY);
        remember = false;
    }
    return { role, remember };
}

// Recupera la authorizacion
export const getAuthority = str => {
    const token = getToken();
    if (token === null) return [0];
    return [1];
};

// Set authority
export const setAuthority = (authority = { }, remember = false, )=> {
    if (remember) {
        localStorage.setItem(TOKEN_KEY, JSON.stringify(authority));
    } else {
        sessionStorage.setItem(TOKEN_KEY, JSON.stringify(authority));
    }
}

// Set authority new role
export const setAuthorityRole = (role = {}) => {
    const remember = getRole().remember;
    const cipher = CryptoJS.AES.encrypt(JSON.stringify(role),ROLE_AUTH);
    if(remember){
        localStorage.setItem(ROLE_KEY,cipher);
    }else{
        sessionStorage.setItem(ROLE_KEY,cipher);
    }
}

// Set authority new role
export const getAuthorityRole = () => {
    const role = getRole().role;
    if (role === null) return {};

    const cipher  = CryptoJS.AES.decrypt(getRole().role, ROLE_AUTH);
    const predata = JSON.parse(cipher.toString(CryptoJS.enc.Utf8));

    return predata;
}

// // Get user token
export const getAuthorityUser = () => {
    const token = getToken();
    if (token === null) return {};
    return decoder(getToken());
};

// Logout
export const destroy = () => {
    localStorage.clear();
    sessionStorage.clear();
};
