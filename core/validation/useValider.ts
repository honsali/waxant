import { IMessageErreur } from 'core/flow/DomaineMessage';
import { StateMessage } from 'core/flow/StateMessage';
import i18n from 'core/i18n/i18n';

const useValider = (form, dispatch, action) => {
    form.validateFields()
        .then(() => {
            action();
        })
        .catch((errorInfo) => {
            const messageErreur: IMessageErreur = i18n.messageErreur({ code: 'error.validation.form' });
            messageErreur.listeErreur = errorInfo.errorFields.map((err) => {
                return err.errors[0];
            });
            if (dispatch) {
                dispatch(StateMessage.setMessageErreur(messageErreur));
            }
        });
};

export default useValider;
