import React from 'react'
import Sidebar from '../../../components/Sidebar'

const Transactions = () => {
  return (
    <div>
        <div className='row'>
            <div className='col-auto'>
                <Sidebar/>
            </div>
            <div className='col'>
                <h1 className='text-center'>Transactions</h1>
            </div>
        </div>
    </div>
  )
}

export default Transactions