import { createUseStyles } from 'react-jss';

const styles = {
  'company-name': {
    '& > span': {
      'fontWeight': '600'
    },
    'display': 'inline-block',
    'marginBottom': 0,
    'marginLeft': '7px'
  },
  'cmp-unregistered': {
    '& > span': {
      'color': 'rgba(0, 0, 0, 0.65)',
      'display': 'block',
    },
    'fontSize': '16px',
    'color': '#ff4d4f',
    'fontWeight': '500',
    'textAlign': 'center'
  },
  'register-company-card': {
    width: 700, margin: '100px auto 0'
  }
}

export default createUseStyles(styles);
