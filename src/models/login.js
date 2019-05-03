import { login } from '@/services/user';

import { routerRedux } from 'dva/router';
import { Modal } from 'antd';
import { destroy, setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
    namespace: 'login',
    state: {
        status: undefined,
    },

    effects: {
        *login({ payload }, { call, put }) {
            const response = yield call(login, payload);
            if (response.success) {
                // Almacenando la autorizacion
                setAuthority(
                    response.data,
                    payload.remember
                )
                reloadAuthorized(); // Recargando las authorizaciones

                // Redireccionando la ruta
                yield put(routerRedux.replace('/'));

                 // Message welcome
                 message.success(response.message);
            } else {
                Modal.error({ title: 'Login', content: response.message });
            }
        },
        *logout({ _ }, { put }) {
            yield destroy();
            reloadAuthorized();
            yield put(routerRedux.replace('/user/login'));
        },
    },

    reducers: {
        allSuccess(state, { payload }) {
            return { ...state, ...payload };
        },
    },
};
