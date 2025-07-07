import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as {
            body: string;
            email: string;
            "cf-turnstile-response": string;
        };
        const getClientIp = (request: Request): string | null =>
            request.headers.get("X-Real-IP") ||
            request.headers.get("X-Forwarded-For")?.split(",")[0].trim() ||
            null;

        // CLOUDFLARE TURNSTILE CHECK START

        const cloudflareValidation = await fetch(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            {
                body: JSON.stringify({
                    secret: process.env.CF_TURNSTILE_SECRET,
                    response: body["cf-turnstile-response"],
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            }
        );
        const responseValidationBody = (await cloudflareValidation.json()) as {
            success: boolean;
        };

        if (!responseValidationBody.success)
            return NextResponse.json(
                { message: "Security check failed", success: false },
                { status: 400 }
            );

        // CLOUDFLARE VALIDATION END

        if (!body.email || !body["cf-turnstile-response"] || !body)
            return NextResponse.json(
                { message: "Invalid request", success: false },
                { status: 403 }
            );

        const result = await fetch(process.env.DISCORD_WEBHOOK!, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: "contact form submission",
                embeds: [
                    {
                        description: body,
                        author: { name: body.email },
                        fields: [
                            {
                                name: "ip",
                                value: getClientIp(request) ?? "unknown!?",
                            },
                        ],
                    },
                ],
            }),
        });

        console.log(result.status)

        if (result.status !== 204)
            return NextResponse.json(
                { message: "Error occured sending webhook", success: false },
                { status: 400 }
            );

        return NextResponse.json(
            { message: "OK", success: true },
            { status: 200 }
        );
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { message: "Unknown error has occured", success: false },
            { status: 500 }
        );
    }
}
