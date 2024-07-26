export enum Urls {
  HOME = '/',
  CHARACTER = '/character'
}

export const getCharacterUrl = (id: string) => `${Urls.CHARACTER}/${id}`

export enum ExternalUrls {
  GITHUB_REPO = ''
}
