import { ConfigProvider } from 'antd';
import locale from 'antd/locale/fr_FR';
import dayjs from 'dayjs';

import 'assets/styles/default.css';
// eslint-disable-next-line no-unused-vars
import 'dayjs/locale/fr';
import StyledThemeProvider from './StyledThemeProvider';
dayjs.locale('fr');
const GlobalThemeProvider = ({ children }) => {
    const themeSetting = {
        colorPrimary: '#62b01e',
        colorLink: '#62b01e',
        colorSuccess: '#52c41a',
        colorWarning: '#faad14',
        colorError: '#f5222d',
        fontSize: 14,
        fontFamily: 'Roboto',
        colorTextHeading: 'rgba(0, 0, 0, 0.85)',
        colorTextBase: 'rgba(0, 0, 0, 0.65)',
        colorTextSecondary: 'rgba(0, 0, 0, 0.45)',
        colorTextDisabled: 'rgba(0, 0, 0, 0.7)',
        colorBgContainerDisabled: 'rgba(0, 0, 0, 0.03)',
        borderRadius: 2,
        colorBorder: '#d9d9d9',
    };

    return (
        <ConfigProvider theme={{ token: themeSetting }} locale={locale}>
            <StyledThemeProvider>{children}</StyledThemeProvider>
        </ConfigProvider>
    );
};

export default GlobalThemeProvider;
