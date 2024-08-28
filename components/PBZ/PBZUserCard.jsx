import React, { useEffect } from 'react'

const PBZUserCard = ({obj}) => {
  useEffect(() => {
    console.log(obj)
  }, [])

  return (
    <div>{obj[1].name}</div>
  )
}

export default PBZUserCard