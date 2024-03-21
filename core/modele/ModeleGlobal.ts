import _ from 'core/util/extensionLodash';

export interface IModele {
    uid?: string;
}
export interface IEntite {
    uid?: string;
}

export interface IRequete {
    uid?: string;
    rid?: string;
}

export interface IResultat {
    uid?: string;
    rid?: string;
    initCreation?: string;
    initModification?: string;
    initConsultation?: string;
    creation?: string;
    modification?: string;
    annulation?: string;
}

const creerRequete = (setRid, params = null) => {
    const uid = _.uniqueId();
    setRid(uid);
    return { rid: uid, ...params };
};
export default creerRequete;
