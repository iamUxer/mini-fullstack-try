import React from "react";
import styled from "styled-components";
import { Pagination, Table } from "antd";

const CustomTable = styled(Table)`
  & .ant-table {
    height: 234px;
    border-bottom: 1px solid #f0f0f0;
    background: #fcfcfc;
    & .ant-table-container {
      background: white;
    }
    & .ant-table-row {
      cursor: default;
    }
  }
  & .ant-pagination {
    display: flex;
    justify-content: center;
  }
`;

export const CSTable = ({ children, ...props }) => {
  return <CustomTable {...props}>{children}</CustomTable>;
};
