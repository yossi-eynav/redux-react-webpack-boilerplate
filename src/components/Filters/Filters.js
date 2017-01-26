import React from 'react'
import './Filters.scss';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider';


const Filters = ({users, repositories, setFilter, filters}) => {
    return (
        <div>
        <h2>Filters</h2>
                <div className="filters">

        <SelectField className="filter"
                    floatingLabelText="Username:"
                    value={filters.get('username')}
                    onChange={(event,index, value) => {
                        setFilter('username', value)
                    }}
                >
                    <MenuItem value="" primaryText="All" />
                    {users.map(user =>  <MenuItem value={user.login} primaryText={user.login} /> )}
                </SelectField>

                <SelectField className="filter"
                    floatingLabelText="Repositories:"
                    value={filters.get('repository')}
                    onChange={(event,index, value) => {
                        setFilter('repository', value)
                    }}
                >
                    <MenuItem value="All" primaryText="All" />
                    {repositories.map(repo =>  <MenuItem value={repo.name} primaryText={repo.name} /> )}
                </SelectField>


                 <SelectField className="filter"
                     floatingLabelText="Status:"
                    value={filters.get('state')}
                    onChange={(event,index, value) => {
                    setFilter('state', value)
                    }}
                >
                    <MenuItem value="All" primaryText="All" />
                    <MenuItem value="open" primaryText="Open" />
                    <MenuItem value="closed" primaryText="Closed" />
                </SelectField>          
    
        </div>
        <Divider />
        </div>
    )
}

export default Filters;