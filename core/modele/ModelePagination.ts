export interface ISort {
    unsorted?: boolean;
    sorted?: boolean;
    empty?: boolean;
}

export interface IPagination {
    pageCourante?: number;
    nombreLigneParPage?: number;
    nombreTotalDeLigne?: number;
}
