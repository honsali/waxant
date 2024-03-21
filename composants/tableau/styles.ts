import { Table, Tag } from 'antd';
import styled from 'styled-components';

export const STable = styled(Table)`
    .ant-table-thead {
        .ant-table-cell {
            background-color: #fdfdfa;
            padding: 5px 16px;
            text-transform: uppercase;
            font-weight: 600;
            font-size: 90%;
            color: #555;
            vertical-align: top;
        }
    }

    .ant-table-tbody {
        .ant-table-row {
            cursor: pointer;
            font-weight: 400;
            .visibleSiHover {
                color: transparent;
            }
            .ant-table-cell {
                &.colonneAction {
                    cursor: pointer;
                }
                vertical-align: top;
            }
            &.selectionne {
                .ant-table-cell {
                    background-color: colorPrimary;
                }
                .visibleSiHover {
                    color: colorPrimary;
                }
            }
            &:hover {
                .visibleSiHover {
                    color: #333;
                }
                &.selectionne {
                    cursor: default;
                    .ant-table-cell {
                        background-color: transparent;
                    }
                    .visibleSiHover {
                        color: colorPrimary;
                    }
                }
            }
            &.selectionne {
                color: colorPrimary;
                font-weight: bold;
                .visibleSiSelectionne {
                    color: colorPrimary;
                }
            }
        }
    }
`;

export const STag = styled(Tag)`
    color: colorPrimary;
    background: colorPrimary;
    &:hover {
        color: colorPrimary;
    }
`;
