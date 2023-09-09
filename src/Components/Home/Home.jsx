import React from 'react'
import styles from './Home.module.css'
import { Link } from 'react-router-dom'
import Table from '../Table/Table'

export default function Home() {
  return <>
   <div className="create-button m-4 ">
    <Link className="btn px-4 bg-success text-white float-end" to="create"> New Order</Link>
    <div className="clearfix"></div>

   </div>
   <Table/>
   
  </>
}
