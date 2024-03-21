import _ from 'core/util/extensionLodash';
import { IReference, IRequeteReference } from './DomaineReference';
import MapperReference from './MapperReference';

const lister = async (requeteReference: IRequeteReference): Promise<IReference[]> => {
    let referencePromise: Promise<any[]> = null;
    return mapReference(referencePromise, requeteReference);
};

const mapReference = (referencePromise: Promise<any[]>, requeteReference?: IRequeteReference): Promise<IReference[]> => {
    return new Promise<IReference[]>((resolve) => {
        if (referencePromise === null) {
            resolve([] as IReference[]);
        }
        referencePromise.then((listeReferentielRep: any) => {
            const liste = _.isArray(listeReferentielRep.data) ? listeReferentielRep.data : listeReferentielRep;
            const listeReference = [] as IReference[];
            _.forEach(liste, (referentielRep) => {
                listeReference.push(MapperReference.creerReference(referentielRep, requeteReference?.reference));
            });
            resolve(listeReference);
        });
    });
};

const ServiceReference = {
    lister,
};

export default ServiceReference;
