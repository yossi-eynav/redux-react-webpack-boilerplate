import React from 'react'
import Tab from '../containers/Tab'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

const App = () => (
    <MuiThemeProvider>
        <Tab />
    </MuiThemeProvider>
)

export default App