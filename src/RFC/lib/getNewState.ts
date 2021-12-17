import { IMapPin } from 'src/models'
import { getFilters, IMapFilter } from './getFilters'
export interface IMapControllerState {
  mapPins: IMapPin[]
  filteredPins: IMapPin[]
  filters: IMapFilter[]
}

type IAction = 
| { type: "SET_DATA", payload: IMapPin[] }

const getFilteredPins = (mapPins: IMapPin[], filters: IMapFilter[]): IMapPin[] => {
  return mapPins // @wip
}

export const getNewState = (actualState: IMapControllerState, action: IAction): IMapControllerState =>  {
  let newState = { ...actualState }; 

  switch (action.type) {
    case "SET_DATA":
      const dataFilters = getFilters(action.payload)
      const userFilters = [] // @wip
      const filteredPins = getFilteredPins(action.payload, userFilters)
      newState = {...actualState, mapPins: action.payload, filteredPins, filters:dataFilters }     
      break;
  }
  return newState
}
