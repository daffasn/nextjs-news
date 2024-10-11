import React from 'react'
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const FormButton = ({loading, children}) => {
    return (
        <div>
            {loading ? (
                <Button disabled className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                </Button>
            ) : (
                <Button className="w-full">{children}</Button>
            )}
        </div>
        
      )
}

export default FormButton
