import request from '@/utils/request';

const USER_API = '/user';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function queryNotices() {
  return request('/api/notices');
}




// User Login
export async function login(body) {
    return request(`/public${USER_API}/login`, {
        method: 'POST',
        body,
    });
}

// User forgout search email
export async function userForgotSearch(body) {
    return request(`/public${USER_API}/forgot/search`, {
        method: 'POST',
        body,
    });
}

// User forgout validate key change password
export async function userForgotValidate(body) {
    return request(`/public${USER_API}/forgot/validate`, {
        method: 'POST',
        body,
    });
}

// User forgout change password
export async function userForgotChange(body) {
    return request(`/public${USER_API}/forgot/change`, {
        method: 'POST',
        body,
    });
}