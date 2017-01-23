import { connect } from 'react-redux'
import { saveAccessToken, searchCode, getSuggestions, setMenuOption, fetchUsers, getInvolvement, getPullRequests} from '../actions'
import TabWindow from '../components/TabWindow'



const mapStateToProps = (state, ownProps) => {
  return {
    accessToken: state.get('accessToken'),
    searchSuggestions: state.get('searchSuggestions'),
    menuSelectedOption: state.get('menuSelectedOption'),
    users: state.get('users'),
    involves: state.get('involves'),
    codeMatches: state.get('codeMatches'),
    fetching: state.get('fetching'),
    pullRequests: state.get('pullRequests')
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
    getInvolvement: (userName)=> {dispatch(getInvolvement(userName))},
    getPullRequests: () => dispatch(getPullRequests())
  }
};

// let boundActionCreators = bindActionCreators(TodoActionCreators, dispatch)

const Tab = connect(
  mapStateToProps,
  mapDispatchToProps
)(TabWindow);

export default Tab;