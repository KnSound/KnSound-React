import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, userLogout } from "../redux/user/userActions";
import {
  Logo,
  StyledButton,
  StyledNav,
  StyledLogo,
  StyledHeader,
  StyledNavLink,
  StyledDropDown,
  StyledDropDownContent
} from "./styled/styles";

import styled from "styled-components";

const Header = () => {
  const { userInfo } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const [isDropdownActive, setDropdownState] = useState(false);
  useEffect(() => {
    dispatch(getUserDetails())
  }, [])

  return (
    <StyledHeader>
      <StyledNav>
        <StyledNavLink to='/'><StyledLogo src={Logo}/></StyledNavLink>
      </StyledNav>

      <StyledNav>
        { userInfo ? (
          <>
            <StyledDropDown to='/user-profile'>
              <>
                {userInfo?.username}
                <StyledDropDownContent>
                  <StyledNavLink to='/user-profile'>Profile</StyledNavLink>
                    <hr/>
                  <StyledNavLink onClick={() => dispatch(userLogout())}>
                    Logout
                  </StyledNavLink>
                </StyledDropDownContent>
              </>
            </StyledDropDown>

          </>
        ) : (
          <>
            <StyledNavLink to='/register'>Register</StyledNavLink>
            <StyledNavLink to='/login'>Login</StyledNavLink>
          </>
        )}
      </StyledNav>
    </StyledHeader>
  )
}

export default Header
