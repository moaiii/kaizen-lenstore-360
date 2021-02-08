import React, { useState, useRef, useEffect } from 'react';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import { IoInformation } from 'react-icons/io5';
import { BiCode } from 'react-icons/bi';
import { HiOutlineShare } from 'react-icons/hi';

const IconContainer = (props) => {
  return <div className="icon-container">{props.children}</div>;
};

export default (props) => {
  const node = useRef();
  const { setInfoIsVisible, copy, lang } = props;
  const [shareIsOpen, setShareIsOpen] = useState(window.innerWidth > 762);

  const handleSocial = (provider) => {
    let href;

    switch (provider) {
      case 'facebook':
        href = `https://www.facebook.com/sharer/sharer.php?u= 
          ${process.env.REACT_APP_HOMEPAGE}`;
        break;

      case 'twitter':
        href = `https://twitter.com/intent/tweet?text=${copy.description[lang]}&url=${process.env.REACT_APP_HOMEPAGE}`;
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

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    setShareIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  return (
    <div className={`Share ${shareIsOpenClassMod}`} ref={node}>
      <div className={`button-container ${shareIsOpenClassMod}`}>
        <div className="share-item" onClick={() => handleSocial('facebook')}>
          {facebook}
        </div>
        <div className="share-item" onClick={() => handleSocial('twitter')}>
          {twitter}
        </div>
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
