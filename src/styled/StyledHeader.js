import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { StyledNavLink } from "./StyledLinks";

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-around;
  height: 55px;
  background-color: #000000;
`;

export const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

export const StyledLogo = styled.img`
  display: inline-block;
  width: 8rem;
  height: 8rem;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
`;

export const StyledDropDownContent = styled.div`
  display: none;
  position: absolute;
  z-index: 1;
  border: 1px solid white;
  border-radius: 5px;
  top: 25px;
  left: 0;
  background-color: #000000;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  transition: .1s ease-in-out;
  padding: 12px 12px;

  &:hover {
    display: block;
  }
`;

export const StyledDropDown = styled.div`
  margin: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 16pt;
  color: white;
  position: relative;
  justify-content: center;
  gap: 0;
  cursor: pointer;

  &:hover ${StyledDropDownContent} {
    display: block;
  }
`;
