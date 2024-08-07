export async function onRequest(context) {
    // Access the environment variable
    const NODE_ENV = context.env.NODE_ENV;

    // Pass the environment variable to the React app
    return new Response(
        JSON.stringify({ NODE_ENV }),
        { headers: { 'Content-Type': 'application/json' } }
    );
}
