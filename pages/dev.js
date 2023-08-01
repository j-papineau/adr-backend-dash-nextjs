import React from 'react'
import Header from '@/components/Header'
import Error from '@/components/Error'


const Profile = () => {
  return (
    <div className='bg-gray-100 dark:bg-darculaBG-medium min-h-screen'>
      <Header title="Dev Area"/>
      <Error errorText={"This Page is still under production"}
      errorCaption={"If your name rhymes with bowl, fix this, bonobo"}/>
    </div>
  )
}

export default Profile

