"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function postEdit(newValues) {

    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/post/${newValues.id}`, {
          method: 'PUT',
          headers: {
            Cookie: cookies().toString(),
            "Content-type": "application/json",
          },
          body: JSON.stringify(newValues)
        })

        console.log('Response status:', res.status);
        console.log('Response headers:', res.headers.get('content-type'));

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
            method: 'DELETE',
            headers: {
                Cookie: cookies().toString(),
              },
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

export async function profileUpdate(id, newValues) {
    try {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${id}`, {
            method: 'PUT',
            headers: {
              Cookie: cookies().toString(),
              "Content-type": "application/json" 
            },
            body: JSON.stringify(newValues)
        })

        if (res.ok) { 
            console.log('SUCCESS UPDATE PROFILE')
            revalidatePath('/')
            return { success: true };
        } else {
            const errorData = await res.json()
            console.log('Error:', errorData.message);
            return { success: false, message: errorData.message }
        }
    } catch (error) {
        console.log(error);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}