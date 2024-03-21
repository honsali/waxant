import { mapMessage } from 'config/i18n/mapMessage';
import { ISuccessMessage } from 'core/flow/DomaineMessage';
import _ from 'core/util/extensionLodash';
import MappeurLibelle from './MappeurLibelle';

const templateMap = {
    'default.modifier': _.template('<%= typeLabel %> a été modifié avec Succès'),
    'default.creer': _.template('<%= typeLabel %>  a été créé avec Succès'),
    'default.supprimer': _.template('<%= typeLabel %> a été supprimée avec Succès'),
};

const get = (successMessage: ISuccessMessage): string | null => {
    if (_.estNul(successMessage?.key)) {
        return null;
    }

    const { key, type } = successMessage;
    const messageTypeKey = `${type}.${key}`;

    const message = mapMessage[messageTypeKey];
    if (_.nonNul(message)) {
        return message;
    }

    const compiledTemplate = templateMap[messageTypeKey] || templateMap[`default.${key}`];
    if (compiledTemplate) {
        return compiledTemplate({ key, type, typeLabel: MappeurLibelle.libelle(type) });
    }

    return null;
};

const MappeurMessageInfo = {
    get,
};

export default MappeurMessageInfo;
