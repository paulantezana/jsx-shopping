import request from '@/utils/request';

const RUTE_API = '/unitmeasure';

// Create unitMeasure
export async function unitMeasurePaginate(body) {
    return request(`${RUTE_API}/paginate`, {
        method: 'POST',
        body,
    });
}

// Create unitMeasure
export async function unitMeasureCreate(body) {
    return request(`${RUTE_API}/create`, {
        method: 'POST',
        body,
    });
}

// Update unitMeasure
export async function unitMeasureUpdate(body) {
    return request(`${RUTE_API}/update`, {
        method: 'PUT',
        body,
    });
}

// Delete unitMeasure
export async function unitMeasureDelete(body) {
    return request(`${RUTE_API}/delete`, {
        method: 'DELETE',
        body,
    });
}
