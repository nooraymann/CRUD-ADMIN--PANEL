import React from 'react'
import axios from 'axios';

export function Services() {
 let baseUrl="https://seoudi-django-render-app.onrender.com/orders/";

function create(order){
 return axios.post(baseUrl,order).then(res=>res.data);
}
function readAll(){
  return axios.get(baseUrl).then(res=>res.data);
 }
 function update(order){
  return axios.put(baseUrl+ order.orderNumber,order).then(res=>res.data);
 }
 function deleteorder(id){
  return axios.put(baseUrl+ id).then(res=>res.data);
 }

}
