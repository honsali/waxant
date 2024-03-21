import { CalendarOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Row, Space } from 'antd';
import i18n from 'core/i18n/i18n';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { useAppSelector } from '../state/store.config';

const SHeader = styled(Row)`
    box-shadow: 0px 2px 2px #e0e0e0;
    background: #f8f8f4;
    padding: 12px 50px 12px 50px;
    z-index: 5;
`;

const LayoutHeader = () => {
    const role = useAppSelector((state) => state.stateAuth.role);

    return (
        <SHeader align="middle">
            <Col flex="auto">
                <Space>
                    <CalendarOutlined />
                    <code>{dayjs().format('dddd, D MMMM YYYY')}</code>
                </Space>
            </Col>
            <Col flex="none">
                <Space>
                    <UserOutlined />
                    <code>{i18n.libelle(role)}</code>
                </Space>
            </Col>
        </SHeader>
    );
};

export default LayoutHeader;
