const css=require('./app.scss');

import React from 'react';
import ReactDOM from 'react-dom';


class Comment extends React.Component{
    constructor(){
        super();
        this.state=({
            editing:false,
        })
        this.edit=this.edit.bind(this);
        this.remove=this.remove.bind(this);
        this.save=this.save.bind(this);
    }
    edit(){
        this.setState({editing:true});
    }
     remove(){
        this.props.removeCommentText(this.props.index);
    }
     save(){
         let val=this.newText.value;
         this.props.updateCommentText(val,this.props.index);
        this.setState({editing:false});
    }
     
     renderNormal(){
         return(
            <div className="commentContainer">
                <div className="commentText">{this.props.children}</div>
                <button onClick={this.edit} className="button-primary">Edit</button>
                <button onClick={this.remove} className="button-danger">Del</button>
            </div>
        )
     }
     
     renderForm(){
         return(
            <div className="commentContainer">
               <textarea ref={input=>{this.newText=input}} defaultValue={this.props.children}></textarea>
                <button onClick={this.save} className="button-success">Save</button>
            </div>
        )
     }
    render(){
        if(this.state.editing){
            return this.renderForm();
        }else{
            return this.renderNormal();
        }
    }
}

class Board extends React.Component{
    constructor(){
        super();
        this.state=({
            comments:[
                // 'TODO:1',
                // 'TODO:2',
                // 'TODO:3'
            ]
        })
        this.removeComment=this.removeComment.bind(this);
        this.updateComment=this.updateComment.bind(this);
        this.eachComment=this.eachComment.bind(this);
        this.add=this.add.bind(this,'Default Text');
    }
    add(item){
        let arr=this.state.comments.slice();
        arr.push(item);
        this.setState({comments:arr})
    }
    removeComment(i){
        let arr=this.state.comments.slice();
            arr.splice(i,1);
            this.setState({comments:arr})
    }
    updateComment(newItem,i){
       let arr=this.state.comments.slice();
       arr[i]=newItem;
       this.setState({comments:arr})
    }
    eachComment(item,i){  
        return (<Comment key={i} index={i} updateCommentText={this.updateComment} removeCommentText={this.removeComment}>
                {item}
                </Comment>)  
    }
    render(){
        return(
            <div>
              <button onClick={this.add} className="button-info">Add New</button>
              <div className="board">
               {this.state.comments.map(this.eachComment)}
             </div>
            </div>
        )
        
    }
}

ReactDOM.render(
     <Board />,
    document.getElementById('root')
)




















