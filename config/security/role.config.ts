export const ROLE_ADMIN = 'admin';
export const ROLE_USER = 'user';

const roleMap = {
    APP_ADMIN: ROLE_ADMIN,
    APP_USER: ROLE_USER,
};

export const RoleConfig = {
    roleMap,
    normaliser: (role) => roleMap[role],
};
