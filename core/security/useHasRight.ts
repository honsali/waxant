import mapDroitAcces from 'config/security/mapDroitAcces';
import { useAppSelector } from 'core/state/store.config';
import _ from 'core/util/extensionLodash';
export default function useHasRight(action): boolean {
    const role = useAppSelector((state) => state.stateAuth.role);
    const inAll = _.includes(mapDroitAcces['ALL'], action);
    const inRole = _.includes(mapDroitAcces[role], action);
    const hr = inAll || inRole;
    if (!hr) {
        console.log('NO RIGHT FOR =========>' + action);
    }
    return hr;
}
