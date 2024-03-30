import Bouton, { BoutonProps } from './Bouton';
import BoutonContourNeutre from './BoutonContourNeutre';
import { ConfigProvider, theme } from 'antd';

const BoutonContourPrimaire = (props: BoutonProps) => {
    const { token } = theme.useToken();
    const components = {
        Button: {
            defaultColor: token.colorPrimary,
            defaultBg: '#fff',
            defaultBorderColor: token.colorPrimary,
            defaultHoverColor: token.colorWarning,
            defaultHoverBg: '#fff',
            defaultHoverBorderColor: token.colorWarning,
        },
    };
    if (props.inactif) {
        return <BoutonContourNeutre {...props} />;
    }
    return (
        <ConfigProvider theme={{ components }}>
            <Bouton {...props} />
        </ConfigProvider>
    );
};

export default BoutonContourPrimaire;
