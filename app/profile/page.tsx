import CustomLink from "@/components/custom-link"
import SessionData from "@/components/session-data"
import { auth } from "@/auth"
import UserProfile from "@/components/user-profile"

export default async function Page() {
    const session = await auth()
    const user = session?.user
    // fetch profile data form /api/user/me
    // const response = await fetch('/api/user')
    // const userInfo = await response.json()


    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">User Profile</h1>
            {user ? (
                <>
                    <UserProfile user={user} />
                    <SessionData session={session} />
                </>
            ) : (
                <p>Please log in to view your profile.</p>
            )}
        </div>
    )
}
