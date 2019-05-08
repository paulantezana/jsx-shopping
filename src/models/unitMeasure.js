import {
    unitMeasureCreate,
    unitMeasureUpdate,
    unitMeasurePaginate,
    unitMeasureDelete,
} from '@/services/unitMeasure';

import { Modal, message } from 'antd';
import { formatMessage } from 'umi/locale';

export default {
    namespace: 'unitMeasure',
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
            const response = yield call(unitMeasurePaginate, { ...payload });
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
            const response = yield call(unitMeasureCreate, payload);
            if (response.success) {
                yield put({ type: 'resetunitMeasure' });
                Modal.success({ title: formatMessage({ id: 'app.result.success.api' }), content: response.message });
                yield put({ type: 'paginate' });
            } else {
                Modal.error({ title: formatMessage({ id: 'app.result.error.api' }), content: response.message });
            }
        },
        *update({ payload }, { call, put }) {
            const response = yield call(unitMeasureUpdate, payload);
            if (response.success) {
                yield put({ type: 'resetunitMeasure' });
                message.success(response.message);
                yield put({ type: 'paginate' });
            } else {
                Modal.error({ title: formatMessage({ id: 'app.result.error.api' }), content: response.message });
            }
        },
        *delete({ payload }, { call, put }) {
            const response = yield call(unitMeasureDelete, payload);
            if (response.success) {
                yield put({ type: 'resetunitMeasure', payload });
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
        resetunitMeasure(state, action) {
            return { ...state, currentItem: {}, modalVisible: false, modalType: 'create' };
        },
    },
};
