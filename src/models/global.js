import { settingLoad } from '@/services/setting';

import { userUpdate } from '@/services/user';
import { Modal, message } from 'antd';
import { getAuthorityUser, getAuthorityRole } from '@/utils/authority';

export default {
    namespace: 'global',
    state: {
        notices: [],
        collapsed: false,

        setting: {},
        company: {},
        user: {},

        success: false,
    },

    effects: {
        *setup({ payload }, { call, put, all }) {
            const response = yield call(settingLoad);
            if (response.success) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        user: response.data.user,
                        company: response.data.company,
                        setting: response.data.setting,
                    },
                });
            } else {
                Modal.error({ title: 'Error al actualizar el perfil', content: response.message });
            }
        }, 
    },

    reducers: {
        changeLayoutCollapsed(state, { payload }) {
            return { ...state, collapsed: payload };
        },
        // updateProfileSuccess(state, action) {
        //     return { ...state, user: Object.assign({}, state.user, action.payload) };
        // },
        // updateSettingSuccess(state, action) {
        //     return { ...state, setting: Object.assign({}, state.setting, action.payload) };
        // },
        // updateProgramSuccess(state, action) {
        //     return { ...state, program: Object.assign({}, state.program, action.payload) };
        // },
        querySuccess(state, { payload }) {
            return { ...state, ...payload };
        },
        // setSubsidiary(state, { payload }) {
        //     return { ...state, subsidiary: {...state.subsidiary, id: payload.id } };
        // },
    },
};
