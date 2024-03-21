import { useAppSelector } from 'core/state/store.config';
import _ from 'core/util/extensionLodash';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';

const SMenu = styled.div`
    height: calc(100vh);
    position: relative;
    z-index: 500;

    .ant-menu {
        background: #404040;

        .ant-menu-item {
            background: #404040;
            margin: 0;
            width: 100%;
            .ant-menu-title-content {
                padding-top: 4px;
            }
            .carre {
                fill: #aaa;
                height: 5px;
                width: 5px;
                margin: 0 0 0 4px;
            }
        }

        .ant-menu-submenu-arrow {
            display: none;
        }

        .ant-menu-item.ant-menu-item-selected {
            background-color: #333 !important;
            color: ${(props) => props.theme.token.colorPrimary};
            font-weight: bold;
            .anticon svg {
                stroke-width: 3px;
                fill: ${(props) => props.theme.token.colorPrimary} !important;
                stroke: ${(props) => props.theme.token.colorPrimary};
            }
        }

        .ant-menu-item.ant-menu-item-active {
            background-color: rgba(${(props) => props.theme.token.colorPrimary}, 0.4) !important;
        }

        .ant-menu-item.ant-menu-item-active.ant-menu-item-selected {
            background-color: #333 !important;
        }
        .ant-menu.ant-menu-inline-collapsed > .ant-menu-item .ant-menu-item-icon,
        .ant-menu.ant-menu-inline-collapsed > .ant-menu-submenu .ant-menu-item-icon {
            margin-top: 2px;
            font-size: 26px;
        }

        .ant-menu.ant-menu-inline-collapsed > .ant-menu-item,
        .ant-menu.ant-menu-inline-collapsed > .ant-menu-submenu > .ant-menu-submenu-title {
            border-radius: 4px;
            margin: 16px 24px 16px 20px;
            padding: 0 0 0 5px !important;
        }

        .ant-menu.ant-menu-sub.ant-menu-inline > .ant-menu-item {
            background-color: #3a3a3a;
        }
    }
`;

const menuMap = { instruction: 'ficheEtude', ficheEtude: 'ficheEtude', rapport: 'transaction', simulation: 'transaction', offre: 'transaction', procedure: 'judiciaire', phase: 'judiciaire', jugement: 'judiciaire', audience: 'judiciaire' };
const Menu = () => {
    const role = useAppSelector((state) => state.stateAuth.role);
    const [selectedKeys, setSelectedKeys] = useState(['/']);
    const location = useLocation();
    const [menu, setMenu] = useState(null);
    useEffect(() => {
        const pp = _.split(location.pathname, '/');
        let sk = menuMap[pp[1]] ? menuMap[pp[1]] : pp[1];
        if (pp.length > 3) {
            if (pp[3] === 'sousDossier') {
                sk = menuMap[pp[5]] ? menuMap[pp[5]] : pp[5];
            } else {
                sk = menuMap[pp[3]] ? menuMap[pp[3]] : pp[3];
            }
        }
        setSelectedKeys(new Array('/' + sk));
    }, [location]);

    useEffect(() => {
        if (role) {
            const importComponent = async () => {
                const module = await import('domaines/' + role + '/menu.tsx');
                const CurrentMenu = module.default;
                setMenu(<CurrentMenu selectedKeys={selectedKeys} />);
            };

            importComponent();
        }
    }, [role, selectedKeys]);

    return <SMenu>{menu}</SMenu>;
};
export default Menu;
