import React, { useState } from 'react';
import styled from 'styled-components';
import { icons } from '../assets';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 20px;
  background-color: ${({ theme }) => theme.colors.white};
`;
const Logo = styled.a`
  width: 80%;
  height: 100%;
  text-align: center;

  img {
    width: 100%;
    max-width: 300px;
    margin-bottom: 0;
  }
`;
const Nav = styled.div`
  width: 100%;
  margin-top: 20px;
  background: linear-gradient(to right, #f4f3f3 0%, #dfdfdf 50%, #f4f3f3 100%);
  color: #595959;

  a {
    color: #595959;
    font-size: 0.85rem;
    font-weight: 700;
    text-decoration: none;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 10px 20px;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);
    border: 1px solid #707070;
    position: absolute;
    z-index: 1;
    opacity: ${(props) => (props.open ? 1 : 0)};
    visibility: ${(props) => (props.open ? 'visible' : 'hidden')};
    pointer-events: ${(props) => (props.open ? 'all' : 'none')};
    will-change: opacity, visibility;
    transition: opacity 0.3s ease-out, visibility 0.3s ease-out;
    z-index: 99;

    li {
      margin: 0;
    }
    a {
      font-weight: 400;

      &:hover {
        @media (hover: hover) {
          text-decoration: underline;
        }
      }
    }
  }
`;
const NavItem = styled.div`
  display: inline-block;
  padding: 5px 20px;

  p {
    margin-bottom: 0;
    font-size: 1.5em;
    font-weight: 700;

    @media (max-width: 762px) {
      font-size: 0.85rem;
    }
  }
  span {
    width: 0;
    height: 0;
    padding-bottom: 2px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #595959;
    margin-left: 5px;
    display: inline-block;
  }
`;
const Breadcrumb = styled.div`
  width: 100%;
  padding: 10px 20px 12px;
  line-height: 1.1;

  a {
    color: #31b4cf;
    font-size: 0.75rem;
    text-decoration: none;

    &:hover {
      @media (hover: hover) {
        text-decoration: underline;
      }
    }
  }
  span {
    font-size: 0.6rem;
    color: #636363;
    padding: 0 5px;
  }
`;

const Header = ({ copy, isDesktop, lang }) => {
  const { domain, locale, url, headerLinks } = copy;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const title = copy.title[lang];

  return (
    <Wrapper>
      <Logo href={domain} title="Lenstore">
        <img src={icons[`lenstore${locale}`]} alt="Lenstore" />
      </Logo>
      <Nav open={dropdownOpen}>
        <NavItem
          onMouseOver={() => setDropdownOpen(true)}
          onMouseOut={() => setDropdownOpen(false)}
        >
          {isDesktop ? (
            <a href={headerLinks[0].url} title={headerLinks[0].label}>
              {headerLinks[0].label}
              <span />
            </a>
          ) : (
            <p>
              {headerLinks[0].label}
              <span />
            </p>
          )}
        </NavItem>
        <ul
          onMouseOver={() => setDropdownOpen(true)}
          onMouseOut={() => setDropdownOpen(false)}
        >
          {!isDesktop && (
            <li>
              <a href={headerLinks[0].url} title={headerLinks[0].label}>
                {headerLinks[0].label}
              </a>
            </li>
          )}
          {headerLinks.slice(1).map((link) => (
            <li key={link.url}>
              <a href={link.url} title={link.label}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </Nav>
      <Breadcrumb>
        <a href={domain} title="Lenstore">
          Home
        </a>
        <span>&gt;</span>
        <a href={headerLinks[0].url} title={headerLinks[0].label}>
          {headerLinks[0].label}
        </a>
        <span>&gt;</span>
        <a href={url} title={title}>
          {copy.breadcrumb[lang]}
        </a>
      </Breadcrumb>
    </Wrapper>
  );
};

export default Header;
