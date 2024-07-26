export enum Urls {
  HOME = '/',
  CHARACTER = '/c'
}

export const getCharacterUrl = (id: string) => `${Urls.CHARACTER}/${id}`

export enum ExternalUrls {
  GITHUB_REPO = ''
}
