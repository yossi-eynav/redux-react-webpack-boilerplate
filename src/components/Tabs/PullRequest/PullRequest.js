import React from 'react';
import './PullRequest.scss';
import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';



class PullRequest extends  React.Component {

    componentDidMount() {
        this.props.getPullRequests();
    }
    
    reviewerColor(status) {
        switch (status){
            case 'COMMENTED':
                return 'grey';
            case 'CHANGES_REQUESTED':
                return 'red';
            case 'APPROVED':
                return 'green';
        }
    }

    render() {
        const {pullRequests, getPullRequests} = this.props;

        return (
            <div className="pull-requests">
                <h1> Pull Requests</h1>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false} displayRowCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn className="num">Num</TableHeaderColumn>
                            <TableHeaderColumn className="creator">Creator</TableHeaderColumn>
                            <TableHeaderColumn className="title">Title</TableHeaderColumn>
                            <TableHeaderColumn>Repository</TableHeaderColumn>
                            <TableHeaderColumn>Branch Name</TableHeaderColumn>
                            <TableHeaderColumn className="status">Status</TableHeaderColumn>
                            <TableHeaderColumn className="approved">Approved</TableHeaderColumn>
                            <TableHeaderColumn className="reviewers">Reviewers</TableHeaderColumn>
                            <TableHeaderColumn>Updated At</TableHeaderColumn>
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
                                <TableRowColumn className="title">
                                    <a  href={pr.html_url} target="_blank">{pr.title}</a>
                                </TableRowColumn>

                                <TableRowColumn>
                                    <FlatButton target="_blank" href={ pr.head.repo.html_url} label={ pr.head.repo.name} />
                                </TableRowColumn>

                                <TableRowColumn>
                                    { pr.head.ref}
                                </TableRowColumn>

                                <TableRowColumn className="status">
                                    <FontIcon className="material-icons" style={{color:'green'}}>lock_open</FontIcon>
                                </TableRowColumn>

                                <TableRowColumn className="approved">
                                    {pr.reviews.filter(review => review.state === 'APPROVED').length ?
                                        <FontIcon className="material-icons" style={{color:'green'}}>check_circle</FontIcon> :
                                        ''}
                                </TableRowColumn>

                                <TableRowColumn>
                                     { pr.reviews.map(review => <Avatar key={review.id} style={{
                                         border: `3px solid ${this.reviewerColor(review.state)}`,
                                         marginRight: '5px'
                                     }
                                     }  src={review.user.avatar_url}  />) }
                                </TableRowColumn>

                                <TableRowColumn className="updated-at">
                                    {moment(pr.updated_at).fromNow()}
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