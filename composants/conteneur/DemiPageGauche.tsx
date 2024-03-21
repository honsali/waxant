import { Col, Row } from 'antd';
import ActionLienRetour from 'composants/bouton/actionMetier/ActionLienRetour';
import i18n from 'core/i18n/i18n';
import styled from 'styled-components';

const Composant = styled(Col)`
    padding: 20px 40px 80px 40px;
`;

const Retour = styled(Row)`
    .ant-btn {
        padding: 0;
    }
`;

const Entete = styled(Row)`
    align-items: center;
    border-bottom: ${(props) => `${props.theme.token.colorPrimary}99`};
    margin-bottom: 5px;
`;

const Titre = styled(Col)`
    flex: none;
    font-size: 30px;
    font-weight: 300;
    font-family: 'ROBOTO';
    text-transform: capitalize;
    color: ${(props) => props.theme.token.colorPrimary};
`;

const Action = styled(Col)`
    flex: auto;
    text-align: right;
`;

const DemiPageGauche = ({ titre, marge = '0px', blocAction = null, children }) => {
    return (
        <Composant span={12}>
            <Retour>
                <ActionLienRetour />
            </Retour>
            <Entete>
                <Titre>{i18n.titre(titre)}</Titre>
                <Action>{blocAction}</Action>
            </Entete>
            <Row style={{ padding: marge }}>
                <Col span={24}>{children}</Col>
            </Row>
        </Composant>
    );
};

export default DemiPageGauche;
