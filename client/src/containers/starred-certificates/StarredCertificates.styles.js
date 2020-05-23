import { createUseStyles } from 'react-jss';

const styles = {
  'certificates-container': {
    'maxWidth': '100vw',
    'overflowX': 'hidden',
    'padding': '16px 24px',
    'width': '100%'
  },
  'candidate-name': {
    'fontWeight': 500
  },
  'empty-state-container': {
    'alignItems': 'center',
    'display': 'flex',
    'height': 'calc(100vh - 180px)',
    'justifyContent': 'center'
  },
  'icon-container': {
    '& .anticon-close-circle': {
      'cursor': 'pointer'
    },
    'position': 'absolute',
    'color': '#1890ff',
    'fontSize': '18px',
    'zIndex': 2,
    'top': '7px',
    'right': '12px'
  }
};

export default createUseStyles(styles);
