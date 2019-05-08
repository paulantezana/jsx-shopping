import request from '@/utils/request';

const RUTE_API = '/brand';

// Create brand
export async function brandPaginate(body) {
    return request(`${RUTE_API}/paginate`, {
        method: 'POST',
        body,
    });
}

// Create brand
export async function brandCreate(body) {
    return request(`${RUTE_API}/create`, {
        method: 'POST',
        body,
    });
}

// Update brand
export async function brandUpdate(body) {
    return request(`${RUTE_API}/update`, {
        method: 'PUT',
        body,
    });
}

// Delete brand
export async function brandDelete(body) {
    return request(`${RUTE_API}/delete`, {
        method: 'DELETE',
        body,
    });
}
