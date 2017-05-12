import React from 'react';

export default class TodosListItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isEditing:false
        }
        this.onEditClick=this.onEditClick.bind(this);
        this.onCancleClick=this.onCancleClick.bind(this);
        this.onSaveClick=this.onSaveClick.bind(this);
    }

    onEditClick(){
        this.setState({
            isEditing:true
        })
    }

    onCancleClick(){
         this.setState({
            isEditing:false
        })
    }
    onSaveClick(event){
        event.preventDefault();

        const oldTask=this.props.task;
        const newTask=this.refs.editIput.value;
        this.props.saveTask(oldTask,newTask);
        this.setState({isEditing:false});
    }
   renderActionsSection(){
        if(this.state.isEditing){
            return (
                <td>
                   <button className="button-success" onClick={this.onSaveClick}>Save</button>
                   <button className="button-info" onClick={this.onCancleClick}>Cancel</button>
                </td>
            );
        }
        return (
           <td>
               <button className="button-primary" onClick={this.onEditClick}>Edit</button>
               <button className="button-danger" onClick={this.props.deleteTask.bind(this,this.props.task)}>Delete</button>
           </td>
        );
   }
    
     renderTaskSection(){
         const {task,isCompleted}=this.props;
         const taskStyle={
             color:isCompleted? 'green' : 'red' ,
             cursor:'pointer'
         }
         if(this.state.isEditing){
             return (
                 <td>
                   <form onSubmit={this.onSaveClick}>
                      <input type="text" defaultValue={task} ref="editIput"/>
                   </form>
                 </td>
             )
         }

         return(
               <td style={taskStyle} onClick={this.props.toggleTask.bind(this,task)}>
                 {this.props.task}
               </td>
         )
     }

    render(){
        return(
            <tr>
              {this.renderTaskSection()}
              {this.renderActionsSection()}
            </tr>   
        )
    }
}