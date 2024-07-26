import { makeAutoObservable } from 'mobx'
import { fetchSwapi, getSwapiId } from 'lib/swapi'
import { wait } from 'lib/wait'

import type { SwapiPlanet } from 'types/domain'
import type { RootStore } from '.'

export class PlanetStore {
  private readonly rootStore: RootStore
  public isFetching: boolean = false

  private planets: Map<string, PlanetModel> = new Map()

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore

    makeAutoObservable(this, {}, { autoBind: true })
  }

  public fetchById = async (id: string) => {
    if (this.planets.has(id)) {
      return
    }

    this.isFetching = true

    const [{ data, error }] = await Promise.all([
      fetchSwapi<SwapiPlanet>(`/planets/${id}`),
      wait(700)
    ])

    if (error || !data) {
      return
    }

    this.planets.set(getSwapiId(data.url), new PlanetModel(data))
    this.isFetching = false
  }

  public getById = (id: string) => {
    return this.planets.get(id)
  }
}

export class PlanetModel {
  public readonly id: string
  public name: string

  constructor(planet: SwapiPlanet) {
    this.id = getSwapiId(planet.url)
    this.name = planet.name
  }
}
