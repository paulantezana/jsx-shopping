import {
    categoryPaginate,
    categoryAll,
    categoryCreate,
    categoryUpdate,
    categoryDelete,
} from '@/services/category';
import { Modal, message } from 'antd';
import { formatMessage } from 'umi/locale';
import { tree } from '@/utils/utils';

export default {
    namespace: 'category',
    state: {
        data: {
            list: [],
            pagination: {},
        },
        tree: [],
        treeSelect: [],

        modalVisible: false,
        currentItem: {},
        modalType: 'create',
    },
    effects: {
        *paginate({ payload }, { call, put }) {
            const response = yield call(categoryPaginate, { ...payload });
            if (response.success) {
                const newList = tree(response.data);
                yield put({
                    type: 'querySuccess',
                    payload: {
                        data: {
                            list: newList,
                            pagination: {
                                current: response.current_page,
                                total: response.total,
                                pageSize: response.limit,
                            },
                        },
                    },
                });
            } else {
                Modal.error({ title: formatMessage({ id: 'app.result.error.api' }), content: response.message });
            }
        },
        *tree({ payload }, { call, put }) {
            const response = yield call(categoryAll);
            if (response.success) {
                const newList = tree(response.data,0, payload.tree);
                let treeData = [];
                switch (payload.tree) {
                    case 'tree':
                        treeData = [{
                            title: 'Todo',
                            value: 0,
                            key: 0,
                            children: newList,
                        }];
                        break;
                    default:
                        treeData = newList;
                        break;
                }
                yield put({
                    type: 'querySuccess',
                    payload: { tree: treeData},
                });
            } else {
                Modal.error({ title: formatMessage({ id: 'app.result.error.api' }), content: response.message });
            }
        },
        *treeSelect({ payload }, { call, put }) {
            const response = yield call(categoryAll);
            if (response.success) {
                const newList = tree(response.data,0, 'treeSelect');
                yield put({
                    type: 'querySuccess',
                    payload: payload.parent === true ? { treeSelect: [{
                        title: 'Padre',
                        value: '0',
                        key: '0',
                        children: newList,
                    }]} : { treeSelect: newList },
                });
            } else {
                Modal.error({ title: formatMessage({ id: 'app.result.error.api' }), content: response.message });
            }
        },
        *create({ payload }, { call, put }) {
            const response = yield call(categoryCreate, {...payload, parent_id: parseInt(payload.parent_id)});
            if (response.success) {
                yield put({ type: 'resetcategory' });
                Modal.success({ title: formatMessage({ id: 'app.result.success.api' }), content: response.message });
                yield put({ type: 'paginate' });
            } else {
                Modal.error({ title: formatMessage({ id: 'app.result.error.api' }), content: response.message });
            }
        },
        *update({ payload }, { call, put }) {
            const response = yield call(categoryUpdate, {...payload, parent_id: parseInt(payload.parent_id)});
            if (response.success) {
                yield put({ type: 'resetcategory' });
                message.success(response.message);
                yield put({ type: 'paginate' });
            } else {
                Modal.error({ title: formatMessage({ id: 'app.result.error.api' }), content: response.message });
            }
        },
        *delete({ payload }, { call, put }) {
            const response = yield call(categoryDelete, payload);
            if (response.success) {
                yield put({ type: 'resetcategory' });
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
        resetcategory(state, action) {
            return { ...state, currentItem: {}, modalVisible: false, modalType: 'create' };
        },
    },
};
