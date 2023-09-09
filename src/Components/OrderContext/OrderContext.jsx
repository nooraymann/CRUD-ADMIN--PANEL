import { createContext, useEffect, useState } from "react";
import {Services} from "../Services/Services";


export const OrderContext =createContext();
export const  OrderContextProvider=(props)=>{
    let services=new Services();
    const [orders, setOrders] = useState([]);
    const [editOrder, seteditOrder] = useState(null)
    useEffect(() => {
      services.readAll().then(data=>setOrders(data));
    }, [])
    
    const createOrder=(order)=>{
        services.create(order).then(data=>setOrders([...orders,data]))
    }
    const deleteOrder=(id)=>{
        services.deleteOrder(id).then(()=>setOrders(orders.filter((o)=>o.orderNumber !==id)))
    }
    const findOrder=(id)=>{
       const order=orders.find((o)=>o.orderNumber===id)
       seteditOrder(order)
    }
    const updateOrder=(order)=>{
        services.update(order).then(data=>setOrders(orders.map((o=>o.orderNumber===order.orderNumber?data:order))))
        seteditOrder(null);
    }
return(

   < OrderContext.Provider value={{createOrder,deleteOrder,findOrder,updateOrder,editOrder,orders}}>
   {props.children}
   </OrderContext.Provider>
)
}
