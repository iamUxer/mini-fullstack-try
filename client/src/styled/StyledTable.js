import React from "react";
import styled from "styled-components";
import { Pagination, Table } from "antd";

const CustomTable = styled(Table)`
  & .ant-table {
    height: 234px;
    border-bottom: 1px solid #f0f0f0;
  }
  & .ant-pagination {
    display: flex;
    justify-content: center;
  }
`;

const StyledTable = ({ children, ...props }) => {
  return <CustomTable {...props}>{children}</CustomTable>;
};

export default StyledTable;
