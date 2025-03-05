import { NextResponse } from "next/server";

type ContactData = {
  email: string;
  body: string;
};

export async function POST(request: Request) {
  try {
    const { email, body } = (await request.json()) as ContactData;
    const userIp = request.headers.get("x-forwarded-for") as string;

    if (!email || !body)
      return NextResponse.json(
        { message: "Invalid request", success: false },
        { status: 400 }
      );

    const result = await fetch(process.env.DISCORD_WEBHOOK!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: "contact form submission",
        embeds: [
          {
            description: body,
            author: { name: email },
            fields: [{ name: "ip", value: userIp ?? "unknown!?" }],
          },
        ],
      }),
    });

    if (result.status !== 204)
      return NextResponse.json(
        { message: "Error occured sending webhook", success: false },
        { status: 400 }
      );

    return NextResponse.json({ message: "OK", success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Unknown error has occured", success: false },
      { status: 500 }
    );
  }
}
