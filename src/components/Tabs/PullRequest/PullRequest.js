import React from 'react';
import './PullRequest.scss';
import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import moment from 'moment';



class PullRequest extends  React.Component {

    componentDidMount() {
        this.props.getPullRequests();
    }


    render() {
        const {pullRequests} = this.props;

        return (
            <div className="pull-requests">
                <h1> Pull Requests</h1>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false} displayRowCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn className="num">Num</TableHeaderColumn>
                            <TableHeaderColumn className="creator">Creator</TableHeaderColumn>
                            <TableHeaderColumn className="title">Title</TableHeaderColumn>
                            <TableHeaderColumn className="body">Body</TableHeaderColumn>
                            <TableHeaderColumn>Repository</TableHeaderColumn>
                            <TableHeaderColumn>Branch Name</TableHeaderColumn>
                            <TableHeaderColumn className="type">Type</TableHeaderColumn>
                            <TableHeaderColumn className="status">Status</TableHeaderColumn>
                            <TableHeaderColumn>Updated At</TableHeaderColumn>
                            <TableHeaderColumn>Actions</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody preScanRows={false} displayRowCheckbox={false} showRowHover={true}>
                        {pullRequests.map((pr, index) => {
                            return (<TableRow key={pr.id}>
                                <TableRowColumn className="num">{index + 1}</TableRowColumn>
                                <TableRowColumn className="creator">
                                    <Avatar src={pr.user.avatar_url} />
                                    <small>{pr.user.login}</small>
                                </TableRowColumn>
                                <TableRowColumn className="title">{pr.title}</TableRowColumn>
                                <TableRowColumn className="body">{pr.body  || 'NO DESCRIPTION' }</TableRowColumn>


                                <TableRowColumn>
                                    <FlatButton target="_blank" href={ pr.head.repo.html_url} label={ pr.head.repo.name} />
                                </TableRowColumn>

                                <TableRowColumn>
                                    { pr.head.ref}
                                </TableRowColumn>

                                <TableRowColumn className="type">
                                    <FontIcon className="material-icons">code</FontIcon>
                                </TableRowColumn>

                                <TableRowColumn className="status">
                                    <FontIcon className="material-icons" style={{color:'green'}}>lock_open</FontIcon>
                                </TableRowColumn>

                                <TableRowColumn className="updated-at">
                                    {moment(pr.updated_at).fromNow()}
                                </TableRowColumn>
                                <TableRowColumn className="actions">
                                    <FlatButton label="View On Github" primary={true}  href={pr.html_url} target="_blank"/>
                                </TableRowColumn>
                            </TableRow>)
                        })}

                    </TableBody>
                </Table>
            </div>
        )
    }

}

export default  PullRequest;