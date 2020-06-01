import * as loginActions from './login';
import * as logoutActions from './logout';
import * as userProfileActions from './userProfile';
import * as regActions from './registration';
import * as tourActions from './tournaments';
import * as groupsActions from './groups';
import * as matchesActions from './matches';

export default { ...loginActions, ...logoutActions, ...userProfileActions, ...regActions, ...tourActions, ...groupsActions, ...matchesActions  }
