import React from 'react'
import ComingUp from "../Images/Coming_Up.jpg"


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
function OnlineOrders() {

  return (
    <div>
      <img src={ComingUp} alt="Coming Soon" className='mx-auto' />
    </div>
  )
}

export default OnlineOrders