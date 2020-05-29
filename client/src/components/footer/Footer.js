import React from 'react';
import { LinkedinFilled, GithubFilled, MailFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';
import stylesheet from './Footer.styles';

const Footer = () => {
  const classes = stylesheet();

  return (
    <div className={classes['footer-container']}>
      <p className={classes['dev-name']}>Developed by <span>Ahmed Abdullah</span> &#127881; </p>
      <div className={classes['icons-container']}>
        <Tooltip placement="top" title="Source Code">
          <a
            className={classes['code-icon']}
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Ahmed067Abdullah/certificate-verifier-Solidity-MERN">
            &lt;/&gt;
        </a>
        </Tooltip>
        <Tooltip placement="top" title="Email">
          <a href="mailto:ahmed067abdullah@gmail.com"><MailFilled /></a>
        </Tooltip>
        <Tooltip placement="top" title="Github">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Ahmed067Abdullah">
            <GithubFilled />
          </a>
        </Tooltip>
        <Tooltip placement="top" title="LinkedIn">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://pk.linkedin.com/in/ahmed-abdullah-74a414172">
            <LinkedinFilled />
          </a>
        </Tooltip>
      </div>
    </div>
  )
}

export default Footer;
