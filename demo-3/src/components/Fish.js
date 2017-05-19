import React from 'react';
import PropTypes from 'prop-types';

class Fish extends React.Component{
     constructor(){
         super();

         this.onButtonClick=this.onButtonClick.bind(this);
     }

     onButtonClick(){
         let key=this.props.index;
         this.props.addToOrder(key);
     }



     render(){
         let details=this.props.details;
         let isAvailable=(details.status==='available' ? true : false);
         let buttonText=(isAvailable ? 'Add To Order' : 'Sold Out!');
         return(
             <li className="menu-fish">
                 <img src={details.image} alt="details.name"/>
                 <h3 className="fish-name">
                    {details.name}
                    <span className="price">{'￥'+(details.price)/100}</span>
                 </h3>
                 <p>{details.desc}</p>
                 <button disabled={!isAvailable} onClick={this.onButtonClick}>{buttonText}</button>
             </li>
         )
     }
 }

 Fish.propTypes = {
  details: PropTypes.object.isRequired,
  index: PropTypes.string.isRequired,
  addToOrder: PropTypes.func.isRequired
};

export default Fish;