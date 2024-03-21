import { Layout, notification } from 'antd';
import React, { useEffect, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router';

import Sablier from 'composants/conteneur/Sablier';
import DialogueErreur from 'composants/dialogue/DialogueErreur';
import messages from 'core/i18n/MappeurMessageInfo';
import { useAppSelector } from 'core/state/store.config';

import { APP } from 'config/constants.config';
import GlobalThemeProvider from 'core/layout/GlobalThemeProvider';
import { ContextePageProvider } from '../util/useContextePage';
import LayoutFooter from './LayoutFooter';
import LayoutHeader from './LayoutHeader';
import LayoutSidebar from './LayoutSidebar';

const Context = React.createContext({ name: 'Default' });
const LayoutGlobal = () => {
    const [api, contextHolder] = notification.useNotification();
    const actionSuccessMessage = useAppSelector((state) => state.stateSession.actionSuccessMessage);
    const { pathname } = useLocation();
    const contextValue = useMemo(() => ({ name: APP.NAME }), []);

    useEffect(() => {
        const message = messages.get(actionSuccessMessage);
        if (message) {
            api.success({
                message,
                placement: 'topRight',
            });
        }
    }, [actionSuccessMessage]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <GlobalThemeProvider>
            <Context.Provider value={contextValue}>
                <Sablier>
                    {contextHolder}
                    <Layout>
                        <LayoutSidebar />
                        <Layout style={{ marginLeft: '-30px', zIndex: '800' }}>
                            <LayoutHeader />
                            <ContextePageProvider>
                                <Outlet />
                            </ContextePageProvider>
                            <LayoutFooter />
                        </Layout>
                        <DialogueErreur />
                    </Layout>
                </Sablier>
            </Context.Provider>
        </GlobalThemeProvider>
    );
};

export default LayoutGlobal;
