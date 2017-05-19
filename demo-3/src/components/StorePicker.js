import React from 'react';
import PropTypes from 'prop-types';

class StorePicker extends React.Component{
  constructor(){
    super();

    this.goToStore=this.goToStore.bind(this)
  }

  goToStore(event){
    event.preventDefault();
    let storeId=this.refs.storeId.value;
    this.props.history.push('/learn-react/demo-3/build/store/'+ storeId)
  }
   
   

    render(){
        return (
           <form className="store-selector" onSubmit={this.goToStore}>
             <h2>Please Enter A Store</h2>
             <input type="text" ref="storeId" defaultValue="wellin" required/>
             <input type="submit"/>
           </form>
            
        )
    }
}

StorePicker.contextTypes = {
  router: PropTypes.object
}

export default StorePicker;