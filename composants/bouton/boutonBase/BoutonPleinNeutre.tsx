import styled from 'styled-components';
import Bouton, { BoutonProps } from './Bouton';

export const Composant = styled(Bouton)`
    color: #aaa;
    background-color: #fff;
    border-color: #aaa;
    &:hover {
        color: #aaa;
        background-color: #fff;
        border-color: #aaa;
        cursor: not-allowed;
    }
`;

const BoutonPleinNeutre = (props: BoutonProps) => {
    return <Composant {...props} />;
};

export default BoutonPleinNeutre;
