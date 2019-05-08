import globalHeader from './en-US/globalHeader';
import menu from './en-US/menu';
import settings from './en-US/settings';
import login from './es-ES/login';
import exception from './es-ES/exception';
import app from './es-ES/app';

export default {
  'navBar.lang': 'Languages',
  'layout.user.link.help': 'Help',
  'layout.user.link.privacy': 'Privacy',
  'layout.user.link.terms': 'Terms',
  'app.home.introduce': 'introduce',
  ...globalHeader,
  ...menu,
  ...settings,
  ...login,
  ...exception,
  ...app,
};
