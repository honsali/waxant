import { Tag, theme } from 'antd';
import styled from 'styled-components';

const Plaque = ({ type = null, style = null, couleur = null, action = null, children }) => {
    const {
        token: { colorPrimary, colorWarning },
    } = theme.useToken();

    const Composant = styled(Tag)`
        color: #fff;
        border: none;
        &.principale {
            background: ${colorPrimary};
            &:hover {
                background: ${colorPrimary};
            }
        }
        &.secondaire {
            background: ${colorWarning};
            &:hover {
                background: ${colorWarning};
            }
        }
        &.clickable {
            cursor: pointer;
        }
    `;

    const getClassName = () => {
        return (type ? type : 'principale') + (action ? ' clickable' : '');
    };
    const getStyle = () => {
        if (couleur) {
            return style ? { ...style, backgroundColor: couleur } : { backgroundColor: couleur };
        }
        return style;
    };
    const actionOnClick = (event) => {
        if (action) {
            event.preventDefault();
            event.stopPropagation();
            action();
        }
    };

    return (
        <Composant style={getStyle()} className={getClassName()} onClick={actionOnClick}>
            {children}
        </Composant>
    );
};

export default Plaque;
