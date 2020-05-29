import { createUseStyles } from 'react-jss';

const styles = {
  'container': {
    'width': '90vw',
    'maxWidth': '1000px',
    'margin': '40px auto 20px'
  },
  'heading': {
    'fontWeight': '600',
    'fontSize': '24px',
    'marginBottom': '0px'
  },
  'text': {
    'fontSize': '16px'
  },
  'bullet-point': {
    '& > span': {
      'fontWeight': '600',
    },
    'marginBottom': 0,
    'marginLeft': 10,
    'fontSize': '16px'
  }
}

export default createUseStyles(styles);
