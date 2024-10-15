import { signIn } from "next-auth/react"
import { Button, Typography } from "shadcn-ui"

export default function AccessDenied() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Typography variant="h1" className="mb-4">
                Access Denied
            </Typography>
            <Typography variant="body1" className="mb-4">
                You must be signed in to view this page
            </Typography>
            <Button
                onClick={(e) => {
                    e.preventDefault()
                    signIn()
                }}
            >
                Sign In
            </Button>
        </div>
    )
}
