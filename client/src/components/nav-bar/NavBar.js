import React, { useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [current, setCurrent] = useState(window.location.pathname.slice(1));
  return (
    <div>
      <Menu onClick={e => setCurrent(e.key)} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home">
          <Link to="/home">
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="register-company">
          <Link to="/register-company">
            Register Company
          </Link>
        </Menu.Item>
        <Menu.Item key="award-certificate">
          <Link to="/award-certificate">
            Award Certificate
          </Link>
        </Menu.Item>
        <Menu.Item key="find-certificate">
          <Link to="/find-certificate">
            Find Certificate
          </Link>
        </Menu.Item>
        <Menu.Item key="issued-certificates">
          <Link to="/issued-certificates">
            Issued Certificates
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default NavBar;
