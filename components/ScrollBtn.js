import { useState, useEffect } from 'react'
import { css, jsx, keyframes } from '@emotion/core'
import { Icon } from 'antd-mobile'

const ScrollBtn = () =>{
    const [showScroll, setShowScroll] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    const handleScroll = () => {
        if (!showScroll && window.pageYOffset > 400){
            setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= 400){
            setShowScroll(false);
        }
    };

    const scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    return (
        <Icon type='up' size='lg' color='#636668' onClick={scrollTop} css={css`
        animation: ${fadeIn} 1s ease;
        height: 48px;
        display: ${showScroll ? 'block' : 'none'};
        position: fixed;
        bottom: 5%;
        left: 7%;
        z-index: 1;
      `}/>
    );
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export default ScrollBtn;
