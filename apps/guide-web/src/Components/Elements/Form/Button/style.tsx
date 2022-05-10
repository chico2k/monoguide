import styled from '@emotion/styled';

export const Button = styled.button<any>`
  background-color: ${({ theme }: any) => theme.colors.primary};
  color: #fff;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  align-items: center;
  display: block;
  padding: 1.5rem 3rem;

  :hover {
    background-color: ${({ theme }: any) => theme.colors.primaryDark};
  }
`;
