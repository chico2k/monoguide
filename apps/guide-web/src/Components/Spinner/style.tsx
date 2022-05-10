import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const ani = keyframes` 
    0% {
      transform: rotate(0deg);
    }
    100% {
       transform: rotate(360deg)
    }
  `;

export const SpinnerComp = styled.div`
  margin-top: 16px;
  border-top: 10px solid ${({ theme }: any) => theme.colors.primary};
  border-right: 10px solid rgba(136, 136, 136, 0.2);
  border-bottom: 10px solid rgba(136, 136, 136, 0.2);
  border-left: 10px solid rgba(136, 136, 136, 0.2);
  animation: ${ani} 0.9s linear infinite;
  border-radius: 50%;
  width: 64px;
  height: 64px;
`;
