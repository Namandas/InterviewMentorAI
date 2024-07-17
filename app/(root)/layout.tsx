
import Header from '@/components/shared/Header'
import React from 'react'

const layout = ({children} : {children : React.ReactNode}) => {
  return (
    <div>
      <Header/>
      {children}
    </div>
    
  )
}

export default layout
