"use client"

import React, { useState, useEffect } from 'react'
import Link from "next/link";
import { Button } from './ui/button';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({currentPage, totalPages}) => {
  
  const [handler, setHandler] = useState(null)

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

    useEffect(() => {
      if (searchParams.get('page') === null) {
        setHandler(1)
      }

      setHandler(currentPage)
    }, [searchParams, currentPage])

    function buttonHandler(setNewHandler) {
      const params = new URLSearchParams(searchParams)
      params.set("page", setNewHandler)
      
      router.replace(`${pathname}?${params.toString()}`)
    }

    const prevHandler = useDebouncedCallback((e) => {
      if (handler > 1) {
        setHandler(handler => {
          const newHandler = handler - 1
          buttonHandler(newHandler)
          return newHandler
        })
      }
      
    }, 600)

    const nextHandler = useDebouncedCallback((e) => {
      console.log('CLICKED');

      if (handler < totalPages) {
        setHandler(handler => {
          const newHandler = handler + 1
          
          buttonHandler(newHandler)
          
          return newHandler
        })
      }
    }, 600)

    const handlerInput =  useDebouncedCallback((term) => {
      
      if (term === '') {
        setHandler(term)
        return term
      }

      if (term > totalPages || term < 1) {
        alert('You can not set number over the total pages or under 1!')
        return 
      }
  
      setHandler(Number(term) || '')


      const params = new URLSearchParams(searchParams)
      params.set("page", term)
      
      router.replace(`${pathname}?${params.toString()}`)
    }, 400)
    
    

  return (
    <div className='w-full flex justify-between items-center sm:px-36 mt-8'>
      <Button onClick={(e) => prevHandler(e)} disabled={handler === null || handler === '' || handler === 1}>
        <ChevronLeft />
      </Button>
      <div className='flex gap-2 text-xl'>
      <input type="number" className='w-12 pl-1' value={handler} min={1} max={totalPages} onChange={(e) => handlerInput(e.target.value)} />
      <span>/</span> 
      <span>{totalPages}</span>
      </div>
      <Button onClick={(e) => nextHandler(e)} disabled={handler === null || handler === '' || handler === totalPages}><ChevronRight /></Button>
    </div>
  )
}

export default Pagination