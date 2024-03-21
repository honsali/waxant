import { Layout } from 'antd';
import styled from 'styled-components';

export const SFooter = styled(Layout.Footer)`
    position: absolute;
    bottom: 0;
    left: 250px;
    right: 0;
    text-align: center;
    background-color: #e9e9e9 !important;
    color: #999 !important;
    font-weight: 700;
    font-family: 'ROBOTO';
    padding: 10px 0;
`;

const LayoutFooter = () => {
    return <SFooter>&copy; 2022 Wafa Assurance</SFooter>;
};

export default LayoutFooter;
