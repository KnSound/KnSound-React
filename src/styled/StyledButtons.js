import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: transparent;
  border: 2px solid #fdfdfd;
  border-radius: 6px;
  color: #ffffff;
  cursor: pointer;
  font-size: 15pt;
  font-weight: 600;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 100%;
  will-change: transform;


  &:disabled {
    pointer-events: none;
  }

  &:hover {
    color: #fff;
    background-color: #1A1A1A;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;
