import React from 'react'
import MainMenu from './MainMenu/MainMenu'
import InvolveTab from './Tabs/involves/Involves'
import SearchCode from './Tabs/SearchCode/SearchCode'
import Settings from './Tabs/Settings/Settings'
import PullRequest from './Tabs/PullRequest/PullRequest'
import Commits from './Tabs/Commits/Commits'
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';



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
            case 'settings':
                return <Settings saveAccessToken={saveAccessToken} accessToken={accessToken} />;
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
        const {setMenuOption, fetching} = this.props;

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                disabled={true}
            />,
        ];

        return (
        <div   style={{display: 'flex'}}>
            <MainMenu style={{flexGrow: 1}} setMenuOption={setMenuOption}  />
            <div style={{flexGrow:10}}>
                {this.content()}
            </div>
            <Snackbar open={fetching} message="Fetching Data From Server..."/>

            <Dialog
                title="Dialog With Actions"
                actions={actions}
                modal={false}
                open={true}>
                The actions in this window were passed in as an array of React objects.
                <TextField />
                </Dialog>
            </div>
        )

    }
}

export default TabWindow;