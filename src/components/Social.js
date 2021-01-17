import React from 'react';
import styled from 'styled-components';
import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
} from 'react-share';
import { icons } from '../assets';
import copy from '../assets/copy.json';

const SocialWrapper = styled.div`
  text-align: center;
  width: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 1;
  bottom: 0;
  left: 0;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const StyledShareContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 40px; height: 40px;
  padding: 10px;
  background-size: 30px;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.black};
  will-change background-color;
  transition: background-color .3s ease;

  &:hover {
    @media(hover: hover) {
      background-color: ${({ theme }) => theme.colors.darkGrey};
    }
  }

  > div, a, button {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    outline: none;
  }
  a {
    line-height: 0;
    font-size: 0;
    color: transparent;
  }
  &:last-of-type {
    margin-right: 0;
  }

  &.facebook {
    background-image: url(${icons.facebook});
  }
  &.twitter {
    background-image: url(${icons.twitter});
  }
  &.reddit {
    background-image: url(${icons.reddit});
    background-size: 20px;
  }
`;

const SocialButtons = (props) => (
  <SocialWrapper>
    <ButtonsWrapper>
      <StyledShareContainer className="facebook">
        <FacebookShareButton url={copy.url} quote={copy.description} />
      </StyledShareContainer>
      <StyledShareContainer className="twitter">
        <TwitterShareButton
          url={copy.url}
          title={copy.description}
          via={copy.twitter}
        />
      </StyledShareContainer>
      <StyledShareContainer className="reddit">
        <RedditShareButton url={copy.url} title={copy.description} />
      </StyledShareContainer>
    </ButtonsWrapper>
  </SocialWrapper>
);

export default SocialButtons;
