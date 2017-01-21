import Immutable from 'immutable';
import {ACCESS_KEY_ENTERED_ACTION} from '../actions/index';

const initialState = Immutable.Map()
                              .set('searchSuggestions', [])
                              .set('menuSelectedOption', 'search')
                              .set('accessToken', localStorage.getItem('accessToken'))
                              .set('users', [])
                              .set('involves', [])
                              .set('codeMatches', [])
                              .set('fetching', false);


const reducers = (state = initialState , action) => {
  switch (action.type) {
    case ACCESS_KEY_ENTERED_ACTION:
     return state.set('accessToken', action.accessToken);
      break;

    case 'MENU_SELECTED':
      return state.set('menuSelectedOption', action.option);
      break;

    case 'FETCHED_USERS':
      return state.set('users', action.users);
      break;

    case 'FETCHED_CODE_SEARCH':
      return state.set('codeMatches', action.codeMatches);
      break;

    case 'FETCHING_START':
      return state.set('fetching', true);
      break;

    case 'FETCHING_END':
      return state.set('fetching', false);
      break;
    case 'FETCHED_INVOLVES':
      return state.set('involves', action.involves);
      break;
    default:
      return state
  }
}

export default reducers;