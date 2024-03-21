import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from 'config/security/keyloak.config';
import LayoutGlobal from 'core/layout/LayoutGlobal';
import { IUser } from 'core/security/DomaineAuth';
import { StateAuth } from 'core/security/StateAuth';
import { useAppDispatch, useAppSelector } from 'core/state/store.config';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PageNotFound from './error.404';

const AppRoutes = () => {
    const role = useAppSelector((state) => state.stateAuth.role);
    const dispatch = useAppDispatch();

    const [route, setRoute] = useState(null);

    useEffect(() => {
        if (role) {
            const importComponent = async () => {
                const module = await import('domaines/' + role + '/routes.tsx');
                const currentRoute = module.default;
                setRoute(currentRoute);
            };
            importComponent();
        }
    }, [role]);

    const onTokens = async (b) => {
        const x = JSON.parse(atob(b.token.split('.')[1]));
        const returnedUser: IUser = {
            username: x.preferred_username,
            roleList: x.realm_access.roles,
            token: b.token,
            expiryTime: x.exp,
            creationTime: Date.now().toString(),
        };
        dispatch(StateAuth.setUser(returnedUser));
    };

    return (
        <ReactKeycloakProvider initOptions={{ onLoad: 'login-required', checkLoginIframe: false }} authClient={keycloak} onTokens={onTokens}>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <LayoutGlobal />
                            </PrivateRoute>
                        }
                    >
                        {route?.map((r) => r)}
                        <Route path="*" element={<PageNotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ReactKeycloakProvider>
    );
};
export default AppRoutes;
