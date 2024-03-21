import { AnyAction } from 'redux';

import { StateMessage } from 'core/flow/StateMessage';
import _ from 'core/util/extensionLodash';

function isRejectedAction(action: AnyAction) {
    return action && action.type && action.type.endsWith('/rejected');
}

function isPendingAction(action: AnyAction) {
    return action && action.type && action.type.endsWith('/pending');
}

function isFulfilledAction(action: AnyAction) {
    return action && action.type && action.type.endsWith('/fulfilled');
}

export const serializeError = (value: any) => {
    if (_.nonNul(value) && value.isAxiosError && value.response) {
        return { data: value.response.data, status: value.response.status };
    } else if (_.nonNul(value) && value.errorFields) {
        return {
            status: -1,
            data: {
                errors: value.errorFields.map((err) => {
                    return { libelle: err.errors[0] };
                }),
            },
        };
    }
    return { message: String(value) };
};
export const serviceOptions = {
    serializeError,
};

const notificationMiddelWare = (store) => (next) => (action) => {
    const { error, payload } = action;
    const items = _.split(action.type, '/');
    if (isPendingAction(action)) {
        store.dispatch(StateMessage.initialiser());
    } else if (isFulfilledAction(action)) {
        store.dispatch(StateMessage.setActionSuccessMessage({ key: items[1], type: items[0], data: payload }));
    }

    if (isRejectedAction(action) && error) {
        const err = error?.message === 'Rejected' ? payload : error;
        if (err.status) {
            switch (err.status) {
                case -1:
                    store.dispatch(StateMessage.setActionErrorMessage({ code: 'error.validation.form', listeErreur: err.data?.errors }));
                    break;
                case 0:
                    store.dispatch(StateMessage.setActionErrorMessage({ code: 'error.server.not.reachable' }));
                    break;
                case 400:
                    store.dispatch(StateMessage.setActionErrorMessage({ code: 'error.bad.request', erreur: err.data.code, listeErreur: err.data?.errors }));
                    break;
                case 404:
                    store.dispatch(StateMessage.setActionErrorMessage({ code: 'error.url.not.found' }));
                    break;
                case 500:
                    store.dispatch(StateMessage.setActionErrorMessage({ code: 'error.server.error' }));
                    break;
            }
        } else if (payload) {
            store.dispatch(StateMessage.setActionErrorMessage({ code: payload }));
        }
    }
    return next(action);
};

export default notificationMiddelWare;
