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
  'register-company-card': {
    width: 700, margin: '100px auto 0'
  }
}

export default createUseStyles(styles);
