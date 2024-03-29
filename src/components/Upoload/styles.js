import styled, { css } from "styled-components";

export const dragActive = css`
  border-color: #78e5d5;
`;

export const dragReject = css`
  border-color: #e57878;
`;

export const DropContainer = styled.div.attrs({
  className: "dropzone",
})`
  border: 5px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;

  transition: height 0.2s ease;

  ${(props) => props.isDragActive && dragActive};
  ${(props) => props.isDragReject && dragReject};
`;

const messageColor = {
  default: "#999",
  error: "#e57878",
  sucess: "#78e5d5",
};

export const UploadMessage = styled.p`
  display: flex;
  color: ${(props) => messageColor[props.type || "default"]};
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;
