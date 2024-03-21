import { SwapRightOutlined, WarningOutlined } from '@ant-design/icons';
import { Col, Modal, Row } from 'antd';
import BoutonPleinSecondaire from 'composants/bouton/boutonBase/BoutonPleinSecondaire';
import { StateMessage } from 'core/flow/StateMessage';
import { useAppDispatch, useAppSelector } from 'core/state/store.config';
import _ from 'core/util/extensionLodash';
import styled from 'styled-components';

const SDialogErreur = styled(Modal)`
    padding: 0;
    .ant-modal-content {
        border-radius: 6px;
        padding: 0;
        .ant-modal-body {
            padding: 0;
        }
        .ant-modal-footer {
            display: none;
        }
    }
`;

export const SDialogErreurEntete = styled(Col)`
    background-color: #333;
    color: orange;
    padding: 60px 10px;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    .icone {
        margin: auto;
        text-align: center;
        width: 70px;
        font-size: 70px;
        line-height: 30px;
        padding: 0;
    }
    .titre {
        margin: auto;
        font-weight: 400;
        font-size: 30px;
        text-align: center;
        .anticon svg {
            width: 36px;
        }
    }
`;

export const SDialogErreurCorps = styled(Col)`
    font-weight: 500;
    font-size: 18px;
    padding: 20px 20px 60px 20px;
    position: relative;
    .titre {
        color: orange;
        font-size: 24px;
        font-weight: 300;
    }
    .sousTitre {
        font-size: 18px;
    }
    .action {
        text-align: right;
    }
    .detail {
        font-size: 14px;
    }
`;

export const SDialogueErreurFooter = styled.div`
    text-align: right;
    position: absolute;
    bottom: 20px;
    right: 20px;
`;

const DialogueErreur = () => {
    const dispatch = useAppDispatch();
    const messageErreur = useAppSelector((state) => state.stateSession.messageErreur);

    const fermer = () => {
        dispatch(StateMessage.initialiser());
    };

    return (
        <SDialogErreur open={_.nonNul(messageErreur)} closable={false} width={600} zIndex={9999}>
            {messageErreur && (
                <Row>
                    <SDialogErreurEntete span="8">
                        <div className="icone">
                            <WarningOutlined />
                        </div>
                        <div className="titre">Erreur</div>
                    </SDialogErreurEntete>

                    <SDialogErreurCorps span="16">
                        <div>
                            <div className="titre">{messageErreur.titre}</div>
                            <div className="message">{messageErreur.sousTitre}</div>
                            {messageErreur.listeErreur.map((e) => (
                                <div className="detail" key={e}>
                                    <SwapRightOutlined /> {e}
                                </div>
                            ))}
                        </div>
                        <SDialogueErreurFooter>
                            <BoutonPleinSecondaire action={fermer} libelle="Fermer" />
                        </SDialogueErreurFooter>
                    </SDialogErreurCorps>
                </Row>
            )}
        </SDialogErreur>
    );
};
export default DialogueErreur;
