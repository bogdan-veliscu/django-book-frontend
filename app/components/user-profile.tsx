import React from 'react'

type UserProfileProps = {
    user: {
        name: string
        email: string
        image: string
    }
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
    return (
        <div className="space-y-2">
            <img
                className="w-24 h-24 rounded-full"
                src={user.image}
                alt={user.name}
            />
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
        </div>
    )
}

export default UserProfile