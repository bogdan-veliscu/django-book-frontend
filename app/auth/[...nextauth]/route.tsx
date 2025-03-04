import { handlers } from "@/auth"
export const { GET, POST } = handlers

export async function generateStaticParams() {
    return [];
}