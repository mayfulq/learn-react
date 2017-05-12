const css=require('./app.scss');

import React from 'react';
import { render } from 'react-dom';
import TodosList from './todo-list';
import CreateTodo from './create-todo';

const todos=[
    {
        task:'shopping',
        isCompleted:false
    },
    {
        task:'eating',
        isCompleted:true
    }
]

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state={ todos };
        this.creatTask=this.creatTask.bind(this);
        this.toggleTask=this.toggleTask.bind(this);
        this.saveTask=this.saveTask.bind(this);
        this.deleteTask=this.deleteTask.bind(this);
    }


    creatTask(task){
        this.state.todos.push({
            task,
            isCompleted:false
        })
        this.setState({
            todos:this.state.todos
        })
    }

    toggleTask(task){
        const fundTodo=this.state.todos.find(todo=>todo.task===task);
        fundTodo.isCompleted=!fundTodo.isCompleted;
        this.setState({todos:this.state.todos});
    }

    saveTask(oldTask,newTask){
        const foundTodo=this.state.todos.find(todo=>todo.task===oldTask);
        foundTodo.task=newTask;
        this.setState({todos:this.state.todos});
    }

    deleteTask(taskDelete){
        let arr=this.state.todos.slice();
        const fundTodoIndex=arr.findIndex(todo=>todo.task===taskDelete);
        arr.splice(fundTodoIndex,1);
        this.setState({todos:arr})
    }
    render(){
        return(
            <div>
                <h1 className="appTitle">React ToDos App</h1>
                <CreateTodo todos={this.state.todos} creatTask={this.creatTask} />
                <TodosList 
                   todos={this.state.todos} 
                   toggleTask={this.toggleTask} 
                   saveTask={this.saveTask}
                   deleteTask={this.deleteTask}
                   />
            </div>
        )
    }
}



render(<App />,document.getElementById('app'));



















