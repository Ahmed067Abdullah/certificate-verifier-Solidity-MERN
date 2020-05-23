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
  }
};

export default createUseStyles(styles);
