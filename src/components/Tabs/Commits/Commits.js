import React from 'react';
import './commits.scss';
import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import moment from 'moment';



class Commits extends  React.Component {

    componentDidMount() {
        const getCommits = this.props.getCommits;
        getCommits();
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
        let {users, getInvolvement, commits, repositories} = this.props;

        const filters = this.state.filters;

        // commits = commits.filter(commit => {
        //     return (!filters.repository || commit.repositoryName.match(filters.repository)) &&
        //         (!filters.username || commit.user.login.match(filters.username)) &&
        //         (!filters.state || commit.state.match(filters.state));
        // });

        return (
            <div className="commits">
                <h1> Commits</h1>

                {/*<SelectField*/}
                    {/*floatingLabelText="Username:"*/}
                    {/*value="username"*/}
                    {/*onChange={(event,index, value) => {*/}
                        {/*this.setFilter.bind(this)('username', value)*/}
                    {/*}}*/}
                {/*>*/}
                    {/*<MenuItem value="" primaryText="All" />*/}
                    {/*{users.map(user =>  <MenuItem value={user.login} primaryText={user.login} /> )}*/}
                {/*</SelectField>*/}


                {/*<SelectField*/}
                    {/*floatingLabelText="Repositories:"*/}
                    {/*value="repository"*/}
                    {/*onChange={(event,index, value) => {*/}
                        {/*this.setFilter.bind(this)('repository', value)*/}
                    {/*}}*/}
                {/*>*/}
                    {/*<MenuItem value="" primaryText="All" />*/}
                    {/*{repositories.map(repo =>  <MenuItem value={repo.name} primaryText={repo.name} /> )}*/}
                {/*</SelectField>*/}

                {/*<SelectField*/}
                    {/*floatingLabelText="Status:"*/}
                    {/*value=""*/}
                    {/*onChange={(event,index, value) => {*/}
                        {/*this.setFilter.bind(this)('state', value)*/}
                    {/*}}*/}
                {/*>*/}
                    {/*<MenuItem value="" primaryText="All" />*/}
                    {/*<MenuItem value="open" primaryText="Open" />*/}
                    {/*<MenuItem value="closed" primaryText="Closed" />*/}
                {/*</SelectField>*/}


                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false} displayRowCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn className="num">Num</TableHeaderColumn>
                            <TableHeaderColumn className="title">Title</TableHeaderColumn>
                            <TableHeaderColumn className="creator">Creator</TableHeaderColumn>
                            <TableHeaderColumn>Repository</TableHeaderColumn>
                            <TableHeaderColumn>Updated At</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} showRowHover={true}>
                        {commits.map((item, index) => {
                            return (<TableRow key={item.id}>
                                <TableRowColumn className="num">{index + 1}</TableRowColumn>
                                <TableRowColumn className="title">
                                    <a href={item.html_url} target="_blank">{item.commit.message}</a>
                                    </TableRowColumn>
                                <TableRowColumn className="creator">
                                    <Avatar src={item.author && item.author.avatar_url} />
                                    <small>{item.author && item.author.login}</small>
                                </TableRowColumn>
                                <TableRowColumn>
                                    { item.repository.name }
                                </TableRowColumn>
                                <TableRowColumn className="updated-at">
                                    {moment(item.commit.author.date).fromNow() }
                                </TableRowColumn>
                            </TableRow>)
                        })}

                    </TableBody>
                </Table>
            </div>
        )
    }

}

export default  Commits;