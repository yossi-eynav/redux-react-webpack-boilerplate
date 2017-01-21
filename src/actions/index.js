const ACCESS_KEY_ENTERED_ACTION = 'ACCESS_KEY_ENTERED'
const SEARCH = 'SEARCH'

const startFetching = () => {
    return {
        type: 'FETCHING_START'
    }
};

const endFetching = () => {
    return {
        type: 'FETCHING_END'
    }
};


const searchCode = (query) => {
  return (dispatch, getState) => {
      dispatch(startFetching());
    const token = getState().get('accessToken');
    return fetch(`https://api.github.com/search/code?q=${query}+org:fiverr&access_token=${token}&per_page=100`,
        {headers: {
          'Accept': 'application/vnd.github.v3.text-match+json'
        }}
    )
        .then((response) => response.json())
        .then(json => {

          let entites = (json.items || []).filter(item => {
            return item.text_matches && item.text_matches[0].matches
          }).sort((a,b) => {
            return (a.repository.name > b.repository.name) ? 1 : -1
          }).map((item) => {

            const textMatch = Array.isArray(item.text_matches) ? item.text_matches.pop() : item.text_matches;
            item.fragment = textMatch.fragment;
            return item;
          });
            dispatch(endFetching());
          dispatch(
              {
                type: 'FETCHED_CODE_SEARCH',
                codeMatches: entites
              }
          );
        })
  }
};


const saveAccessToken = (accessToken) => {
  return {
    type: ACCESS_KEY_ENTERED_ACTION,
    accessToken
  }
}

const getSuggestions = () => {
  return (dispatch, getState) => {
    const state = getState();
    const query = state.get('query')
    if (query.match(''))


    dispatch({type: 'type1'});
    dispatch({type: 'type2'});
  }

}

const setMenuOption = (option) => {
  return {
    type: 'MENU_SELECTED',
    option
  }
};

const fetchUsers = () => {
  return (dispatch, getState) => {
      dispatch(startFetching());
      const token = getState().get('accessToken');
    let users = [];


    getUsersByPage(1)
    .then(() => getUsersByPage(2))
        .then(() => {
            dispatch(endFetching());
            dispatch({type: 'FETCHED_USERS', users: users})
        });

    function getUsersByPage(page = 1) {
      return fetch(`https://api.github.com/orgs/fiverr/members?per_page=100&access_token=${token}&page=${page}`)
          .then((response) => response.json())
          .then(json => {users = users.concat(json)})
    }
  }
};

const getInvolvement = (userName) => {
  return (dispatch, getState) => {
      dispatch(startFetching());
      const token = getState().get('accessToken');
    return fetch(`https://api.github.com/search/issues?q=+org:fiverr+involves:${userName}&access_token=${token}&per_page=60`)
        .then((response) => response.json())
        .then(json => {
            dispatch(endFetching());
            dispatch({type:'FETCHED_INVOLVES', involves: json.items});
          return json;
        })
  }
};

export {
   ACCESS_KEY_ENTERED_ACTION,
   SEARCH,
    searchCode,
   saveAccessToken,
   getSuggestions,
    getInvolvement,
    fetchUsers,
    setMenuOption
};