import { auth } from "@/auth";
import CreateArticleForm from "@/components/article-form";
import { SessionProvider } from "next-auth/react";

export default async function CreateArticlePage() {
    const session = await auth();
    if (!session?.user) {
        // Redirect to login page or show unauthorized message
        return <p>Please log in to create an article.</p>;
    }

    return (
        <SessionProvider basePath={"/auth"} session={session}>
            <main className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">Create New Article</h1>
                <CreateArticleForm />
            </main>
        </SessionProvider>
    );
}
