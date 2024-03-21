import { mapActionCtrl } from 'config/i18n/mapActionCtrl';
import { mapActionUI } from 'config/i18n/mapActionUI';
import { mapLabel } from 'config/i18n/mapLabel';
import { mapTitre } from 'config/i18n/mapTitre';
import _ from 'core/util/extensionLodash';

const libelle = (key: string): string => {
    if (_.estNul(key)) {
        return '[]';
    }
    switch (key) {
        case '_vide':
            return '\xA0';
        case 'libelle':
            return 'Libelle';
        case 'code':
            return 'Code';
        default:
            if (key.startsWith('libelle')) {
                const filteredKey = key.charAt(7).toLowerCase() + key.slice(8);
                return mapLabel[filteredKey] || `[${filteredKey}]`;
            }
            return mapLabel[key] || `[${key}]`;
    }
};
const col = (key: string): string => (mapLabel['col_' + key] || '') + ' ';

const action = (key: string): string => {
    const keyBase = key.includes('.') ? key.substring(0, key.indexOf('.')) : key;
    return mapActionUI[key] || mapActionUI[keyBase] || libelle(key);
};

const titre = (key: string): string => {
    return mapTitre[key] || action(key);
};

const actionCtrl = (key: string): string => {
    if (_.estNul(key)) {
        return '[]';
    }

    return (
        mapActionCtrl[key] ||
        _.capitalize(
            key
                .split('/')
                .pop()
                .split(/(?=[A-Z])/)
                .join(' ')
        )
    );
};

const MappeurLibelle = {
    libelle,
    col,
    action,
    titre,
    actionCtrl,
};

export default MappeurLibelle;
