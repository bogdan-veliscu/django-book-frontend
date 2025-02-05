import { auth } from "@/auth"
import { NextRequest } from "next/server"

// Review if we need this, and why
function stripContentEncoding(result: Response) {
    const responseHeaders = new Headers(result.headers)
    responseHeaders.delete("content-encoding")

    return new Response(result.body, {
        status: result.status,
        statusText: result.statusText,
        headers: responseHeaders,
    })
}

async function handler(request: NextRequest) {
    const session = await auth()

    const headers = new Headers(request.headers)
    headers.set("Authorization", `Bearer ${session?.accessToken}`)

    let backendUrl =
        process.env.THIRD_PARTY_API_EXAMPLE_BACKEND ??
        "https://third-party-backend.authjs.dev"

    let url = request.nextUrl.href.replace(request.nextUrl.origin, backendUrl)
    let result = await fetch(url, { headers, body: request.body })

    return stripContentEncoding(result)
}

export { handler as GET, handler as POST }

export async function generateStaticParams() {
    // Returning an empty array prevents any static pages from being generated for this route.
    // Note: This effectively means the "/auth" pages will never be generated statically.
    return [];
}
