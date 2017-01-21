import { connect } from 'react-redux'
import { saveAccessToken, searchCode, getSuggestions, setMenuOption, fetchUsers, getInvolvement} from '../actions'
import PopupWindow from '../components/PopupWindow'



const mapStateToProps = (state, ownProps) => {
  return {
    accessToken: state.get('accessToken'),
    searchSuggestions: state.get('searchSuggestions'),
    menuSelectedOption: state.get('menuSelectedOption'),
    users: state.get('users'),
    involves: state.get('involves'),
    codeMatches: state.get('codeMatches'),
    fetching: state.get('fetching')
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveAccessToken: (accessToken) => {
      dispatch(saveAccessToken(accessToken))
    },
    searchCode: (query) => {
      dispatch(searchCode(query))
    },
    getSuggestions: () => { dispatch(getSuggestions())},
    setMenuOption: (option) => {dispatch(setMenuOption(option))},
    fetchUsers: (query)=> {dispatch(fetchUsers(query))},
    getInvolvement: (userName)=> {dispatch(getInvolvement(userName))}
  }
};

const Popup = connect(
  mapStateToProps,
  mapDispatchToProps
)(PopupWindow)

export default Popup