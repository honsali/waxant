import { useKeycloak } from '@react-keycloak/web';
import { Avatar, Button, Popover } from 'antd';
import i18n from 'core/i18n/i18n';
import { StateAuth } from 'core/security/StateAuth';
import { useAppDispatch, useAppSelector } from 'core/state/store.config';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const SAvatar = styled(Avatar)`
    background-color: #fcfcfc;
    border-radius: 6px;
    color: ${(props) => props.theme.token.colorPrimary};
    border: 1px solid ${(props) => props.theme.token.colorPrimary};
    padding: 0;
    cursor: pointer;
    &:hover {
        background-color: ${(props) => props.theme.token.colorPrimary};
        color: #fefefe;
    }
`;
const BoutonLogout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.stateAuth.user);
    const role = useAppSelector((state) => state.stateAuth.role);
    const { keycloak } = useKeycloak();
    const logout = () => {
        navigate('/');
        keycloak.logout();
        dispatch(StateAuth.logout());
    };

    const initials = useMemo(() => {
        if (!user.username) {
            return '';
        }
        return user.username
            .split('.')
            .map((name) => name.charAt(0).toUpperCase())
            .join(' ');
    }, [user.username]);

    return (
        <Popover
            content={
                <div>
                    <div>{user.username}</div>
                    <div>{i18n.libelle(role)}</div>
                    <div>
                        <Button onClick={logout}>Déconnexion</Button>
                    </div>
                </div>
            }
            title="Informations Compte"
            trigger="hover"
            placement="bottomRight"
        >
            <SAvatar size={40}>{initials}</SAvatar>
        </Popover>
    );
};

export default BoutonLogout;
