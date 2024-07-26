import { makeAutoObservable } from 'mobx'
import { fetchSwapi, getSwapiId } from 'lib/swapi'

import type { SwapiResponse, SwapiCharacter } from 'types/domain'
import type { RootStore } from '.'

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

    const { data, error } = await fetchSwapi<SwapiResponse>(
      `/people?page=${this.page + 1}`
    )

    if (error || !data) {
      return
    }

    const { results, count } = data

    this.count = count
    results.forEach(character =>
      this.characters.set(
        getSwapiId(character.url),
        new CharacterModel(character, this.rootStore)
      )
    )
    this.isFetching = false
    this.page += 1
  }

  public fetchById = async (id: string) => {
    if (this.characters.has(id)) {
      return
    }

    this.isFetching = true

    const { data, error } = await fetchSwapi<SwapiCharacter>(`/people/${id}`)

    if (error || !data) {
      return
    }

    this.characters.set(
      getSwapiId(data.url),
      new CharacterModel(data, this.rootStore)
    )
    this.isFetching = false
  }

  public getById = (id: string) => {
    return this.characters.get(id)
  }

  public get items() {
    return Array.from(this.characters.values()).sort(
      (characterA, characterB) => Number(characterA.id) - Number(characterB.id)
    )
  }

  public get isFullyFetched() {
    return this.characters.size >= this.count && this.isInitiallyFetched
  }

  public get isInitiallyFetched() {
    return this.page > 0
  }
}

export class CharacterModel {
  private readonly rootStore: RootStore

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
  public homeworldId: string
  public filmIds: string[]
  public edited: Date

  constructor(data: SwapiCharacter, rootStore: RootStore) {
    this.rootStore = rootStore
    this.name = data.name
    this.height = data.height
    this.mass = data.mass
    this.hairColor = data.hair_color
    this.skinColor = data.skin_color
    this.eyeColor = data.eye_color
    this.birthYear = data.birth_year
    this.gender = data.gender
    this.homeworldId = getSwapiId(data.homeworld)
    this.filmIds = data.films.map(url => getSwapiId(url))
    this.created = new Date(data.created)
    this.edited = new Date(data.edited)
    this.url = data.url
    this.id = getSwapiId(data.url)
  }

  fetchFilms = async () =>
    Promise.all(this.filmIds.map(id => this.rootStore.filmStore.fetchById(id)))

  fetchHomeworld = async () =>
    this.rootStore.planetStore.fetchById(this.homeworldId)
}
