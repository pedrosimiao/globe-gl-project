// src/components/GlobesNav/index.tsx

import { useState } from 'react';

import { PiGlobeStandDuotone, PiGlobeStandFill } from "react-icons/pi";


import { Nav, List, ListItem, StyledLink, HamburgerButton, Overlay } from './styles';

const GlobesNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <>
      <HamburgerButton onClick={toggleMenu}>
        {isOpen ? <PiGlobeStandFill /> : <PiGlobeStandDuotone />}
      </HamburgerButton>
      {isOpen && <Overlay onClick={toggleMenu} />}
      <Nav $isOpen={isOpen}>
        <List>
          <ListItem>
            <StyledLink to="/" onClick={handleLinkClick}>Submarine Cables</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/choropleth-countries" onClick={handleLinkClick}>
              Choropleth Countries
            </StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/hex-countries" onClick={handleLinkClick}>
              Hex Countries
            </StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/countries-population" onClick={handleLinkClick}>
              Countries Population
            </StyledLink>
          </ListItem>
        </List>
      </Nav>
    </>
  );
};

export default GlobesNav;

