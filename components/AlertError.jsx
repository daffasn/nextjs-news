import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"


const AlertError = ({children}) => {
    return (
        <div className="mb-3">
            <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
                {children}
            </AlertDescription>
            </Alert>
        </div>
    )
}

export default AlertError
