import React from 'react';
import TodosListHeader from './todo-list-header';
import TodosListItem from './todo-list-item';

export default class TodosList extends React.Component{
   constructor(){
       super();
       this.renderItems=this.renderItems.bind(this);
   }
   renderItems(){
       let todos=this.props.todos;
       return  todos.map((todo,index)=>
         <TodosListItem 
            key={index} 
            {...todo} 
            toggleTask={this.props.toggleTask} 
            saveTask={this.props.saveTask}
            deleteTask={this.props.deleteTask}
            />
       )
           
       
   }
    render(){
        return(
            <table>
               <TodosListHeader />
               <tbody>
                 {this.renderItems()}
               </tbody>
            </table>
        )
    }
}