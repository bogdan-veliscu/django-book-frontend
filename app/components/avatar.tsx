type Props = {
    name: string;
    image: string;
};

const Avatar = ({ name, image }: Props) => {
    return (
        <div className="flex items-center space-x-4">
            <a href="profile.html">
                <img
                    src={image || 'http://i.imgur.com/Qr71crq.jpg'}
                    alt="Author profile"
                    className="w-12 h-12 rounded-full"
                />
            </a>
            <div className="info">
                <a href="" className="author text-lg font-semibold text-gray-800 hover:underline">
                    {name || 'Anonymous'}
                </a>
            </div>
        </div>
    );
}

export default Avatar;