import { Col, Row } from 'antd';
import styled from 'styled-components';

export const SFiltre = styled.div`
    margin-bottom: 10px;
    padding: 5px;
    border: 1px solid #e0e0e0;
    background-color: #fff;
    .anticon-close {
        padding: 3px;
        border-radius: 3px;
    }
    &:hover {
        .anticon-close {
            color: white;
            background-color: ${(props) => props.theme.token.colorPrimary};
        }
    }
`;

export const SNomFiltre = styled(Col)`
    color: #bbb;
    font-weight: 700;
    font-size: 12px;
`;

export const SValeurFiltre = styled(Col)`
    color: #444;
    font-weight: 500;
    font-size: 14px;
`;

export const SFermerFiltre = styled(Col)``;

export const SEntete = styled(Row)`
    border-bottom: 1px solid ${(props) => props.theme.token.colorPrimary};
    background-color: #fefefe;
    cursor: pointer;
    padding: 5px;
    color: ${(props) => props.theme.token.colorPrimary};
    font-weight: 700;
    font-size: 14px;
    .anticon-edit {
        padding: 3px;
        border-radius: 3px;
    }
    &:hover {
        .anticon-edit {
            color: white;
            background-color: ${(props) => props.theme.token.colorPrimary};
        }
    }
`;

export const SPanneau = styled.div`
    border-radius: 3px;
    border: 1px solid #eee;
    background-color: #f6f6f6;
    cursor: pointer;
    margin: 10px;
`;

export const SCorps = styled.div`
    padding: 10px;
    cursor: pointer;
`;

export const SMiniForm = styled.span`
    .ant-form-item {
        margin-bottom: 10px;
    }
`;
