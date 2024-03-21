import styled from 'styled-components';
import Bouton, { BoutonProps } from './Bouton';
import BoutonPleinNeutre from './BoutonPleinNeutre';

export const Composant = styled(Bouton)`
    color: #fff;
    background-color: ${(props) => props.theme.token.colorPrimary};
    border-color: ${(props) => props.theme.token.colorPrimary};
    &:hover {
        color: #fff;
        background-color: ${(props) => props.theme.token.colorWarning};
        border-color: ${(props) => props.theme.token.colorWarning};
    }
`;

const BoutonPleinPrimaire = (props: BoutonProps) => {
    return props.inactif ? <BoutonPleinNeutre {...props} /> : <Composant {...props} />;
};

export default BoutonPleinPrimaire;
