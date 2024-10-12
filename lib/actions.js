"use server"

import { revalidatePath } from "next/cache"

export async function postEdit(newValues) {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/post/${newValues.id}`, {
          method: 'PUT',
          headers: {
            "Content-type": "application/json" 
          },
          body: JSON.stringify(newValues)
        })

        if (res.ok) { 
            console.log('SUCCESS EDIT DATA')
            revalidatePath('/')
            return true
          } else {
            const errorData = await res.json()
            return false
          }
    } catch (error) {
        console.log(error)
    }
}

export async function postDelete(id) {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/post/${id}`, {
            method: 'DELETE'
        })
  
        if (res.ok) { 
            console.log('SUCCESS DELETE DATA')
            revalidatePath('/')
            return true
        } else {
            const errorData = await res.json()
            return false
        }
    } catch (error) {
        console.log(error)
    }
}