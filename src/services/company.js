import request from '@/utils/request';

const RUTE_API = '/company';

// Create company
export async function companyCreate(body) {
    return request(`${RUTE_API}/create`, {
        method: 'POST',
        body,
    });
}

// Update company
export async function companyUpdate(body) {
    return request(`${RUTE_API}/update`, {
        method: 'PUT',
        body,
    });
}

// Delete company
export async function companyDelete(body) {
    return request(`${RUTE_API}/delete`, {
        method: 'DELETE',
        body,
    });
}
