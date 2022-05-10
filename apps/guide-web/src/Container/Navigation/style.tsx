import styled from '@emotion/styled';
import { Theme } from '../../Components/Theme';

export const Container = styled.div`
  width: 95%;
  max-width: 1000px;
  margin: 0 auto;
`;

export const Header = styled.header`
  background: ${({ theme }: { theme?: Theme }) => theme.colors.primary};
  color: #ebebd3;
  padding: 2.3rem 0;
  position: relative;

  ::after {
    content: '';
    clear: both;
    display: block;
  }
`;

export const SiteNav = styled.nav<Props>`
  position: absolute;
  top: 100%;
  right: 0%;
  background: #464655;
  clip-path: circle(0px at top right);
  transition: clip-path ease-in-out 700ms;

  ${({ open }) =>
    open &&
    `
      clip-path: circle(250% at top right);
      `}

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    border-bottom: 1px solid #575766;

    :last-child {
      border-bottom: none;
    }
  }

  a {
    color: #fff;
    display: block;
    padding: 2em 4em 2em 1.5em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;

    :hover,
    :focus {
      background: ${({ theme }: { theme?: Theme }) => theme.colors.primary};
      color: #fff;
    }
  }
`;

export const SiteNavList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const SiteNavListElement = styled.li`
  border-bottom: 1px solid #575766;

  :last-child {
    border-bottom: none;
  }
`;

export const SiteNavListLink = styled.a`
  color: #ebebd3;
  display: block;
  padding: 2em 4em 2em 1.5em;
  text-transform: uppercase;
  text-decoration: none;

  :hover,
  :focus {
    background: #e4b363;
    color: #464655;
  }
`;

export const MenuToggle = styled.div`
  padding: 1em;
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  cursor: pointer;
`;

interface Props {
  open: boolean;
}
export const Hamburger = styled.div<Props>`
  &,
  ::before,
  ::after {
    content: '';
    display: block;
    background: #ebebd3;
    height: 3px;
    width: 1.75em;
    border-radius: 3px;
    transition: all ease-in-out 500ms;
  }

  ::before {
    transform: translateY(-6px);
  }

  ::after {
    transform: translateY(3px);
  }

  ${({ open }) =>
    open &&
    `

  transform: rotate(45deg);

  ::before {
    opacity: 0;
  }
  ::after {
    transform: translateY(-3px) rotate(-90deg);
  }
  `}
`;
