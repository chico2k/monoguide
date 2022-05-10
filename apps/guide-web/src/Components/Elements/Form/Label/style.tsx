import styled from '@emotion/styled';

export const Label = styled.label<any>`
  font-family: inherit;
  font-size: 0.8rem;
  margin-bottom: 0.4rem;
  color: ${({ theme }: any) => theme.colors.primary};
`;
