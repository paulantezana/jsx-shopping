import decoder from 'jwt-decode';
import CryptoJS  from 'crypto-js';

// KEYS
const TOKEN_KEY = '/&AV(%LK';
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
    const role = getRole().role;
    if (role === null) return [0];

    const cipher  = CryptoJS.AES.decrypt(getRole().role, ROLE_AUTH);
    const predata = JSON.parse(cipher.toString(CryptoJS.enc.Utf8));

    return [predata.role_id];
};

// Set authority
export const setAuthority = (authority, role_id = 0, remember = false, )=> {
    const serialize  = JSON.stringify({role_id});
    const role = CryptoJS.AES.encrypt(serialize,ROLE_AUTH);
    if (remember) {
        localStorage.setItem(TOKEN_KEY, authority);
        localStorage.setItem(ROLE_KEY,role);
    } else {
        sessionStorage.setItem(TOKEN_KEY, authority);
        sessionStorage.setItem(ROLE_KEY,role);
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
