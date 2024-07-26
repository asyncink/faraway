const API_ORIGIN = 'https://swapi.dev/api/'

export const fetchSwapi = async <Result>(
  endpoint: string
): Promise<{
  data: Result | null
  error: Error | null
}> => {
  let response: Response | null = null

  try {
    response = await fetch(`${API_ORIGIN}${endpoint}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
  } catch {}

  let data = null

  try {
    const json = await response?.json()

    data = json ?? null
  } catch {}

  let error = null

  if (response?.status !== 200) {
    error = new Error(
      `Swapi failed with ${response?.status || 'unknown'} code on endpoint ${endpoint}`
    )
  }

  return { data, error }
}

export const getSwapiId = (url: string) => {
  const parts = url.split('/')

  return parts[parts.length - 2]
}
