import { createUseStyles } from 'react-jss';

const styles = {
  'back-btn': {
    'position': 'absolute',
    'top': '65px',
    'left': '20px',
    'paddingLeft': '10px'
  },
  'btns-container': {
    'alignItems': 'center',
    'display': 'flex',
    'margin': '20px 0',
    'justifyContent': 'center'
  },
  'not-found-container': {
    'alignItems': 'center',
    'display': 'flex',
    'height': 'calc(100vh - 60px)',
    'justifyContent': 'center'
  },
  'view-certificate-container': {
    paddingTop: 20
  }
}

export default createUseStyles(styles);

