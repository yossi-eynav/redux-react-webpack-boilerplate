import React from 'react';
import './PullRequest.scss';
import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import Filters from '../../Filters/Filters';
import moment from 'moment';
import MainMenu from '../../MainMenu/MainMenu'



class PullRequest extends  React.Component {
    
    getReviewers(uniqueReviewers) {
        return uniqueReviewers.map(review => {
            review = review.split('~');
           return <Avatar key={review} style={{
                                         border: `3px solid ${this.reviewerColor(review[1])}`,
                                         marginRight: '5px'
                                     }
       }  src={review[2]}  />
        })
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
        const {filters ,clearFilters, users, repositories, setFilter} = this.props;
        let pullRequests = this.props.pullRequests;

        pullRequests = pullRequests.filter(pr => {
            const reviews = Array.from(pr.reviews.values());
            return pr.head.repo.name.match(new RegExp(filters.get('repository'))) &&
                pr.user.login.match(new RegExp(filters.get('author'))) &&
                pr.state.match(new RegExp(filters.get('state'))) &&
                (!reviews.length || reviews.filter(review => review.match(new RegExp(filters.get('approved')))).length)
    });

        return (
            <div className="pull-requests">
                 <MainMenu />
                <h1> Pull Requests</h1>
                <FlatButton onClick={(() => {
                    this.props.getPullRequests();
        }).bind(this)} label="Fetch Pull Requests:"  />
                <Filters clearFilters={clearFilters} users={users} filters={filters} repositories={repositories} setFilter={setFilter} />
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false} displayRowCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn className="num">Num</TableHeaderColumn>
                            <TableHeaderColumn className="author">Author</TableHeaderColumn>
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
                                <TableRowColumn className="author">
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
                                    { pr.state === 'open' ?
                                        <FontIcon className="material-icons" style={{color:'green'}}>lock_open</FontIcon> :
                                        <FontIcon className="material-icons" style={{color:'red'}}>lock_outline</FontIcon>
                                    }
                                </TableRowColumn>

                                <TableRowColumn className="approved">
                                    {Array.from(pr.reviews.values()).filter(review => review.match('APPROVED')).length ?
                                        <FontIcon className="material-icons" style={{color:'green'}}>check_circle</FontIcon> :
                                        ''}
                                </TableRowColumn>

                                <TableRowColumn>
                                     { this.getReviewers(Array.from(pr.reviews.values()))}
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