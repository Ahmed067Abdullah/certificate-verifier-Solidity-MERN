import { createUseStyles } from 'react-jss';

const styles = {
  'toggle-text': {
    '& > span': {
      'color': '#1890ff',
      'cursor': 'pointer',
      'fontWeight': '600'
    },
    'marginTop': '-10px',
    'userSelect': 'none'
  },
  'spinner-container': {
    'alignItems': 'center',
    'display': 'flex',
    'height': '100vh',
    'justifyContent': 'center'
  }
}

export default createUseStyles(styles);
