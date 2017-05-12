import React from 'react';

export default class TodosListHeader extends React.Component{
    render(){
        return(
                <thead>
                  <tr>
                    <th className="theadTitle">Task</th>
                    <th className="theadTitle">Actions</th>
                  </tr>
                </thead>
        )
    }
}