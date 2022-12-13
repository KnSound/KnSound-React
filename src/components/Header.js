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
} from "../styled/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { RiPlayListFill } from "react-icons/ri";
import { MdLogout } from "react-icons/md"
import { IoMdArrowDropdown } from "react-icons/io"
import { CiSettings } from "react-icons/ci";

const Header = () => {
  const { userInfo } = useSelector((state) => state.user)
  const dispatch = useDispatch()

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
                {userInfo?.username} <IoMdArrowDropdown/>
                <StyledDropDownContent>
                  <StyledNavLink to='/user-profile'><BsPerson/>Profile</StyledNavLink>
                  <StyledNavLink to='/playlists'><RiPlayListFill/>Playlists</StyledNavLink>
                  <StyledNavLink to='#'><AiOutlineHeart/>Likes</StyledNavLink>
                  <hr/>
                  <StyledNavLink to='/settings'>
                    <CiSettings/>Settings
                  </StyledNavLink>
                  <StyledNavLink onClick={() => dispatch(userLogout())}>
                    <MdLogout/>Logout
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
