import request from '@/utils/request';

const RUTE_API = '/product';

// Create product
export async function productPaginate(body) {
    return request(`${RUTE_API}/paginate`, {
        method: 'POST',
        body,
    });
}

// Create product
export async function productCreate(body) {
    return request(`${RUTE_API}/create`, {
        method: 'POST',
        body,
    });
}

// Update product
export async function productUpdate(body) {
    return request(`${RUTE_API}/update`, {
        method: 'PUT',
        body,
    });
}

// Delete product
export async function productDelete(body) {
    return request(`${RUTE_API}/delete`, {
        method: 'DELETE',
        body,
    });
}
