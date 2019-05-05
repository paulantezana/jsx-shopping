import {
    userCreate,
    userUpdate,
    userResetPassword,
    userChangePassword,
    userPaginate,
    userDelete,
    userUploadAvatar,
    userById
} from '@/services/personal';

import { Modal, message } from 'antd';

export default {
    namespace: 'personal',
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
        *updateUserByID({ payload }, { call, put }) {
            const response = yield call(userById, { id: payload.id });
            if (response.success) {
                yield put({
                    type: 'showModal',
                    payload: {
                        currentItem: response.data,
                        modalType: 'update',
                    }
                });
                message.success(response.message);
            } else {
                Modal.error({ title: 'Error al consultar el usuario por id', content: response.message });
            }
        },
        *paginate({ payload }, { select, call, put }) {
            const response = yield call(userPaginate, { ...payload });
            if (response.success) {
                yield put({
                    type: 'allSuccess',
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
                Modal.error({ title: 'Error al consultar el Usuario', content: response.message });
            }
        },
        *create({ payload }, { call, put }) {
            const response = yield call(userCreate, payload);
            if (response.success) {
                yield put({ type: 'resetUser' });
                Modal.success({ title: 'Crear usuario', content: response.message });
                yield put({ type: 'all' });
            } else {
                Modal.error({ title: 'Error al crear usuario', content: response.message });
            }
        },
        *update({ payload }, { call, put }) {
            const response = yield call(userUpdate, payload);
            if (response.success) {
                yield put({ type: 'resetUser' });
                message.success(response.message);
                yield put({ type: 'all' });
            } else {
                Modal.error({ title: 'Error al actualizar usuario', content: response.message });
            }
        },
        *changePassword({ payload }, { call, put }) {
            const response = yield call(userChangePassword, payload);
            if (response.success) {
                message.success(response.message);
            } else {
                Modal.error({ title: 'Error al cambiar la contraseña del usuario', content: response.message });
            }
        },
        *resetPassword({ payload }, { call, put }) {
            const response = yield call(userResetPassword, payload);
            if (response.success) {
                message.success(response.message);
            } else {
                Modal.error({ title: 'Error al resetear la contraseña del usuario', content: response.message });
            }
        },
        *delete({ payload }, { call, put }) {
            const response = yield call(userDelete, payload);
            if (response.success) {
                yield put({ type: 'resetUser', payload });
                message.success('Se elimino el usuario con el id = ' + payload.id);
                yield put({ type: 'all' });
            } else {
                Modal.error({ title: 'Error al eliminar usuario', content: response.message });
            }
        },
        // *updateProfile({ payload }, { call, put }) {
        //     const response = yield call(userUpdate, payload);
        //     if (response.success) {
        //         yield put({ type: 'updateProfileSuccess', payload });
        //         message.success(response.message);
        //     } else {
        //         Modal.error({ title: 'Error al actualizar el perfil', content: response.message });
        //     }
        // },
        *uploadAvatar({ payload }, { call, put }) {
            let data = new FormData();
            data.append('avatar', payload.avatar);
            data.append('id', payload.id);
            const response = yield call(userUploadAvatar, data);
            if (response.success) {
                yield put({ type: 'resetUser' });
                Modal.success({ title: 'Subir avatar', content: response.message });
                yield put({ type: 'all' });
                location.reload();
            } else {
                Modal.error({ title: 'Error subir el avatar usuario', content: response.message });
            }
        },
    },

    reducers: {
        allSuccess(state, { payload }) {
            return { ...state, ...payload };
        },
        search(state, { payload }) {
            return { ...state, searchText: payload };
        },
        showModal(state, { payload }) {
            return { ...state, ...payload, modalVisible: true };
        },
        resetPersonal(state, action) {
            return { ...state, currentItem: {}, modalVisible: false, modalType: 'create' };
        },
        resetForgot(state, action) {
            return { ...state, forgotStep: 0, forgotID: 0 };
        },
    },
};
