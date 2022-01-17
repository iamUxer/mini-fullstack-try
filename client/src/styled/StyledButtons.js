import styled from "styled-components";
import { Button } from "antd";

export const CSWrapButton = styled.div`
  display: flex;
  justify-content: ${(props) => props.align};
  align-items: center;
`;

export const CSBasicButton = styled(Button)`
  &.ant-btn-sm {
    line-height: 12px;
    font-size: 12px;
  }
  float: ${(props) => props.float};
`;
