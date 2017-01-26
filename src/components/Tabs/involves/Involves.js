import React from 'react';
import './involves.scss';
import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import moment from 'moment';
import Filters from '../../Filters/Filters'


class Involves extends  React.Component {

    componentDidMount() {
        const fetchUsers = this.props.fetchUsers;
        fetchUsers();
    }

    componentDidUpdate() {
       this.refs.user_search.focus();
    }

    constructor(props) {
        super(props);
        this.state = {filters: {}}

    }

    setFilter(key, value) {
        const filters = this.state.filters;
        filters[key] = value;
        this.setState({filters});
    }

    render() {
        let {users, getInvolvement, involves,filters, repositories, setFilter} = this.props;

        // const filters = this.state.filters;

        // involves = involves.filter(involve => {
        //     return (!filters.repository || involve.repositoryName.match(filters.repository)) &&
        //     (!filters.username || involve.user.login.match(filters.username)) &&
        //     (!filters.state || involve.state.match(filters.state));
        // });


        return (
            <div className="involves">
                <h1> Involves</h1>
                <AutoComplete
                    className="search-users"
                    hintText="Search Fiverr's organization members"
                    ref="user_search"
                    fullWidth={true}
                    style={{width: '500px'}}
                    dataSource={ users.map(user => user.login)}
                    filter={ (query, key) => key.match(new RegExp(query ,'gi'))}
                    maxSearchResults={10}
                    onNewRequest={(val) => getInvolvement(val)}
                />
                
                <Filters users={users} filters={filters} repositories={repositories} setFilter={setFilter} />
                
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false} displayRowCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn className="num">Num</TableHeaderColumn>
                            <TableHeaderColumn className="title">Title</TableHeaderColumn>
                            <TableHeaderColumn className="creator">Creator</TableHeaderColumn>
                            <TableHeaderColumn>Repository</TableHeaderColumn>
                            <TableHeaderColumn>Type</TableHeaderColumn>
                            <TableHeaderColumn>Status</TableHeaderColumn>
                            <TableHeaderColumn>Updated At</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} showRowHover={true}>
                        {involves.map((involve, index) => {
                            return (<TableRow key={involve.id}>
                                <TableRowColumn className="num">{index + 1}</TableRowColumn>
                                <TableRowColumn className="title">
                                    <a href={involve.html_url} target="_blank">{involve.title}</a>
                                    </TableRowColumn>
                                <TableRowColumn className="creator">
                                    <Avatar src={involve.user.avatar_url} />
                                    <small>{involve.user.login}</small>
                                </TableRowColumn>

                                <TableRowColumn>
                                    { involve.repositoryName }
                                </TableRowColumn>

                                <TableRowColumn className="type">
                                    { involve.pull_request ?
                                        <FontIcon className="material-icons">code</FontIcon> :
                                        <FontIcon className="material-icons">info</FontIcon>
                                    }
                                </TableRowColumn>

                                <TableRowColumn className="type">
                                    { involve.state === 'open' ?
                                        <FontIcon className="material-icons" style={{color:'green'}}>lock_open</FontIcon> :
                                        <FontIcon className="material-icons" style={{color:'red'}}>lock_outline</FontIcon>
                                    }
                                </TableRowColumn>

                                <TableRowColumn className="updated-at">
                                    {moment(involve.updated_at).fromNow()}
                                </TableRowColumn>
                            </TableRow>)
                        })}

                    </TableBody>
                </Table>
            </div>
     )
    }

}

export default  Involves;