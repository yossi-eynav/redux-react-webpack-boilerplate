import React from 'react'
import MainMenu from './MainMenu/MainMenu'
import InvolveTab from './Tabs/involves/Involves'
import SearchCode from './Tabs/SearchCode/SearchCode'
import PullRequest from './Tabs/PullRequest/PullRequest'
import Commits from './Tabs/Commits/Commits'
import Snackbar from 'material-ui/Snackbar';
import TokenDialog from './TokenDialog/TokenDialog'





class TabWindow extends React.Component {

    componentDidUpdate() {
        const {fetchUsers,getRepositories } = this.props;
        fetchUsers();
        getRepositories();
    }

    content() {
        const {menuSelectedOption,users,clearFilters,commits,getCommits,repositories, filters, fetchUsers, setFilter,searchCode, codeMatches,saveAccessToken, getInvolvement, involves, accessToken,getRepositories, getPullRequests, pullRequests} = this.props;
        switch (menuSelectedOption) {
            case 'search':
                return <SearchCode searchCode={searchCode} codeMatches={codeMatches} />;
                break;
            case 'involves':
                return <InvolveTab filters={filters} clearFilters={clearFilters} repositories={repositories} setFilter={setFilter} users={users} fetchUsers={fetchUsers} getInvolvement={getInvolvement} involves={involves} />;
                break;

            case 'pull_requests':
                return <PullRequest filters={filters} clearFilters={clearFilters} repositories={repositories} setFilter={setFilter} users={users}    pullRequests={pullRequests} getPullRequests={getPullRequests} />;
                break;
            case 'commits':
                return <Commits commits={commits} getCommits={getCommits} />;
                break;
        }

    }

    render(){
        const {setMenuOption,title ,fetching, saveAccessToken, accessToken, users, repositories} = this.props;

        return (
        <div>
            <MainMenu setMenuOption={setMenuOption}  />
            <div>
                {this.content()}
            </div>
            <Snackbar open={fetching} message="Fetching Data From Server." />
                {!accessToken && <TokenDialog saveAccessToken={saveAccessToken} />}
            </div>
        )

    }
}

export default TabWindow;