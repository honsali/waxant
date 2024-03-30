import useI18n from '../i18n/useI18n';
import { IMessageErreur } from '../message/DomaineMessage';
import { MdlMessage } from '../message/MdlMessage';

const useValider = (form, dispatch, action) => {
    const i18n = useI18n();
    form.validateFields()
        .then(() => {
            action();
        })
        .catch((errorInfo) => {
            const messageErreur: IMessageErreur = i18n.erreur({ code: 'error.validation.form' });
            messageErreur.listeErreur = errorInfo.errorFields.map((err) => {
                return err.errors[0];
            });
            if (dispatch) {
                dispatch(MdlMessage.setInfoActionEchouee(messageErreur));
            }
        });
};

export default useValider;
