import React from 'react';

export default class CreateTodo extends React.Component{

    constructor(props){
        super(props);
        this.state={
          error:null
        }

        this.handleCreate=this.handleCreate.bind(this);
    }


    handleCreate(event){
      event.preventDefault();
      const createInput=this.refs.createInput;
      const task=createInput.value;
      const validateInput=this.validateInput(task);
      console.log(!!validateInput);
      if(!!validateInput){
           this.setState({
              error:validateInput
          })    
      }else{
         this.setState({error:null});
         this.props.creatTask(task);
         this.refs.createInput.value='';
          }
    }

    validateInput(task){
        if(!task){
            return 'Please enter a task.';
        }else if(this.props.todos.find(todo=>todo.task===task)){
            return 'Task already exists.';
        }else{
            return null;
        }
    }
    
    renderError(){
      if(!this.state.error){
         return null;
      }
      return <div style={{color:'red'}}>{this.state.error}</div>;
    }


    render(){
        return(
            <form onSubmit={this.handleCreate}>
              <input type="text" placeholder="add something?" ref="createInput"/>
              <button className="button-success">Create</button>
              {this.renderError()}
            </form>

        )
    }
}