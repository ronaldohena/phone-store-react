import React, {Component} from 'react';
import Title from '../Title/Title';
import CartColumns from '../CardColumns/CartColumns';
import EmptyCard from './EmptyCard';
import {ProductConsumer } from '../Context';
import CardList from '../Card/CardList';
import CardTotals from './CardTotals';

export default class Card extends Component {
    render(){
        return(
            <section>
                <ProductConsumer>
                    {value =>{
                        const {cart} = value;
                        if(cart.length > 0) {
                            return(
                                <React.Fragment>
                                    <Title name="your" title="card" />
                                    <CartColumns />
                                    <CardList value={value}/>
                                    <CardTotals value={value} />
                                </React.Fragment>
                            )
                        } else {
                            return <EmptyCard />;
                        }
                    }}
                </ProductConsumer>
            </section>
        )
    }
}