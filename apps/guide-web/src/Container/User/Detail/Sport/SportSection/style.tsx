import styled from '@emotion/styled';
import { Theme } from '../../../../../Components/Theme';

export const SportWrapper = styled.div`
  margin: 2rem auto;
  background-color: #f2f2f2;
  font-size: 1.2rem;
  padding: 2rem 1rem;
  border-radius: 0.6rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.5rem;

  h2 {
    grid-column: 1 / 2;
    color: ${({ theme }: { theme?: Theme }) => theme.colors.primary};
    text-transform: uppercase;
    letter-spacing: 3px;
    margin: 0 0 2rem 0;
  }

  button {
    grid-column: 3 / -1;
    margin: 0.8rem;
  }
`;

export const SportTagContainer = styled.div`
  color: white;
  background-color: white;
  padding: 0.5rem;
  border-radius: 0.6rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 0.7rem 1rem;
  background-color: #fff;

  h3 {
    color: black;
    grid-column: 1 / 1;
    margin: 0;
    text-transform: uppercase;
  }
  span {
    grid-column: 2 / -1;
    color: ${({ theme }: { theme?: Theme }) => theme.colors.primary};
  }

  button:first-of-type {
    margin-top: 1rem;
    padding: 0.4rem;
    font-size: 1rem;
    grid-column: 1 / 2;
  }

  button {
    margin-top: 1rem;
    padding: 0.4rem;
    font-size: 1rem;
    grid-column: 2 / -1;
  }
`;
