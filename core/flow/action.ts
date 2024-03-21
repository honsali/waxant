import { createAsyncThunk } from '@reduxjs/toolkit';
import { StateMessage } from 'core/flow/StateMessage';
import i18n from 'core/i18n/i18n';
import { IRequete, IResultat } from 'core/modele/ModeleGlobal';
import _ from 'core/util/extensionLodash';
import { serializeError } from './notificationMiddleWare';

const action = <Req extends IRequete, Res extends IResultat>(operation, actionName) => {
    return createAsyncThunk(actionName, async (requete: Req, thunkAPI) => {
        const rid = requete.rid ? requete.rid : _.uniqueId();
        const libelle = i18n.actionCtrl(actionName);
        const x = { rid, libelle: libelle + '  ...' };
        await thunkAPI.dispatch(StateMessage.setActionEnCours(x));
        const resultat = { rid } as Res;
        try {
            await operation({ rid, ...requete }, resultat, thunkAPI);
        } catch (err) {
            await thunkAPI.dispatch(StateMessage.finAction(rid));
            return thunkAPI.rejectWithValue(serializeError(err));
        }
        await thunkAPI.dispatch(StateMessage.finAction(rid));
        return resultat;
    });
};

export default action;
