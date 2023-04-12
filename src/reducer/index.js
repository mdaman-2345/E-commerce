

const initialState={
    users: [],
    user: null,
price:0,
address:{},
cart: {},
}

export const reducer=(state=initialState,action)=>{
    switch(action.type){

        case "REGISTER":
            return{
                ...state,
                users: [...state.users,action.payload]
            }
        case "LOGIN":
            return{
                ...state,
                user:action.payload
            }

        case "LOGOUT":
            return{
                ...state,
                user:null,
                address:{},
                // price:0

            }

        case "PRICE":
            // console.log(action.payload.price);
            return{
                ...state,
                price:action.payload.price
            }

            case "ADDTOCART": {
                const id=action.payload.id;
                
                console.log(id in state.cart);
                let value;
                
                if(id in state.cart){
                    console.log(state.cart);
                    value=state.cart[id];
                    value=value+1;
                    return{
                        ...state,
                        cart:{...state.cart,[id]:value}
                    }
                }
                else{
                    value=1;
                    return{
                        ...state,
                        cart:{...state.cart,[id]:value}
                    }   
                }
                
            }
                

                case "REMOVEFROMCART":
                    const id2=action.payload.id;
                    
                    console.log(id2 in state.cart);
                    let value2;
                    
                    if(id2 in state.cart){
                        console.log(state.cart);
                        value2=state.cart[id2];
                        if(value2<1){
                        
                         return{
                                ...state
                        }}
                        value2=value2-1;
                        return{
                            ...state,
                            cart:{...state.cart,[id2]:value2}
                        }
                    }
                    else{
                        return{
                            ...state,
                        }   
                    }
                

        case "ADDRESS":
            console.log(action.payload);
            return{
                ...state,
                address:action.payload
            }

        case "ADD":
            console.log(action.payload);
            return{
                ...state,
                products:[...state.products,action.payload]
            }
            

        default :
            return state;
    }
}

export default reducer;

// export default createStore(reducer);

