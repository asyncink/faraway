import { makeAutoObservable } from 'mobx'
import { fetchSwapi, getSwapiId, SwapiEndpoints } from 'lib/swapi'
import { wait } from 'lib/wait'

import type { SwapiFilm } from 'types/domain'
import type { RootStore } from '.'

export class FilmStore {
  private readonly rootStore: RootStore
  public isFetching: boolean = false

  private films: Map<string, FilmModel> = new Map()

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore

    makeAutoObservable(this, {}, { autoBind: true })
  }

  public fetchById = async (id: string) => {
    if (this.films.has(id)) {
      return
    }

    this.isFetching = true

    const [{ data, error }] = await Promise.all([
      fetchSwapi<SwapiFilm>(`${SwapiEndpoints.FILMS}${id}`),
      wait(500)
    ])

    if (error || !data) {
      return
    }

    this.films.set(getSwapiId(data.url), new FilmModel(data))
    this.isFetching = false
  }

  public getById = (id: string) => {
    return this.films.get(id)
  }
}

export class FilmModel {
  public readonly id: string
  public title: string
  public year: string

  constructor(film: SwapiFilm) {
    this.id = getSwapiId(film.url)
    this.title = film.title
    this.year = film.release_date.split('-')[0]
  }
}
