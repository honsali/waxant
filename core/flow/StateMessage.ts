import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import i18n from 'core/i18n/i18n';
import _ from 'core/util/extensionLodash';
import { IErreurGlobale, IMessageErreur, ISuccessMessage } from './DomaineMessage';

const initialState = {
    messageErreur: null as IMessageErreur,
    messageErreurDialogue: null as IMessageErreur,
    actionPending: null,
    actionEnCours: {},
    actionSuccessMessage: null as ISuccessMessage,
};

export const MessageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        initialiser: (state) => {
            return { ...initialState, actionEnCours: state.actionEnCours };
        },
        setActionEnCours: (state, action: PayloadAction<any>) => {
            let m = state.actionEnCours[action.payload.rid];
            if (!m) {
                m = [];
            }
            m.push(action.payload.libelle);
            state.actionEnCours[action.payload.rid] = m;
        },
        finAction: (state, action: PayloadAction<string>) => {
            state.actionEnCours = _.omit(state.actionEnCours, [action.payload]);
        },
        setActionSuccessMessage: (state, action: PayloadAction<ISuccessMessage>) => {
            state.actionSuccessMessage = action.payload;
        },
        setActionErrorMessage: (state, action: PayloadAction<IErreurGlobale>) => {
            state.messageErreur = i18n.messageErreur(action.payload);
        },
        setMessageErreur: (state, action: PayloadAction<IMessageErreur>) => {
            state.messageErreur = action.payload;
        },
        setMessageErreurDialogue: (state, action: PayloadAction<IMessageErreur>) => {
            state.messageErreurDialogue = action.payload;
        },
    },
});

export const StateMessage = MessageSlice.actions;

export default MessageSlice.reducer;
