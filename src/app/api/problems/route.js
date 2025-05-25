import { getProblemData } from "../../lib/problem";


export async function POST(request) {
  try {
    const body = await request.json();
    const { problemNumber } = body;
    if (!problemNumber) {
      return new Response(JSON.stringify({ error: "problemNumber is required" }), { status: 400 });
    }

    const data = await getProblemData(problemNumber);
    // console.log(data)
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
