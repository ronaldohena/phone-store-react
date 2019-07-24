import React from 'react';
import CardItem from './CardItem';


export default function CardList({value}){
    const {cart} = value;
    console.log(value, cart);

    return (
        <div className="container-fluid">
            {cart.map(item =>{
                return <CardItem key={item.id} item={item} 
                value={value} />;
            })}
        </div>
    )
} 