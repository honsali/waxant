import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Col, Grid, Layout, Row } from 'antd';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Brand from './element/Brand';
import Menu from './element/Menu';

const SSider = styled(Layout.Sider)`
    background: #404040 !important;
    height: 100%;
`;

const SeparateurGradient = styled.div`
    background: linear-gradient(#333, #404040);
    height: 97px;
    text-align: center;
    padding-top: 34px;
    position: relative;
    z-index: 300;
`;

const Toggle = styled(Col)`
    z-index: 999;
    .anticon {
        font-size: 18px;
        color: #aaa;
        margin: 22px 0 0 10px;
        &:hover {
            color: #777;
        }
    }
`;

const AppName = styled.div`
    z-index: 100;
    position: fixed;
    bottom: 0px;
    .title {
        text-align: center;
        width: 250px;
        font-weight: bold;
        font-size: 18px;
        background-color: #f50;
        color: #fff;
        padding: 8px 0px;
    }
`;

const LayoutSidebar = () => {
    const [opened, setOpened] = useState(true);
    const [collapsed, setCollapsed] = useState(false);
    const [oldCollapsed, setOldCollapsed] = useState(false);

    const { useBreakpoint } = Grid;
    const screens = useBreakpoint();
    useEffect(() => {
        if (screens['md'] === false) {
            setOldCollapsed(collapsed);
            setOpened(false);
            setCollapsed(true);
        } else if (collapsed !== oldCollapsed) {
            setCollapsed(oldCollapsed);
            setTimeout(function () {
                setOpened(!oldCollapsed);
            }, 200);
            setCollapsed(oldCollapsed);
        }
    }, [screens]);

    const toggle = () => {
        if (collapsed) {
            setTimeout(function () {
                setOpened(collapsed);
            }, 200);
        } else {
            setOpened(collapsed);
        }
        setCollapsed(!collapsed);
        setOldCollapsed(!collapsed);
    };

    return (
        <Row>
            <Col>
                <SSider collapsible collapsed={collapsed} width={250} trigger={null}>
                    <Brand opened={opened} toggle={toggle} />
                    <SeparateurGradient></SeparateurGradient>
                    <Menu />
                    <AppName>
                        <div className="title">GESTION</div>
                    </AppName>
                </SSider>
            </Col>
            <Toggle>{opened ? <MenuFoldOutlined onClick={toggle} /> : <MenuUnfoldOutlined onClick={toggle} />}</Toggle>
        </Row>
    );
};

export default LayoutSidebar;
