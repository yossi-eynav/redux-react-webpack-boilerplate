import React from 'react'
import Popup from '../containers/Popup'
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';




injectTapEventPlugin();

function isPopupView(){
  return window.location.search.match('popup')
}

const App = () => (
    <MuiThemeProvider>
      <div>
        { isPopupView() ? <Popup /> : <div />}
      </div>
    </MuiThemeProvider>
)

export default App