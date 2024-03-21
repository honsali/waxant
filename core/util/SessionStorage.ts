import { IUser } from 'core/security/DomaineAuth';
import _ from 'core/util/extensionLodash';

const storage: Storage = window.sessionStorage;
const storeObject = (key, object) => {
    storage.setItem(key, JSON.stringify(object));
};
const retrieveObject = (key) => {
    const item = '' + storage.getItem(key);
    return _.estNul(item) ? null : JSON.parse(item);
};

const AUTH_TOKEN = 'auth_token';
const AUTH_USER = 'auth_user';
const AUTH_USER_ROLE = 'auth_role';

const SessionStorage = {
    clear: (): void => {
        storage.clear();
    },
    getUser: (): IUser => {
        return retrieveObject(AUTH_USER);
    },
    setUser: (user: IUser) => {
        storeObject(AUTH_USER, user);
        storeObject(AUTH_TOKEN, user?.token);
    },
    getToken: (): string => {
        return retrieveObject(AUTH_TOKEN);
    },
    getRole: (): string => {
        return retrieveObject(AUTH_USER_ROLE);
    },
    setRole: (role: string) => {
        storeObject(AUTH_USER_ROLE, role);
    },
};

export default SessionStorage;
