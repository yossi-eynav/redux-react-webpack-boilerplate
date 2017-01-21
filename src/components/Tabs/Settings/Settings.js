import React from 'react';
import './Settnigs.scss';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const Settings = ({saveAccessToken,accessToken}) => {

    return (
        <div>
        <h1> Settings</h1>

            <TextField type="password"
                       name="accessToken"
                       value={accessToken || ''}
                       placeholder={'Paste your access key'}
                       onPaste={ (e) => {
                           const clipboardData = e.clipboardData.getData('Text');
                           localStorage.setItem('accessToken', clipboardData);
                           saveAccessToken(clipboardData);
                       } } />
            <RaisedButton
                label="Github Link"
                secondary={true} />

        </div>
    )
};

export default  Settings;