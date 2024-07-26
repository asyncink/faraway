import { createContext, useContext } from 'react'
import { makeAutoObservable } from 'mobx'

import { CharacterStore } from './character'
import { FilmStore } from './film'
import { PlanetStore } from './planet'

export class RootStore {
  public readonly characterStore: CharacterStore
  public readonly filmStore: FilmStore
  public readonly planetStore: PlanetStore

  constructor() {
    this.characterStore = new CharacterStore(this)
    this.filmStore = new FilmStore(this)
    this.planetStore = new PlanetStore(this)

    makeAutoObservable(this, {}, { autoBind: true })
  }
}

const rootStore = new RootStore()
const authStoreContext = createContext(rootStore)

export const useRootStore = (): RootStore => useContext(authStoreContext)
