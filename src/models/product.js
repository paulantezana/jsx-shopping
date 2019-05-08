import {
    productCreate,
    productUpdate,
    productPaginate,
    productDelete,
} from '@/services/product';

import { Modal, message } from 'antd';
import { formatMessage } from 'umi/locale';

export default {
    namespace: 'product',
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
            const response = yield call(productPaginate, { ...payload });
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
            const response = yield call(productCreate, payload);
            if (response.success) {
                yield put({ type: 'resetproduct' });
                Modal.success({ title: formatMessage({ id: 'app.result.success.api' }), content: response.message });
                yield put({ type: 'paginate' });
            } else {
                Modal.error({ title: formatMessage({ id: 'app.result.error.api' }), content: response.message });
            }
        },
        *update({ payload }, { call, put }) {
            const response = yield call(productUpdate, payload);
            if (response.success) {
                yield put({ type: 'resetproduct' });
                message.success(response.message);
                yield put({ type: 'paginate' });
            } else {
                Modal.error({ title: formatMessage({ id: 'app.result.error.api' }), content: response.message });
            }
        },
        *delete({ payload }, { call, put }) {
            const response = yield call(productDelete, payload);
            if (response.success) {
                yield put({ type: 'resetproduct', payload });
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
        resetproduct(state, action) {
            return { ...state, currentItem: {}, modalVisible: false, modalType: 'create' };
        },
    },
};
