import { neon } from "@neondatabase/serverless";

export async function handler(event) {

    const sql = neon(process.env.DATABASE_URL);

    if (event.httpMethod === "GET") {
        const notes = await sql`SELECT * FROM notes ORDER BY id DESC`;

        return {
            statusCode: 200,
            body: JSON.stringify(notes)
        };
    }

    if (event.httpMethod === "POST") {

        const data = JSON.parse(event.body);

        await sql`
      INSERT INTO notes (content)
      VALUES (${data.content})
    `;

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };
    }
}