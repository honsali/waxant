import styled from 'styled-components';
import Bouton, { BoutonProps } from './Bouton';

const Composant = styled(Bouton)`
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

const BoutonContourNeutre = (props: BoutonProps) => {
    return <Composant {...props} />;
};

export default BoutonContourNeutre;
