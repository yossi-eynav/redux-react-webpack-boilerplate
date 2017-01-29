import React from 'react'
import MainMenu from './MainMenu/MainMenu'
import InvolveTab from './Tabs/involves/Involves'
import SearchCode from './Tabs/SearchCode/SearchCode'
import PullRequest from './Tabs/PullRequest/PullRequest'
import Commits from './Tabs/Commits/Commits'
import Snackbar from 'material-ui/Snackbar';
import TokenDialog from './TokenDialog/TokenDialog'
import { Router, Route, Link, browserHistory } from 'react-router'




class TabWindow extends React.Component {

    componentDidMount() {
        const {fetchUsers,getRepositories } = this.props;
        fetchUsers();
        getRepositories();
    }

    render(){
        const {menuSelectedOption,fetching,setMenuOption, title ,users,clearFilters,commits,getCommits,repositories, filters, fetchUsers, setFilter,searchCode, codeMatches,saveAccessToken, getInvolvement, involves, accessToken,getRepositories, getPullRequests, pullRequests} = this.props;

        return (
        <div>
              <Router key={Math.random()} history={browserHistory}>
                <Route path="/" component={() => <SearchCode searchCode={searchCode} codeMatches={codeMatches} />}/>
                <Route path="pulls" component={() => <PullRequest filters={filters} clearFilters={clearFilters} repositories={repositories} setFilter={setFilter} users={users}    pullRequests={pullRequests} getPullRequests={getPullRequests} />}/>
                <Route path="search" component={() => <SearchCode searchCode={searchCode} codeMatches={codeMatches} />}/>
                <Route path="involves" component={() => <InvolveTab filters={filters} clearFilters={clearFilters} repositories={repositories} setFilter={setFilter} users={users} fetchUsers={fetchUsers} getInvolvement={getInvolvement} involves={involves} />}/>
                <Route path="commits" component={() =>  <Commits commits={commits} getCommits={getCommits} />}/>
             </Router>    
        
            <Snackbar open={fetching} message="Fetching Data From Server." />
            {!accessToken && <TokenDialog fetchUsers={fetchUsers}  getRepositories={getRepositories} saveAccessToken={saveAccessToken} />}
            </div>
        )

    }
}

export default TabWindow;