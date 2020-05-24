import * as loginActions from './login';
import * as logoutActions from './logout';
import * as userProfileActions from './userProfile';
import * as regActions from './registration';

export default { ...loginActions, ...logoutActions, ...userProfileActions, ...regActions  }
