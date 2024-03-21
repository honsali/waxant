import _ from 'core/util/extensionLodash';
import { useCallback } from 'react';

const Vide = ({ si = true, siNul = null, siIdNul = null, style = null, children }) => {
    const getElement = useCallback(() => {
        const a = _.estVide(siNul);
        const b = _.sansId(siIdNul);
        return si && a && b ? <div></div> : <div style={style}>{children}</div>;
    }, [si, siNul, siIdNul, children]);

    return <>{getElement()}</>;
};

export default Vide;
