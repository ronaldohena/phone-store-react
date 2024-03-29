import React, {Component} from 'react';

//components
import Product from '../Product/Product';
import Title from '../Title/Title';
//import {dataStore} from '../Data/Data';
import { ProductConsumer } from '../Context';

export default class ProductList extends Component {

    // state={
    //     products: dataStore
    // }

    render(){

        // console.log(this.state.products);
        return(
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title name="our" title="products" />
                        <div className="row">
                            <ProductConsumer>
                                {value=>{
                                   return value.products.map(product =>{
                                       return <Product key={product.id} 
                                       product={product} />
                                   })
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            // <Product />
        )
    }
}