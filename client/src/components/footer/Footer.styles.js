import { createUseStyles } from 'react-jss';

const styles = {
  'code-icon': {
    'color': 'white !important',
    'background': '#1890ff',
    'borderRadius': '3px',
    'padding': '2px 3px 4px',
    'height': '22px',
    'display': 'flex',
    'alignItems': 'center',
    'fontSize': '16px',
    'lineHeight': '0.3',
    'marginRight': '5px',
    'transform': 'scale(0.7, 1)'
  },
  'footer-container': {
    'backgroundColor': '#FFF',
    'padding': '10px',
    'display': 'flex',
    'position': 'fixed',
    'alignItems': 'center',
    'flexDirection': 'column',
    'width': '100%',
    'zIndex': '2',
    'bottom': '0'
  },
  'dev-name': {
    'fontSize': '16px',
    'marginBottom': '10px',
    '& > span': {
      'fontWeight': '500'
    }
  },
  'icons-container': {
    'display': 'flex',
    '& span': {
      'color': '#1890ff',
      'margin': '0 8px',
      'cursor': 'pointer',
      'fontSize': '24px'
    }
  }
}

export default createUseStyles(styles);
