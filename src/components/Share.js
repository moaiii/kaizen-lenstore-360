import React, { useState } from 'react';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import { IoInformation } from 'react-icons/io5';
import { BiCode } from 'react-icons/bi';
import { HiOutlineShare } from 'react-icons/hi';
import copy from '../assets/copy.json';

const IconContainer = (props) => {
  return <div className="icon-container">{props.children}</div>;
};

export default (props) => {
  const { setInfoIsVisible, isMobile } = props;
  const [shareIsOpen, setShareIsOpen] = useState(!isMobile);

  const handleSocial = (provider) => {
    let href;

    switch (provider) {
      case 'facebook':
        href = `https://www.facebook.com/sharer/sharer.php?u= 
          ${process.env.REACT_APP_HOMEPAGE}`;
        break;

      case 'twitter':
        href = `https://twitter.com/intent/tweet?text=${copy.description}&url=${process.env.REACT_APP_HOMEPAGE}`;
        break;

      default:
        alert('Social sharing isnt working at present');
    }

    window.open(
      href,
      '',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=253,width=600',
    );
  };

  const share = (
    <IconContainer>
      <HiOutlineShare />
    </IconContainer>
  );

  const facebook = (
    <IconContainer>
      <FaFacebookF />
    </IconContainer>
  );

  const twitter = (
    <IconContainer onClick={() => handleSocial('twitter')}>
      <FaTwitter />
    </IconContainer>
  );

  const code = (
    <IconContainer onClick={() => handleSocial('code')}>
      <BiCode />
    </IconContainer>
  );
  const information = (
    <IconContainer>
      <IoInformation />
    </IconContainer>
  );

  const shareIsOpenClassMod = !shareIsOpen ? '--hide' : '';

  return (
    <div className={`Share ${shareIsOpenClassMod}`}>
      <div className={`button-container ${shareIsOpenClassMod}`}>
        <div className="share-item" onClick={() => handleSocial('facebook')}>
          {facebook}
        </div>
        <div className="share-item" onClick={() => handleSocial('twitter')}>
          {twitter}
        </div>
        <div className="share-item --code">{code}</div>
        <div className="share-item --info" onClick={() => setInfoIsVisible()}>
          {information}
        </div>
      </div>
      <div className="toggle">
        <div
          className="share-item"
          onClick={() => setShareIsOpen(!shareIsOpen)}
        >
          {share}
        </div>
      </div>
    </div>
  );
};
