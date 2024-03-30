import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
// eslint-disable-next-line no-unused-vars
import 'dayjs/locale/fr';
import StyledThemeProvider from './StyledThemeProvider';

const GlobalThemeProvider = ({ children, theme, locale }) => {
    dayjs.locale(locale);
    return (
        <ConfigProvider theme={theme} locale={locale}>
            <StyledThemeProvider>{children}</StyledThemeProvider>
        </ConfigProvider>
    );
};

export default GlobalThemeProvider;
