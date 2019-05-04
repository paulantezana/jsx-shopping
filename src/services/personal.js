import request from '@/utils/request';

const RUTE_API = '/personal';

// Update user
export async function userResetPassword(body) {
    return request(`${RUTE_API}/reset/password`, {
        method: 'POST',
        body,
    });
}

// Update user
export async function userChangePassword(body) {
    return request(`${RUTE_API}/change/password`, {
        method: 'POST',
        body,
    });
}

// POST upload avatar
export async function userUploadAvatar(body) {
    return request(`${RUTE_API}/upload/avatar`, {
        method: 'POST',
        body,
    });
}

// Get all users
export async function userPaginate(body) {
    return request(`${RUTE_API}/paginate`, {
        method: 'POST',
        body,
    });
}

// Get userSearch users
export async function userSearch(body) {
    return request(`${RUTE_API}/search`, {
        method: 'POST',
        body,
    });
}

// Get ByID user
export async function userById(body) {
    return request(`${RUTE_API}/by/id`, {
        method: 'POST',
        body,
    });
}

// Create user
export async function userCreate(body) {
    return request(`${RUTE_API}/create`, {
        method: 'POST',
        body,
    });
}

// Update user
export async function userUpdate(body) {
    return request(`${RUTE_API}/update`, {
        method: 'PUT',
        body,
    });
}

// Delete user
export async function userDelete(body) {
    return request(`${RUTE_API}/delete`, {
        method: 'DELETE',
        body,
    });
}
