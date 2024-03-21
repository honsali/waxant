import { PlusCircleFilled } from '@ant-design/icons';
import ActionForte from '../actionBase/ActionForte';

const ActionAjouter = ({ action, typeEntite, visible = true }) => {
    return <ActionForte nom={'ajouter.' + typeEntite} icone={<PlusCircleFilled />} action={action} visible={visible} />;
};

export default ActionAjouter;
