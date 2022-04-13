import styled from 'styled-components';

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 10;
`;

export const PlaceholderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(237, 237, 237);

  /* Match the size of Instagram's iframe */
  width: calc(100% - 2px);
  max-width: 540px;
  min-width: 326px;
  min-height: 454px;
`;

export const Info = styled.p`
  color: rgb(128, 128, 128);
  font-size: 14px;
`;

export const Error = styled.p`
  color: rgb(255, 62, 81);
  font-size: 14px;
  margin-top: 4px;
`;

export const StyledFormControl = styled.div`
  margin-bottom: 10px;
`;

export const StyledToggleLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 15px;
  color: #505050;
`;
