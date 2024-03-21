import { Tag, theme } from 'antd';
import styled from 'styled-components';

const PlaqueEtat = ({ entite }) => {
    const {
        token: { colorWarning },
    } = theme.useToken();

    const Composant = styled(Tag)`
        color: #fff;
        border: none;
        background: ${colorWarning};
    `;

    return <Composant>{entite?.etat?.code}</Composant>;
};

export default PlaqueEtat;
