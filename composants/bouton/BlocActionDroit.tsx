import { Col, Row } from 'antd';
import styled from 'styled-components';

const Composant = styled(Row)`
    .ant-col {
        text-align: right;
        line-height: 0;
        .btn-wrapper {
            margin: 0 5px;
        }
        .btn-wrapper:first-child {
            margin: 0 5px 0 0;
        }
        .btn-wrapper:last-child {
            margin: 0 0 0 5px;
        }
        .btn-wrapper:only-child {
            margin: 0;
        }
    }
`;

const BlocActionDroit = ({ padding = null, style = {}, children }) => {
    return (
        <Composant align="top">
            <Col span={24} style={{ padding, ...style }}>
                {children}
            </Col>
        </Composant>
    );
};

export default BlocActionDroit;
