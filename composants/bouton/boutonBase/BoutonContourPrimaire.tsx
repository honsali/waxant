import styled from 'styled-components';
import Bouton, { BoutonProps } from './Bouton';
import BoutonContourNeutre from './BoutonContourNeutre';

const Composant = styled(Bouton)`
    color: ${(props) => props.theme.token.colorPrimary};
    background-color: #fff;
    border-color: ${(props) => props.theme.token.colorPrimary};
    &:hover {
        color: ${(props) => props.theme.token.colorWarning};
        background-color: #fff;
        border-color: ${(props) => props.theme.token.colorWarning};
    }
`;

const BoutonContourPrimaire = (props: BoutonProps) => {
    return props.inactif ? <BoutonContourNeutre {...props} /> : <Composant {...props} />;
};

export default BoutonContourPrimaire;
