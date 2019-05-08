import request from '@/utils/request';

const RUTE_API = '/category';

// Get all categories
export async function categoryPaginate(body) {
    return request(`${RUTE_API}/paginate`, {
        method: 'POST',
        body,
    });
}

// Get all categories
export async function categoryAll(body) {
    return request(`${RUTE_API}/all`, {
        method: 'POST',
        body,
    });
}

// Create categories
export async function categoryCreate(body) {
    return request(`${RUTE_API}/create`, {
        method: 'POST',
        body,
    });
}

// Get ByID categories
export async function categoryById(body) {
    return request(`${RUTE_API}/by/id`, {
        method: 'POST',
        body,
    });
}


// Update categories
export async function categoryUpdate(body) {
    return request(`${RUTE_API}/update`, {
        method: 'PUT',
        body,
    });
}

// Delete categories
export async function categoryDelete(body) {
    return request(`${RUTE_API}/delete`, {
        method: 'DELETE',
        body,
    });
}