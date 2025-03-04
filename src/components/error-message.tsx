export default function ErrorMessage({ message }: { message: string }) {
    return (
        <div className="flex items-center justify-center p-4 text-red-500">
            <p>{message}</p>
        </div>
    );
} 