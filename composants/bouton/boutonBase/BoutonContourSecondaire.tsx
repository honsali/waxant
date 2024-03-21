import styled from 'styled-components';
import Bouton, { BoutonProps } from './Bouton';
import BoutonContourNeutre from './BoutonContourNeutre';

const Composant = styled(Bouton)`
    color: ${(props) => props.theme.token.colorWarning};
    background-color: #fff;
    border-color: ${(props) => props.theme.token.colorWarning};
    &:hover {
        color: #fff;
        background-color: ${(props) => props.theme.token.colorWarning};
        border-color: ${(props) => props.theme.token.colorWarning};
    }
`;

const BoutonContourSecondaire = (props: BoutonProps) => {
    return props.inactif ? <BoutonContourNeutre {...props} /> : <Composant {...props} />;
};

export default BoutonContourSecondaire;
