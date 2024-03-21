export interface IReference {
    id?: string;
    code?: string;
    libelle?: string;
    description?: string;
    taux?: string;
    nomOuRaisonSociale?: string;
}

export interface IRequeteReference {
    reference: string;
    arg?: string;
}

export interface IListeReference {
    liste: IReference[];
    requete: IRequeteReference;
}
