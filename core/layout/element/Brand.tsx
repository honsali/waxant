import { Col, Row } from 'antd';
import styled from 'styled-components';

const SBrand = styled(Row)`
    background-color: #444;
    position: relative;
    z-index: 600;
`;

const Logo = styled(Col)`
    margin: 16px 8px 8px 20px;
    cursor: pointer;
    img {
        height: 36px;
    }
`;

const Title = styled(Col)`
    margin-top: 18px;
`;

const NoTitle = styled(Col)`
    margin: 2px 8px 0 10px;
`;

const Brand = ({ opened, toggle }) => {
    return (
        <SBrand>
            <Logo>Logo</Logo>
            {opened ? <Title>TITLE</Title> : <NoTitle />}
        </SBrand>
    );
};

export default Brand;
