import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Nav = styled.nav<{ $isOpen: boolean }>`
  position: absolute;
  top: 40px;
  left: 40px;
  background-color: rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 10px rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 10px 20px;
  z-index: 1000;
  /* display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')}; */
  flex-direction: column;
  transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-150%)')};
  transition: transform 0.3s ease;

  @media (max-width: 1024px) {
    position: fixed;
    padding: 4px 8px;
    max-width: 60%;
  }
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled.li`
  margin: 10px 0;
  padding: 8px;

  @media (max-width: 1024px) {
    margin: 4px 0;
    padding: 4px;
  }
`;

export const StyledLink = styled(Link)`
  color: white;
  font-size: 16px;
  font-family: monospace;
  text-decoration: none;

  &:hover {
    font-weight: bold;
  }

  &:focus {
    padding: 8px;
    color: black;
    background-color: white;
    border-radius: 8px;
  }

  @media (max-width: 1024px) {
    font-size: 14px;
  }
`;

export const HamburgerButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  background: none;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
  z-index: 1100;

  @media (min-width: 768px) {
    font-size: 40px;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 900;
`;
