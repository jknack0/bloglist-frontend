import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if(!notification)
    return null

  return (
    <div className={notification.className}>
      {notification.message}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.object || null
}

export default Notification