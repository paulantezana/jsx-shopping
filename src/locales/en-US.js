import globalHeader from './en-US/globalHeader';
import menu from './en-US/menu';
import settings from './en-US/settings';
import login from './es-ES/login';
import exception from './en-US/exception';
import app from './en-US/app';

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
