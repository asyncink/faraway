import { createContext, useContext } from 'react'
import { makeAutoObservable } from 'mobx'

import { CharacterStore } from './character'

export class RootStore {
  public readonly characterStore: CharacterStore

  constructor() {
    this.characterStore = new CharacterStore(this)

    makeAutoObservable(this, {}, { autoBind: true })
  }
}

const rootStore = new RootStore()
const authStoreContext = createContext(rootStore)

export const useRootStore = (): RootStore => useContext(authStoreContext)
