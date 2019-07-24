import React, {Component} from 'react';
import { dataStore, detailProduct } from './Data/Data';


const ProductContext = React.createContext();
//Provider
//Consumer
class ProductProvider extends Component{

    state = {
        products: [], 
        detailProduct: detailProduct,
        cart:[],
        modalOpen: false,
        modalProduct: detailProduct,
        cartSubtotal: 0,
        cartTax: 0,
        cartTotal: 0

    }
    componentDidMount(){
        this.setProduct();
    }
    
    setProduct = () => {
        let tempProducts = [];
        dataStore.forEach(item =>{
            const singleItem = {...item};
            tempProducts = [...tempProducts, singleItem];
        })
        this.setState(() =>{
            return{products: tempProducts}
        })
    }

    getItem = (id) =>{
        const product = this.state.products.find(item => item.id === id);
        return product;
    }

    handleDetail =(id) =>{
        const product = this.getItem(id)
        this.setState(() =>{
            return{detailProduct: product}
        })
    }

    addToCard = id =>{
        let tempProducts = [...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.incard = true;
        product.count = 1;
        const price = product.price;
        product.total = price;

        this.setState(()=>{
            return{products:tempProducts, cart:[...this.state.cart, product]}
        }, ()=>{
            this.addTotals();
        })
    };


    openModal = (id) =>{
        const product = this.getItem(id);
        this.setState(()=>{
            return{modalProduct:product, modalOpen:true}
        })
    }

    closeModal = () =>{
        this.setState(()=>{
            return{modalOpen:false}
        })
    }

    increment = (id) =>{
        let cartTemp = [...this.state.cart];
        const selectProduct = cartTemp.find(item => item.id === id);

        const index = cartTemp.indexOf(selectProduct);
        const product = cartTemp[index];

        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(()=>{
            return{
                cart: [...cartTemp]
            }
        }, ()=>{
           this.addTotals(); 
        })
    }

    decrement = (id) =>{
        let cartTemp = [...this.state.cart];
        const selectProduct = cartTemp.find(item => item.id === id);

        const index = cartTemp.indexOf(selectProduct);
        const product = cartTemp[index];

        product.count = product.count - 1;
        
        if(product.count === 0){
            this.removeItem(id);
        }else{
            product.total = product.count * product.price;

            this.setState(()=>{
                return{
                    cart: [...cartTemp]
                }
            }, ()=>{
               this.addTotals(); 
            }) 
        }
    }

    removeItem = (id) =>{
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart];

        tempCart = tempCart.filter(item => item.id !== id);
        const index = tempProducts.indexOf(this.getItem(id));

        let removeProduct = tempProducts[index];

        removeProduct.incard = false;
        removeProduct.count = 0;
        removeProduct.total = 0;

        this.setState(()=>{
            return{
                cart:[...tempCart],
                products: [...tempProducts]
            }
        },()=>{
            this.addTotals();
        })
    }

    clearCart = (id) =>{
        this.setState(()=>{
            return {cart: []}
        },() =>{
            this.setProduct();
            this.addTotals();
        })
    }

    addTotals = () =>{
        let subTotal = 0;
        this.state.cart.map(item =>(subTotal += item.total));
        const tempTax = subTotal * 0.2;
        const tax = parseFloat(tempTax.toFixed(2));
        const total = subTotal + tax;

        this.setState(()=>{
            return{
                cartSubtotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }

    // tester = () =>{
    //     console.log('state products:', this.state.products[0].incard);
    //     console.log('data products:', dataStore[0].incard);

    //     const tempProducts = [...this.state.products];
    //     tempProducts[0].incard = true
    //     this.setState(() => {
    //         return{products: tempProducts}
    //     }, () =>{
    //         console.log('state products:', this.state.products[0].incard);
    //         console.log('data products:', dataStore[0].incard);
    //     })
    // }
    render(){
        return(
            <ProductContext.Provider 
                value={{
                    ...this.state,
                    handleDetail: this.handleDetail,
                    addToCard: this.addToCard,
                    openModal: this.openModal,
                    closeModal: this.closeModal,
                    increment : this.increment,
                    decrement : this.decrement,
                    removeItem : this.removeItem,
                    clearCart : this.clearCart
                }}> 
                {this.props.children}
            </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider, ProductConsumer};