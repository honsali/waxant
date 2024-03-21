import MappeurErreur from './MappeurErreur';
import MappeurLibelle from './MappeurLibelle';
import MappeurMessageInfo from './MappeurMessageInfo';

const i18n = {
    actionCtrl: MappeurLibelle.actionCtrl,
    libelle: MappeurLibelle.libelle,
    col: MappeurLibelle.col,
    action: MappeurLibelle.action,
    titre: MappeurLibelle.titre,
    messageErreur: MappeurErreur.get,
    messageInfo: MappeurMessageInfo.get,
};
export default i18n;
