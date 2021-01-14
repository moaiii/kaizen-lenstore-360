import React from 'react';
import styled from 'styled-components';
import { icons } from '../assets';

const Wrapper = styled.div`
  padding: 20px 20px 50px 20px;
  color: #707070;
  background-color: #e2f0f5;
`;
const InnerWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ul {
    list-style-type: none;
    margin: 0;
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    li {
      margin: 0 10px;
      line-height: 1.2;
    }
    a {
      color: #707070;
      font-size: 1.3em;
      font-weight: 700;
      text-decoration: none;

      &:hover {
        @media (hover: hover) {
          text-decoration: underline;
        }
      }
    }
  }
  p {
    font-size: 1.2em;
    line-height: 1.2;
    margin-bottom: 10px;
    text-align: center;
  }
`;
const AlternateLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
  text-align: center;

  @media (max-width: 620px) {
    flex-wrap: wrap;
  }
  span {
    font-size: 1.4em;
    line-height: 1.1;
    margin-right: 5px;
  }
  ul {
    margin: 0;

    @media (max-width: 620px) {
      width: 100%;
      margin-top: 5px;
    }
  }
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px !important;

    a {
      margin-left: 8px;
    }
    &:before {
      content: '';
      width: 7px;
      height: 1px;
      background-color: #707070;
    }
    @media (max-width: 620px) {
      &:first-of-type:before {
        display: none;
      }
    }
  }
`;
const Logo = styled.a`
  display: flex;
  width: 300px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;

  &:hover {
    @media (hover: hover) {
      transform: scale(1.02);
    }
  }

  img {
    margin-bottom: 0;
    width: 100%;
    height: intrinsic;
  }
`;

const Footer = ({ copy }) => (
  <Wrapper>
    <InnerWrapper>
      <Logo href={copy.domain}>
        <img src={icons[`lenstore${copy.locale}`]} alt="Lenstore" />
      </Logo>
      <ul>
        {copy.footerLinks.row1.map((link) => (
          <li key={link.url}>
            <a href={link.url} title={link.label}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <ul>
        {copy.footerLinks.row2.map((link) => (
          <li key={link.url}>
            <a href={link.url} title={link.label}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <AlternateLinks>
        <span>{copy.title}</span>
        <ul>
          {Object.keys(copy.baseUrl)
            .filter((key) => key !== copy.locale)
            .map((key, i) => (
              <li key={key}>
                <a
                  href={copy.baseUrl[key]}
                  title={copy.languages[copy.locale][i]}
                >
                  {copy.languages[copy.locale][i]}
                </a>
              </li>
            ))}
        </ul>
      </AlternateLinks>
      {copy.copyright.map((text) => (
        <p key={text}>{text}</p>
      ))}
    </InnerWrapper>
  </Wrapper>
);

export default Footer;
