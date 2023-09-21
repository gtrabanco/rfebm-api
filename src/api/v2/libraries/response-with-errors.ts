export function responseWithErrors(
  errors: string[] = ["Unknown error"],
  code = 400,
  addtionalHeaders: Record<string, string> = {},
) {
  if (code < 400 || code > 499)
    return new Response(undefined, {
      status: 500,
    });

  return new Response(
    JSON.stringify({
      errors,
    }),
    {
      status: code,
      headers: {
        ...addtionalHeaders,
        "Content-Type": "application/json",
      },
    },
  );
}
