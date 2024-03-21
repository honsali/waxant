import { mapErreur } from 'config/i18n/mapErreur';
import { IErreurGlobale, IErreurSimple, IMessageErreur } from 'core/flow/DomaineMessage';

const mapErreurGlobale = {
    'error.bad.request': ['Données Invalides', 'Veuillez corriger les erreurs suivantes:'],
    'error.validation.form': ['Données Invalides', 'Veuillez corriger les erreurs suivantes:'],
    'error.server.not.reachable': ['Problème technique', 'Le serveur ne répond pas, veuillez contacter votre administrateur'],
    'error.url.not.found': ['Problème technique', 'Ressource introuvable, veuillez contacter votre administrateur'],
    'error.server.error': ['Problème technique', 'Erreur Serveur, veuillez contacter votre administrateur'],
};

const trouverLibelleErreur = ({ code, args, libelle }: IErreurSimple): string => {
    if (args?.length) {
        for (const arg of args) {
            const l = mapErreur[`${code}@${arg}`];
            if (l) {
                return l;
            }
        }
    }
    return libelle || mapErreur[code] || code;
};

const get = ({ code, listeErreurSimple, erreur }: IErreurGlobale): IMessageErreur => {
    const e = mapErreurGlobale[code];
    if (e) {
        const messageErreur: IMessageErreur = { titre: e[0], sousTitre: e[1], listeErreur: [] };
        if (listeErreurSimple?.length) {
            messageErreur.listeErreur = listeErreurSimple.map(trouverLibelleErreur);
        }
        if (erreur) {
            const erreurTexte = mapErreur[erreur] || `[${erreur}]`;
            messageErreur.listeErreur.push(erreurTexte);
        }
        return messageErreur;
    }
    return { titre: 'ERROR', sousTitre: JSON.stringify({ code, listeErreurSimple, erreur }), listeErreur: [] };
};
const MappeurErreur = {
    get,
};

export default MappeurErreur;
