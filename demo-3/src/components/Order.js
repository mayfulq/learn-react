import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'


class Order extends React.Component{
    constructor(){
        super();

        this.renderOrder=this.renderOrder.bind(this);
    }

    renderOrder(key){
      let fish=this.props.fishes[key];
      let count=this.props.order[key];
      const removeButton = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

      if(!fish){
          return <li key={key}>Sorry, fish no longer available! {removeButton}</li>
      }
       return(
           <li key={key}>
           <span>
          <CSSTransitionGroup
            component="span"
            className="count"
            transitionName="count"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}
          >
            <span key={count}>{count}</span>
          </CSSTransitionGroup>

          lbs {fish.name} {removeButton}
        </span>
            <span className="price">{'￥'+(count*fish.price/100)}</span>
           </li>
       )
    }


    render(){
        let orderIds=Object.keys(this.props.order);
        let total=orderIds.reduce((pre,key)=>{
            let fish=this.props.fishes[key];
            let count=this.props.order[key];

            let isAvailable=fish && fish.status==='available';

            if(fish && isAvailable){
                return pre + (count * parseInt(fish.price,10) || 0);
            }
            return pre;
        },0)
        return(
           <div className="order-wrap">
             <h2 className="order-title">Your Order</h2>
              <CSSTransitionGroup
                className="order"
                component="ul"
                transitionName="order"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
                >
                {orderIds.map(this.renderOrder)}
                <li className="total">
                   <strong>Total:</strong>
                   {'￥'+(total/100)}
                </li>
             </CSSTransitionGroup>
           </div>
        )
    }
}


Order.propTypes = {
  fishes: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  removeFromOrder: PropTypes.func.isRequired,
};

export default Order;