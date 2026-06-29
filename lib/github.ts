const baseUrl = "https://api.github.com"

export async function commitFile(
  path: string,
  content: string,
  message: string
) {
  const token = process.env.GITHUB_TOKEN!
  const owner = process.env.GITHUB_OWNER!
  const repo = process.env.GITHUB_REPO!

  const getFile = await fetch(
    `${baseUrl}/repos/${owner}/${repo}/contents/${path}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  let sha: string | undefined = undefined

  if (getFile.ok) {
    const data = await getFile.json()
    sha = data.sha
  }

  const encoded = Buffer.from(content).toString("base64")

  const response = await fetch(
    `${baseUrl}/repos/${owner}/${repo}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        content: encoded,
        sha,
      }),
    }
  )

  return response.json()
}