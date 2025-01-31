import React from 'react'
import Header from '../component/Header'
import ConnectOES from '../component/ConnectOES'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <Header />
      <ConnectOES />
    </div>
  )
}

export default page