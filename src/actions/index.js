const ACCESS_KEY_ENTERED_ACTION = 'ACCESS_KEY_ENTERED'
const SEARCH = 'SEARCH'
import moment from 'moment';

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


function getRepositories() {
    const date = moment().add(-1, 'months').format('YYYY-MM-DD');
    return (dispatch, getState) => {
        const token = getState().get('accessToken');
        return fetch(`https://api.github.com/search/repositories?q=+org:fiverr+pushed:>${date}&access_token=${token}&per_page=100`)
            .then((response) => response.json())
            .then((response) => {
                const repositories = response.items.filter((repo) => repo.size != 0);
                dispatch({type:'FETCHED_REPOSITORIES',repositories});
            })
    };
}


const getPullRequests = () => {

    return (dispatch, getState) => {
        dispatch(startFetching());
        const state = getState();
        const token = state.get('accessToken');
        let repositories = [];
            new Promise(() => {
                repositories = state.get('repositories');
                Promise.all(repositories.map((repository) => {
                    return fetch(`https://api.github.com/repos/fiverr/${repository.name}/pulls?access_token=${token}&per_page=100&state=open`)
                        .then((response) => response.json())
                })).then((results) => {
                    const pullRequests = results
                                            .reduce((a,b) => a.concat(b))
                                            .filter((item)=> moment().add(-1,'months').isBefore(item.updated_at))
                                            .sort((a,b) => {
                                                return moment(a.updated_at).isBefore(b.updated_at) ? 1 : -1
                                            });

                    Promise.all(pullRequests.map(pr => {
                        return fetch(`https://api.github.com/repos/fiverr/${pr.head.repo.name}/pulls/${pr.number}/reviews?access_token=${token}&per_page=100&state=open`,{
                            headers: {
                                'Accept': 'application/vnd.github.black-cat-preview+json'
                            }
                        })
                            .then((response) => response.json())
                            .then(reviews => {
                                pr.reviews = reviews;
                                return pr;
                            })
                    })).then((pullRequests) => {
                        dispatch(endFetching());
                        dispatch({type:'FETCHED_PRs', pullRequests});
                    })


                })

            })
    }
};

const getCommits = (since = moment().add(-1,'days').format()) => {
    return (dispatch, getState) => {
        dispatch(startFetching());
        const state = getState();
        const token = state.get('accessToken');
        let repositories = [];
        new Promise(() => {
            repositories = state.get('repositories');
            Promise.all(repositories.map((repository) => {
                return fetch(`https://api.github.com/repos/fiverr/${repository.name}/commits?since=${since}&access_token=${token}&per_page=100&state=open`)
                    .then((response) => response.json()).then((commits) => {
                        return commits.map(commit => {
                            commit.repository = repository;
                            return commit;
                        })
                    })
            })).then((results) => {
                const commits = results
                    .reduce((a,b) => a.concat(b))
                    .sort((a,b) => {
                        return moment(a.commit.author.date).isBefore(b.commit.author.date) ? 1 : -1
                    });

                dispatch(endFetching());
                dispatch({type:'FETCHED_COMMITS', commits});
            })

        })
    }
};

function setFilter(filter, value) {
  return {
    type: 'NEW_FILTER',
    filter,
    value
  }
}

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
    return fetch(`https://api.github.com/search/issues?q=+org:fiverr+involves:${userName}&access_token=${token}&per_page=100`)
        .then((response) => response.json())
        .then(json => {
            const involves =  json.items.map(involve => {
                involve.repositoryName = (involve.repository_url.match(/([a-zA-Z0-9_]*)$/gi) || [])[0];
                return involve;
            });
            dispatch(endFetching());
            dispatch({type:'FETCHED_INVOLVES', involves});
          return json;
        })
  }
};

export {
   ACCESS_KEY_ENTERED_ACTION,
   SEARCH,
    searchCode,
    getPullRequests,
   saveAccessToken,
   getSuggestions,
    getInvolvement,
    fetchUsers,
    setMenuOption,
    getRepositories,
    getCommits,
    setFilter
};