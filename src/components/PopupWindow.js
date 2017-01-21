import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import MainMenu from './MainMenu/MainMenu'
import InvolveTab from './Tabs/involves/Involves'
import SearchCode from './Tabs/SearchCode/SearchCode'
import Settings from './Tabs/Settings/Settings'
import Snackbar from 'material-ui/Snackbar';
import RefreshIndicator from 'material-ui/RefreshIndicator';




class PopupWindow extends React.Component {

    content() {
        const {menuSelectedOption,users, fetchUsers, searchCode, codeMatches,saveAccessToken, getInvolvement, involves, accessToken} = this.props;
        switch (menuSelectedOption) {
            case 'search':
                return <SearchCode searchCode={searchCode} codeMatches={codeMatches} />;
                break;
            case 'involves':
                return <InvolveTab users={users} fetchUsers={fetchUsers} getInvolvement={getInvolvement} involves={involves} />;
                break;
            case 'settings':
                return <Settings saveAccessToken={saveAccessToken} accessToken={accessToken} />;
                break;
        }

    }

    render(){
        const {setMenuOption, fetching} = this.props;
        return (
        <div    style={{display: 'flex'}}>
            <MainMenu style={{flexGrow: 1}} setMenuOption={setMenuOption}  />
            <div style={{flexGrow:10}}>
                {this.content()}
            </div>

            <Snackbar
                open={fetching}
                message="Fetching Data From Server..."
                />
        </div>
        )

    }
}

export default PopupWindow;