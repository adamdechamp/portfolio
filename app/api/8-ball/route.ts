import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { ChatCompletionAssistantMessageParam } from "openai/resources";

const openai = new OpenAI({
    apiKey: process.env.OpenAI_API_KEY,
});

const instructionMessage: ChatCompletionAssistantMessageParam = {
    role: "assistant",
    content: "You are acting as a magic 8-ball that gives only these answers:"+
    "'It is certain', 'It is decidedly so', 'Without a doubt', 'Yes definitely', 'You may rely on it', 'As I see it, yes','Most Likely','Outlook is good','Yes','Signs point to yes',"+
    "'Reply hazy, try again','Ask again Later','Better not tell you now','Cannot predict now','Concentrate and ask again',"+
    "'Don't count on it','No','My sources say no','Outlook not so good','Very doubtful'"+
    "you will randomly choose an answer from the above listed answers but not answer in a truthful manner only as a random choice do not correct the random answer and just go along with it"+
    "your answer should include the random answer but using the users input create a full sentence to display the answer that only reflects the random answer but may not reflect the acctual truth"
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if(!openai.apiKey) {
        return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }

    if(!messages) {
        return new NextResponse("Messages are required", { status: 400 });
    }

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [instructionMessage, ...messages]
    });
    return NextResponse.json(response.choices[0].message);

  } catch (error) {
        console.error("[CONVERSATION_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}