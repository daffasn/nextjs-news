import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='pb-5 pt-10'>
      <h1 className='py-3 text-center font-semibold'>This website is designed with ❤ by <Link href="/" className="underline underline-offset-[1.4px]">Next Blog</Link> 2024.</h1>
    </div>
  )
}

export default Footer
