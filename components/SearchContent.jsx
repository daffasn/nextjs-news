"use client"

import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button';
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';

const SearchContent = () => {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    
    const params = new URLSearchParams(searchParams)
    params.set("page", 1)
    
    if (term) {
      params.set("query", term)
    } else {
      params.delete("query")
    }

    router.replace(`${pathname}?${params.toString()}`)
  }, 500)


  return (
    <div className='mb-10'>
        <Input placeholder={pathname === '/dashboard' ? "Search something by title..." : "Search something by title or author..."} className="text-md md:text-xl py-5" onChange={(e) => handleSearch(e.target.value)} defaultValue={searchParams.get("query")?.toString() || ''} />
    </div>
  )
}

export default SearchContent