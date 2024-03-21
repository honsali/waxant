import dayjs from 'dayjs';
import * as _ from 'lodash';

declare module 'lodash' {
    interface LoDashStatic {
        removeNonSerialisable<T>(input: T): T;
        nonVide(objet): boolean;
        estVide(objet): boolean;
        nonNul(objet): boolean;
        estNul(objet): boolean;
        sansId(objet): boolean;
        fresh(objet, uid): boolean;
        contient(objet, champ): boolean;
        sommer(tableau): number;
        sommerPar(tableau, champ): number;
        supprimerChampVide(objet): any;
        equalIgnoreCase(s1, s2): any;
    }
}

namespace LoDash {
    export function removeNonSerialisable<T extends object>(obj: T): Partial<T> {
        const resultat: Partial<T> = {};
        Object.entries(obj).forEach(([key, value]) => {
            if (!(value instanceof dayjs)) {
                resultat[key] = _.isPlainObject(value) ? removeNonSerialisable(value) : value;
            }
        });
        return resultat;
    }

    export function nonVide(objet): boolean {
        return nonNul(objet) && !_.isEmpty(objet);
    }

    export function estVide(objet): boolean {
        return estNul(objet) || _.isEmpty(objet);
    }

    export function nonNul(objet): boolean {
        return !_.isNil(objet) && objet !== 'null' && objet !== 'undefined';
    }

    export function estNul(objet): boolean {
        return _.isNil(objet) || objet === 'null' || objet === 'undefined';
    }

    export function sansId(objet): boolean {
        return estVide(objet) || estNul(objet.id);
    }
    export function fresh(objet, uid): boolean {
        return objet?.uid === uid;
    }
    export function equalIgnoreCase(s1, s2): boolean {
        return s1?.toUpperCase() === s2?.toUpperCase();
    }

    export function supprimerChampVide(objet): any {
        const filter = _.overEvery([_.isNil, _.isEmpty]);
        return _.omitBy(objet, filter);
    }
    export function sommer(tableau): number {
        return _.reduce(
            tableau,
            function (sum, n) {
                return +n ? sum + n : sum;
            },
            null
        );
    }
    export function sommerPar(tableau, champ): number {
        return _.reduce(
            tableau,
            function (sum, o) {
                return o && o[champ] ? sum + o[champ] : sum;
            },
            null
        );
    }
    export function contient(objet, champ): boolean {
        return _.get(objet, champ);
    }
}

_.mixin(
    Object.keys(LoDash).reduce((object, key) => {
        object[key] = LoDash[key];
        return object;
    }, Object.create(null))
);

export default _;
