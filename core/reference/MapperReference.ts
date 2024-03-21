import { IReference } from './DomaineReference';

const creerReference = (referentielRep: any, referenceName?: string): any => {
    const reference: any = {};
    reference.id = referentielRep.id;
    reference.code = referentielRep.code;
    reference.libelle = referentielRep.libelle;
    reference.description = referentielRep.description;
    return reference;
};

const creerListeReference = (listeReferentielRep: any[]): IReference[] => {
    const liste = [] as IReference[];
    listeReferentielRep.forEach((r) => {
        liste.push(creerReference(r));
    });
    return liste;
};

const MapperReference = {
    creerReference,
    creerListeReference,
};

export default MapperReference;
