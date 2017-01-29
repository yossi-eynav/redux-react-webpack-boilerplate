import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Router, Route, Link,browserHistory  } from 'react-router'


import React from 'react'
import './main-menu.scss';


const MainMenu = ({setMenuOption}) => {
return (

      <IconMenu
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
    >
          <MenuItem value="search" ><Link to="/search">Search Code</Link></MenuItem>
          <MenuItem  value="involves"><Link to="/involves">Involves</Link></MenuItem>
          <MenuItem  value="pull_requests"><Link to="/pulls">Pull Requests</Link></MenuItem>
          <MenuItem  value="commits"><Link to="/commits">Commits Backlog</Link></MenuItem>
    </IconMenu>
)
    
};

export default MainMenu;