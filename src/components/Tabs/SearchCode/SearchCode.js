import React from 'react';
import './SearchCode.scss'
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/FlatButton';



class SearchCode extends React.Component{

    componentDidUpdate() {
        this.refs.code_search.focus();
    }

    render(){


 let timeout;
 const {codeMatches, searchCode} = this.props;

return (
        <div className="search-code">
            <h1> Search Code</h1>
            <TextField
                key="code_search"
                name="code_search"
                ref="code_search"
                fullWidth={true}
                onChange={(_,query)=> {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {searchCode(query)},500)
                }}
            />

            <div>
            <p> Matches Count: {codeMatches.length} </p>
            </div>

            {codeMatches.map((match) => {
                return (


                <Card style={{marginBottom: '60px'}}>
                    <CardTitle  title={ match.repository.name}  subtitle={match.name}  />
                    <CardText>
                        <div className="code-match">
                            <pre> {match.fragment} </pre>
                        </div>
                    </CardText>
                    <CardActions>
                        <RaisedButton label="Go to the repository!" target="_blank" href={match.repository.html_url}  primary={true}  />
                        <RaisedButton label="Go to the file!"  target="_blank" href={match.html_url}  primary={true}  />
                    </CardActions>
                </Card>

                )
            })}
        </div>
    )
}
};

export default  SearchCode;