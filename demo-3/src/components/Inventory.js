import React from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import base from '../base';


class Inventory extends React.Component{
    constructor(){
        super();
        this.state={
           uid: null,
           onwer: null
        }
         this.renderInventory=this.renderInventory.bind(this);
         this.handleChange = this.handleChange.bind(this);
         this.renderLogin=this.renderLogin.bind(this);
         this.authenticate = this.authenticate.bind(this);
         this.authHandler= this.authHandler.bind(this);
         this.logout=this.logout.bind(this);
    }
     
     componentDidMount(){
       base.onAuth(user=>{
         if(user){
           this.authHandler(null,{user});
         }
       })
     }

     handleChange(e, key) {
    const fish = this.props.fishes[key];
    // take a copy of that fish and update it with the new data
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value
    }
    this.props.updateFish(key, updatedFish);
  } 
    
    authenticate(provider){
      console.log(`Trying to log in with ${provider}`);
      base.authWithOAuthPopup(provider,this.authHandler);
    }
    
    authHandler(err,authData){
      console.log(authData);
      if(err){
        console.log(err);
        return;
      }

      const storeRef=base.database().ref(this.props.storeId);
      console.log(storeRef)

      storeRef.once('value',(snapshot)=>{
        const data=snapshot.val() || {};
        
        if(!data.onwer){
          storeRef.set({
            onwer:authData.user.uid
          });
        }

        this.setState({
          uid:authData.user.uid,
          onwer:data.onwer || authData.user.uid
        });
      });





    }



    renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github" onClick={() => this.authenticate('github')}>Log In with Github</button>
      </nav>
    )
  }
    
    logout() {
    base.unauth();
    this.setState({ uid: null });
  }



    renderInventory(key){
      const fish=this.props.fishes[key];
      return(
         <div className="fish-edit" key={key}>
        <input type="text" name="name" value={fish.name} placeholder="Fish Name" onChange={(e) => this.handleChange(e, key)} />
        <input type="text" name="price" value={fish.price} placeholder="Fish Price"  onChange={(e) => this.handleChange(e, key)}/>

        <select type="text" name="status" value={fish.status} placeholder="Fish Status" onChange={(e) => this.handleChange(e, key)}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>

        <textarea type="text" name="desc" value={fish.desc} placeholder="Fish Desc" onChange={(e) => this.handleChange(e, key)}></textarea>
        <input type="text" name="image" value={fish.image} placeholder="Fish Image" onChange={(e) => this.handleChange(e, key)}/>
        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
      </div>
      )
    }

    render(){

      const logoutButton=<button onClick={this.logout}>Log Out!</button>


      if(!this.state.uid){
        return(
          <div>{this.renderLogin()}</div>
        )
      }

      if(this.state.uid !==this.state.onwer){
        return (
          <div>
          <p>Sorry, you aren't the onwer of the store</p>
          {logoutButton}
          </div>
        )
      }


        return(
           <div>
              <h2>Inventory</h2>
              {logoutButton}
              {Object.keys(this.props.fishes).map(this.renderInventory)}
              <AddFishForm {...this.props}/>
              <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
           </div>
        )
    }
}


Inventory.propTypes = {
  fishes: PropTypes.object.isRequired,
  updateFish: PropTypes.func.isRequired,
  removeFish: PropTypes.func.isRequired,
  addFish: PropTypes.func.isRequired,
  loadSamples: PropTypes.func.isRequired
};

export default Inventory;