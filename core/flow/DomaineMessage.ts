export interface IErreurGlobale {
    code?: string;
    erreur?: string;
    listeErreurSimple?: IErreurSimple[];
}

export interface IErreurSimple {
    code?: string;
    severity?: string;
    params?: [];
    args?: [];
    data?: any;
    libelle?: string;
}
export interface IMessageErreur {
    titre?: string;
    sousTitre?: string;
    listeErreur?: string[];
}

export interface ISuccessMessage {
    key: string;
    id?: number;
    name?: string;
    data?: any;
    type?: string;
}

export interface IAction {
    preAction?: Function;
    postAction?: Function;
}
