import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RoleConfig } from 'config/security/role.config';
import { IUser } from 'core/security/DomaineAuth';
import SessionStorage from 'core/util/SessionStorage';
import _ from 'core/util/extensionLodash';

const initialState = {
    user: {} as IUser,
    role: null as string,
    initialPage: null as string,
};

export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            const user = action.payload;
            const roleTrouve = _.some(user.roleList, (r) => {
                const roleNormalise = RoleConfig.normaliser(r);
                if (roleNormalise) {
                    state.role = roleNormalise;
                    SessionStorage.setRole(roleNormalise);
                    return true;
                }
                return false;
            });
            if (roleTrouve) {
                state.user = user;
                SessionStorage.setUser(user);
            } else {
                AuthSlice.caseReducers.logout(state);
            }
        },
        logout: (state) => {
            SessionStorage.clear();
            state.user = {} as IUser;
            state.role = null;
            state.initialPage = '/';
        },
    },
});

export const StateAuth = AuthSlice.actions;

export default AuthSlice.reducer;
