import useHasRight from 'core/security/useHasRight';
import BoutonPleinSecondaire from '../boutonBase/BoutonPleinSecondaire';

const ActionCritique = (props) => {
    const hasRight = useHasRight(props.nom);
    return <BoutonPleinSecondaire {...props} visible={hasRight} />;
};

export default ActionCritique;
