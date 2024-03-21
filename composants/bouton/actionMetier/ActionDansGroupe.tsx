import ActionPrincipale from 'composants/bouton/actionBase/ActionNormale';
import BoutonIcone from 'composants/bouton/boutonBase/BoutonIcone';
import { useContext } from 'react';
import { TypeBouttonActionProvider } from './GroupeAction';

const ActionDansGroupe = (props) => {
    const type = useContext(TypeBouttonActionProvider);

    if (type === 'tableau') {
        return <BoutonIcone {...props} />;
    } else if (type === 'menu' || type === 'menuPage') {
        return <ActionPrincipale {...props} type="noBorder" />;
    } else {
        return <ActionPrincipale {...props} />;
    }
};
export default ActionDansGroupe;
