export async function generateCROReport(storeUrl: string) {
  const response = await fetch("/api/generate-cro-report", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ storeUrl }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to generate CRO report")
  }

  const data = await response.json()
  return data.report
}
