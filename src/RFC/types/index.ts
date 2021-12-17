import { IMapPin } from './legacy'
export * from './legacy'

export interface IJson {[index: string]:any} 

export interface IMapFilter {
  group: string
  id: string
  displayName: string
  icon: string
  counter: number
}

export interface IMapControllerState {
  mapPins: IMapPin[]
  filteredPins: IMapPin[]
  filters: IMapFilter[]
}
