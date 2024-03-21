import { DeleteFilled } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import i18n from 'core/i18n/i18n';
import ActionCritique from '../actionBase/ActionCritique';

const ActionSupprimer = ({ typeEntite, action }) => {
    return (
        <Popconfirm title={i18n.libelle('confirmer.supprimer.' + typeEntite)} onConfirm={action} okText="Confirmer" cancelText="Annuler">
            <ActionCritique nom={'supprimer.' + typeEntite} icone={<DeleteFilled />} action={action} />
        </Popconfirm>
    );
};

export default ActionSupprimer;
