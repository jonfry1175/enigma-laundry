import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Button } from 'react-bootstrap'

const DashboardPage = () => {
  const selector = useSelector((state) => state.auth)

  const test = () => {
    console.log(selector)
  }

  return (
    <div className="container text-center fw-bold">
      <h1>Dashboard Page</h1>
      <Link to="/">Back to Home</Link>
      <Button onClick={test}>Get redux data</Button>
    </div>

  )
}

export default DashboardPage