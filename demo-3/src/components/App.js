import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';


class App extends React.Component{
   constructor(){
    super();
    this.state={
      fishes:{},
      order:{}
    }
    this.addFish=this.addFish.bind(this);
    this.loadSamples=this.loadSamples.bind(this);
    this.renderFishe=this.renderFishe.bind(this);
    this.addToOrder=this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
  }
  componentDidMount(){
         base.syncState(this.props.match.params.storeId+'/fishes',{
            context:this,
            state:'fishes'
     })

     let localStorageRef=localStorage.getItem('order-'+this.props.match.params.storeId);
     if(localStorageRef){
         this.setState({
             order:JSON.parse(localStorageRef)
         })
     }
  
  }
 componentWillUpdate(nextProps,nextState){
   localStorage.setItem('order-'+this.props.match.params.storeId, JSON.stringify(nextState.order))
 
 }
  addToOrder(key){
     let order=this.state.order;
     order[key]=order[key]+1 || 1 ;
     this.setState({order:order});
  }

  removeFromOrder(key) {
    const order = {...this.state.order};
    delete order[key];
    this.setState({ order });
  }


  addFish(fish){
   let timestamp=(new Date()).getTime();
   let fishes=this.state.fishes;
   fishes['fish-'+timestamp] = fish;
   this.setState({fishes:fishes});
  }

  updateFish(key, updatedFish) {
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
  }

  removeFish(key) {
    if(confirm('Are you sure you want to remove this fish?!')){

      const fishes = {...this.state.fishes};
      fishes[key] = null;
      this.setState({ fishes });
      }
    }
   
   loadSamples(){
     this.setState({
         fishes:sampleFishes
     })
   }
   renderFishe(key){
     return(
         <Fish 
         key={key} 
         index={key} 
         details={this.state.fishes[key]}
         addToOrder={this.addToOrder}
         />
     )
   }
   


    render(){
        return(
            <div className="catch-of-the-day">
               <div className="menu">
                 <Header tagline="Fresh Seafood Good"/>
                 <ul className="list-of-fishes">
                    {Object.keys(this.state.fishes).map(this.renderFishe)}
                 </ul>
               </div>
                <Order 
                fishes={this.state.fishes} 
                order={this.state.order}
                removeFromOrder={this.removeFromOrder}
                />
                <Inventory 
                addFish={this.addFish} 
                loadSamples={this.loadSamples}
                fishes={this.state.fishes}
                updateFish={this.updateFish}
                removeFish={this.removeFish}
                storeId={this.props.match.params.storeId}
                />
            </div>
        )
    }
}


export default App;