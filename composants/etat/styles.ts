import { Col, Row, Tag } from 'antd';
import styled from 'styled-components';

export const SChamp = styled(Row)``;

export const SLibelle = styled(Col)`
    color: #aaa;
    font-weight: 700;
    font-size: 13px;
    padding: 12px 7px 3px 7px;
    border-bottom: 1px solid #eee;
`;

export const SValeur = styled(Col)`
    color: #444;
    font-weight: 500;
    font-size: 14px;
    text-align: left;
    white-space: break-spaces;
    padding: 10px 7px 3px 7px;
    border-bottom: 1px solid #eee;
`;

export const SValeurNoWrap = styled(Col)`
    color: #444;
    font-weight: 500;
    font-size: 14px;
    white-space: nowrap;
    padding: 10px 7px 3px 7px;
    border-bottom: 1px solid #eee;
`;

export const STitre = styled(Row)`
    padding: 5px 0 5px 10px;
    background-color: #fdfdfa;
    border-bottom: 1px solid ${(props) => `${props.theme.token.colorPrimary}4D`};
    color: ${(props) => props.theme.token.colorPrimary};
    font-weight: 700;
    font-size: 14px;
`;

export const STag = styled(Tag)`
    padding: 5px;
    font-size: 22px;
    margin: 5px 0 2px 20px;
    & span {
        white-space: break-spaces;
    }
`;
