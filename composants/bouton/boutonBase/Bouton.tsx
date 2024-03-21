import { Button, Tooltip } from 'antd';
import i18n from 'core/i18n/i18n';

export type BoutonProps = {
    nom?: string | null;
    contexte?: string;
    action?: () => void | null;
    libelle?: string | null;
    icone?: React.ReactNode | null;
    inactif?: boolean;
    visible?: boolean;
    rid?: string | null;
    toolTip?: string | null;
    width?: number | string | null;
    className?: string | null;
};

const Bouton = ({ nom = null, contexte = '', action = null, libelle = null, icone = null, inactif = false, visible = true, rid = null, toolTip = null, width = null, className = '' }: BoutonProps) => {
    if (visible) {
        return (
            <Tooltip placement="top" title={toolTip}>
                <Button //
                    id={`bouton_${contexte}_${nom}`}
                    onClick={inactif ? null : action}
                    icon={icone}
                    loading={rid !== null}
                    className={className}
                    style={{ fontWeight: 500, width }}
                >
                    {libelle ? libelle : i18n.action(nom)}
                </Button>
            </Tooltip>
        );
    }
};

export default Bouton;
