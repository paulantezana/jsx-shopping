import globalHeader from './pt-BR/globalHeader';
import menu from './pt-BR/menu';
import settings from './pt-BR/settings';
import login from './es-ES/login';
import exception from './pt-BR/exception';

export default {
  'navBar.lang': 'Idiomas',
  'layout.user.link.help': 'ajuda',
  'layout.user.link.privacy': 'política de privacidade',
  'layout.user.link.terms': 'termos de serviços',
  'app.home.introduce': 'introduzir',
  ...globalHeader,
  ...menu,
  ...settings,
  ...login,
  ...exception,
};
