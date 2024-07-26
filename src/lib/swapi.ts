const API_ORIGIN = 'https://swapi.dev/api'

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

    if (response.status !== 200) {
      throw new Error()
    }

    const data = await response?.json()

    return { data, error: null }
  } catch {
    return {
      data: null,
      error: new Error(
        `Swapi failed with ${response?.status || 'unknown'} code on endpoint ${endpoint}`
      )
    }
  }
}

export const getSwapiId = (url: string) => {
  const parts = url.split('/')

  return parts[parts.length - 2]
}

export const enum SwapiEndpoints {
  PEOPLE_BY_PAGE = '/people?page=',
  PEOPLE = '/people/',
  FILMS = '/films/',
  PLANETS = '/planets/'
}
