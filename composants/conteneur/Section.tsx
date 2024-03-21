import { Col, Row } from 'antd';
import ActionLienRetour from 'composants/bouton/actionMetier/ActionLienRetour';
import { APP } from 'config/constants.config';
import i18n from 'core/i18n/i18n';
import styled from 'styled-components';

const Composant = styled.div`
    padding: 20px 20px 80px 40px;
`;
const Retour = styled(Col)`
    .ant-btn {
        padding: 0;
    }
`;

const Titre = styled(Col)`
    font-size: 30px;
    font-weight: 300;
    font-family: 'ROBOTO';
    text-transform: capitalize;
    color: #777;
    padding: 5px 5px 10px 0;
    white-space: nowrap;
`;

const Section = ({ titre = null, libelle = null, marge = '0px', blocAction = null, actionRetour = null, children }) => {
    document.title = APP.NAME + ' ' + (titre ? i18n.titre(titre) : '');

    return (
        <Composant>
            {actionRetour && (
                <Row>
                    <Retour span={24}>
                        <ActionLienRetour action={actionRetour} />
                    </Retour>
                </Row>
            )}
            <Row>
                <Titre flex="none">{libelle || i18n.titre(titre)}</Titre>
                <Col flex="auto">
                    <div>{blocAction}</div>
                </Col>
            </Row>
            <Row style={{ padding: marge }}>
                <Col span={24}>
                    <div>{children}</div>
                </Col>
            </Row>
        </Composant>
    );
};

export default Section;
