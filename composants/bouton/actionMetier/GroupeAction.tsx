import { DownOutlined, MoreOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown } from 'antd';
import BlocActionGauche from 'composants/bouton/BlocActionGauche';
import i18n from 'core/i18n/i18n';
import { createContext } from 'react';
import styled from 'styled-components';

const SBoutonIconeBloc = styled.div`
    .btn-wrapper {
        margin: 0 5px;
    }
`;

const TypeBouttonAction = createContext({});
export { TypeBouttonAction as TypeBouttonActionProvider };

const GroupeAction = ({ listeAction = null, type = 'page', nom = null, children = null }) => {
    const getContent = () => {
        if (type === 'tableau') {
            return <SBoutonIconeBloc>{children ? children : listeAction.map((a) => a)}</SBoutonIconeBloc>;
        } else if (type === 'menu') {
            const items: MenuProps['items'] = listeAction.map((a, i) => {
                return { key: i, label: a };
            });

            return (
                <Dropdown menu={{ items }} overlayClassName="actionListDansTableau">
                    <Button>
                        <MoreOutlined />
                    </Button>
                </Dropdown>
            );
        } else if (type === 'menuPage') {
            const listeItem = listeAction.map((a, i) => {
                return { key: i, label: a };
            });

            return (
                <span className="btn-wrapper">
                    <Dropdown.Button menu={listeItem} icon={<DownOutlined />}>
                        {i18n.action(nom)}
                    </Dropdown.Button>
                </span>
            );
        } else {
            return <BlocActionGauche padding="20px 0">{children ? children : listeAction.map((a) => a)}</BlocActionGauche>;
        }
    };

    return <TypeBouttonAction.Provider value={type}>{getContent()}</TypeBouttonAction.Provider>;
};
export default GroupeAction;
