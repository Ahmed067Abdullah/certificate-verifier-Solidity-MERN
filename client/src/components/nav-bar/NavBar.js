import React, { useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { callLogout } from '../auth-modal/AuthModal.service';
import stylesheet from './NavBar.styles';

const NavBar = ({ user, callLogout }) => {
  const [current, setCurrent] = useState(window.location.pathname.slice(1));
  
  const classes = stylesheet();
  
  return (
    <div className={classes['navbar-container']}>
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
        <Menu.Item key="starred-certificates">
          <Link to="/starred-certificates">
            Starred Certificates
          </Link>
        </Menu.Item>
        {user.name
          ? <Menu.Item  onClick={callLogout}>
            Logout
        </Menu.Item>
          : null}

      </Menu>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({ callLogout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);