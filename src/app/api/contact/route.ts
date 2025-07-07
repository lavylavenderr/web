import DiscordWebhook from "discord-webhook-ts";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as {
            body: string;
            email: string;
            "cf-turnstile-response": string;
        };
        const getClientIp = (request: Request): string | undefined =>
            request.headers.get("X-Real-IP") ||
            request.headers.get("X-Forwarded-For")?.split(",")[0].trim() ||
            undefined;

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

        const discordWebhookClient = new DiscordWebhook(
            process.env.DISCORD_WEBHOOK!
        );
        const webhookReqBody = {
            embeds: [
                {
                    title: "Contact Form Submission",
                    color: 0x5865f2,
                    fields: [
                        {
                            name: "Email",
                            value: body.email,
                        },
                        {
                            name: "Message",
                            value: body.email,
                        },
                        {
                            name: "IP Address",
                            value: getClientIp(request) ?? "unknown!?",
                        },
                    ],
                    timestamp: new Date().toISOString(),
                },
            ],
        };

        await discordWebhookClient.execute(webhookReqBody);

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
