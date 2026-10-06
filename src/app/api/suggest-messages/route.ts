import { streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export const runtime = "edge";

export async function POST(req: Request) {

    if (!process.env.GOOGLE_AI_KEY) {
        return Response.json(
            {
                success: false,
                error: "GOOGLE_GENERATIVE_AI_API_KEY missing hai .env.local mein",
            },
            { status: 500 }
        );
    }

    const google = createGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_AI_KEY,
    });

    try {

        const prompt =
            "Generate exactly 3 short, fun, natural and engaging anonymous messages for an anonymous social messaging platform called Tellem. " +
            "These messages should feel like something a real person would anonymously send to a friend, crush, or someone they know. " +
            "Mix different vibes such as playful, curious, wholesome, slightly teasing, complimenting, or 'be honest' style messages. " +
            "Keep them casual and Gen-Z friendly, not formal or robotic. " +
            "Use emojis naturally where they fit. " +
            "Avoid sexual, explicit, hateful, abusive, political, or highly personal/sensitive topics. " +
            "Do not ask for private information. " +
            "Messages should encourage the receiver to respond or reveal something fun about themselves. " +
            "Keep each message short, preferably under 12 words. " +
            "Return ONLY the 3 messages as a single string separated by '||'. " +
            "Do not number them, do not add quotation marks, and do not add any explanation. " +
            "Examples of the desired style: " +
            "'Be honest 👀 who was your last crush?||What’s one thing you secretly love but pretend you don’t? 😂||What’s your biggest green flag? 💚'";

        const response = await streamText({
            model: google("gemini-2.5-flash"),
            prompt,
            temperature: 1.5,
        });

        return response.toTextStreamResponse();

    } catch (error: any) {

        console.error("Gemini Error:", error);

        return Response.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}