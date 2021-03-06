import React from 'react';
import PropTypes from 'prop-types';


class AddFishForm extends React.Component{
  constructor(){
    super();
    this.createFish=this.createFish.bind(this)
  }

  createFish(event){
     event.preventDefault();

     let fish={
        name:this.refs.name.value,
        price:this.refs.price.value,
        status:this.refs.status.value,
        desc:this.refs.desc.value,
        image:this.refs.image.value
     }
      
      this.props.addFish(fish);
      this.refs.fishForm.reset();
     
  }


  render(){
    return(
       <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
         <input type="text" ref="name" placeholder="Fish Name"/>
         <input type="text" ref="price" placeholder="Fish Price"/>
         <select ref="status">
             <option value="available">Fresh!</option>
             <option value="unavailable">Sold Out!</option>
         </select>
         <textarea type="text" ref="desc" placeholder="Desc"></textarea>
         <input type="text" ref="image" placeholder="URL to Image"/>
         <button type="submit">+ Add Item</button>
       </form>

    )
  }
}

AddFishForm.propTypes = {
  addFish: PropTypes.func.isRequired
}

export default AddFishForm;