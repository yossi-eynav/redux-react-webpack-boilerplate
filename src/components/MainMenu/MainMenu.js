import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import React from 'react'

import './main-menu.scss';


const MainMenu = ({setMenuOption}) => {
return (
        <Menu className="menu" onChange={((_, val) => {setMenuOption(val)})}>
          <MenuItem value="search" >Search Code</MenuItem>
          <MenuItem  value="involves">Involves</MenuItem>
          <MenuItem  value="pull_requests">Pull Requests</MenuItem>
          <MenuItem value="settings" >Settings</MenuItem>
        </Menu>
)
    
};

export default MainMenu;