import {
    brandCreate,
    brandUpdate,
    brandPaginate,
    brandDelete,
} from '@/services/brand';

import { Modal, message } from 'antd';
import { formatMessage } from 'umi/locale';

export default {
    namespace: 'brand',
    state: {
        data: {
            list: [],
            pagination: {},
        },
        searchText: '',

        modalVisible: false,
        currentItem: {},
        modalType: 'create',
    },

    effects: {
        *paginate({ payload }, { select, call, put }) {
            const response = yield call(brandPaginate, { ...payload });
            if (response.success) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        data: {
                            list: response.data,
                            pagination: {
                                current: response.current_page,
                                total: response.total,
                                pageSize: response.limit,
                            }
                        }
                    },
                });
            } else {
                Modal.error({ title: formatMessage({ id: 'app.result.error.api' }), content: response.message });
            }
        },
        *create({ payload }, { call, put }) {
            const response = yield call(brandCreate, payload);
            if (response.success) {
                yield put({ type: 'resetBrand' });
                Modal.success({ title: formatMessage({ id: 'app.result.success.api' }), content: response.message });
                yield put({ type: 'paginate' });
            } else {
                Modal.error({ title: formatMessage({ id: 'app.result.error.api' }), content: response.message });
            }
        },
        *update({ payload }, { call, put }) {
            const response = yield call(brandUpdate, payload);
            if (response.success) {
                yield put({ type: 'resetBrand' });
                message.success(response.message);
                yield put({ type: 'paginate' });
            } else {
                Modal.error({ title: formatMessage({ id: 'app.result.error.api' }), content: response.message });
            }
        },
        *delete({ payload }, { call, put }) {
            const response = yield call(brandDelete, payload);
            if (response.success) {
                yield put({ type: 'resetBrand', payload });
                message.success(response.message);
                yield put({ type: 'paginate' });
            } else {
                Modal.error({ title: formatMessage({ id: 'app.result.error.api' }), content: response.message });
            }
        },
    },

    reducers: {
        querySuccess(state, { payload }) {
            return { ...state, ...payload };
        },
        showModal(state, { payload }) {
            return { ...state, ...payload, modalVisible: true };
        },
        resetBrand(state, action) {
            return { ...state, currentItem: {}, modalVisible: false, modalType: 'create' };
        },
    },
};
