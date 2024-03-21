import { Popover } from 'antd';
import BlocActionDroit from 'composants/bouton/BlocActionDroit';
import ActionForte from 'composants/bouton/actionBase/ActionForte';
import BoutonContourPrimaire from 'composants/bouton/boutonBase/BoutonContourPrimaire';
import BoutonPleinSecondaire from 'composants/bouton/boutonBase/BoutonPleinSecondaire';
import i18n from 'core/i18n/i18n';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { EnumTypeAction } from '../bouton/EnumTypeAction';
import ActionImportante from '../bouton/actionBase/ActionImportante';

const Composant = styled(Popover)``;

const SEntete = styled.div`
    background-color: ${(props) => props.theme.token.colorPrimary};
    padding: 5px 10px;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
`;

const SCorp = styled.div`
    padding: 10px 20px 20px;
    font-weight: bold;
`;
const PopupConfirmation = ({ nom, libelle = null, icone = null, entete = null, actionConfirmer, rid = null, inactif = false, widthBoutonAction = null, typeAction = EnumTypeAction.FORTE }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (_.estNul(rid)) {
            setVisible(false);
        }
    }, [rid]);

    const annuler = () => {
        setVisible(false);
    };

    const confirmer = () => {
        setVisible(true);
    };

    const getContent = () => {
        return (
            <div>
                <SEntete>
                    {icone} &nbsp;
                    {libelle || i18n.titre(nom)}
                </SEntete>
                <SCorp>{entete}</SCorp>
                <BlocActionDroit padding="10px">
                    {_.estNul(rid) && <BoutonContourPrimaire nom="annuler" action={annuler} />}
                    <BoutonPleinSecondaire nom="confirmer" action={actionConfirmer} rid={rid} />
                </BlocActionDroit>
            </div>
        );
    };

    return (
        <Composant open={visible} content={getContent()} trigger="click" overlayInnerStyle={{ padding: 0 }}>
            {typeAction === EnumTypeAction.FORTE && <ActionForte width={widthBoutonAction} nom={nom} icone={icone} rid={visible ? '1' : null} action={confirmer} inactif={inactif} />}
            {typeAction === EnumTypeAction.IMPORTANTE && <ActionImportante width={widthBoutonAction} nom={nom} icone={icone} rid={visible ? '1' : null} action={confirmer} inactif={inactif} />}
        </Composant>
    );
};

export default PopupConfirmation;
