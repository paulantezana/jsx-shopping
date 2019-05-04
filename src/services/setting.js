import request from '@/utils/request';

const RUTE_API = '/setting';

// User Login
export async function settingLoad(body) {
    return request(`${RUTE_API}/load`, {
        method: 'POST',
        body,
    });
}
