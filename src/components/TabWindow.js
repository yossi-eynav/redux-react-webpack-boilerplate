import React from 'react'
import MainMenu from './MainMenu/MainMenu'
import InvolveTab from './Tabs/involves/Involves'
import SearchCode from './Tabs/SearchCode/SearchCode'
import PullRequest from './Tabs/PullRequest/PullRequest'
import Commits from './Tabs/Commits/Commits'
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import TokenDialog from './TokenDialog/TokenDialog'



class TabWindow extends React.Component {

    componentDidMount() {
        const {fetchUsers,getRepositories } = this.props;
        fetchUsers();
        getRepositories();
    }

    content() {
        const {menuSelectedOption,users,commits,getCommits,repositories, fetchUsers, searchCode, codeMatches,saveAccessToken, getInvolvement, involves, accessToken,getRepositories, getPullRequests, pullRequests} = this.props;
        switch (menuSelectedOption) {
            case 'search':
                return <SearchCode searchCode={searchCode} codeMatches={codeMatches} />;
                break;
            case 'involves':
                return <InvolveTab repositories={repositories} users={users} fetchUsers={fetchUsers} getInvolvement={getInvolvement} involves={involves} />;
                break;

            case 'pull_requests':
                return <PullRequest pullRequests={pullRequests} getPullRequests={getPullRequests} />;
                break;
            case 'commits':
                return <Commits commits={commits} getCommits={getCommits} />;
                break;
        }

    }

    render(){
        const {setMenuOption, fetching, saveAccessToken, accessToken} = this.props;

        return (
        <div style={{display: 'flex'}}>
            <MainMenu style={{flexGrow: 1}} setMenuOption={setMenuOption}  />
            <div style={{flexGrow:10}}>
                {this.content()}
            </div>
            <Snackbar open={fetching} message="Fetching Data From Server..."/>
            {!accessToken && <TokenDialog saveAccessToken={saveAccessToken} />}
            </div>
        )

    }
}

export default TabWindow;