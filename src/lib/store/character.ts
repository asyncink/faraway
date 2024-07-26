import { makeAutoObservable } from 'mobx'
import { fetchSwapi, getSwapiId } from 'lib/swapi'

import type { SwapiResponse, SwapiCharacter } from 'types/domain'
import type { RootStore } from '.'

export class CharacterModel {
  public readonly id: string
  public readonly url: string
  public readonly created: Date

  public name: string
  public height: string
  public mass: string
  public hairColor: string
  public skinColor: string
  public eyeColor: string
  public birthYear: string
  public gender: string
  public homeworld: string
  public films: string[]
  public edited: Date

  constructor(data: SwapiCharacter) {
    this.name = data.name
    this.height = data.height
    this.mass = data.mass
    this.hairColor = data.hair_color
    this.skinColor = data.skin_color
    this.eyeColor = data.eye_color
    this.birthYear = data.birth_year
    this.gender = data.gender
    this.homeworld = data.homeworld
    this.films = data.films
    this.created = new Date(data.created)
    this.edited = new Date(data.edited)
    this.url = data.url
    this.id = getSwapiId(data.url)
  }

  update = () => {}
}

export class CharacterStore {
  private readonly rootStore: RootStore
  public isFetching: boolean = false

  private characters: Map<string, CharacterModel> = new Map()
  private count: number = 0
  private page: number = 0

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore

    makeAutoObservable(this, {}, { autoBind: true })
  }

  public fetch = async () => {
    if (this.isFullyFetched) {
      return
    }

    this.isFetching = true
    this.page += 1

    const { data, error } = await fetchSwapi<SwapiResponse>(
      `/people?page=${this.page}`
    )

    if (error || !data) {
      return
    }

    const { results, count } = data

    this.count = count
    results.forEach(character =>
      this.characters.set(
        getSwapiId(character.url),
        new CharacterModel(character)
      )
    )
    this.isFetching = false
  }

  public fetchById = async (id: string) => {
    if (this.characters.has(id)) {
      return
    }

    const { data, error } = await fetchSwapi<SwapiCharacter>(`/people/${id}`)

    if (error || !data) {
      return
    }

    this.characters.set(getSwapiId(data.url), new CharacterModel(data))
  }

  public getById = (id: string) => {
    return this.characters.get(id)
  }

  public get isFullyFetched() {
    return this.characters.size >= this.count && this.page !== 0
  }

  public get items() {
    return Array.from(this.characters.values())
  }
}
