import { IMapPin, IMapPinGrouped, IFilters, IMapGrouping, IPinProps } from '../../types'
import { GROUPINGS } from './legacy.maps.groupings'

export const getGroupKey = (pin: IMapPin | IMapGrouping): string => {
  return `${pin.type}${pin.subType ? '-'+pin.subType:''}`
}

interface IMapGroups {
  [name: string]: IMapGrouping
}

const getMapGroups = (): IMapGroups => {
  const result: IMapGroups = {}
  GROUPINGS.forEach(p => {
    result[getGroupKey(p)] = {...p, icon: `map-${p.type}.svg`}
  })
  return result 
}

const GROUPS = getMapGroups()

export const groupPins = (mapPins: IMapPin[]): IMapPinGrouped => {
  const result: IMapPinGrouped = {}
  mapPins.forEach(p => {
    const id = getGroupKey(p)
    /* istanbul ignore else */
    if (!result[id]) result[id] = []
    result[id].push({...p, icon: `map-${p.type}.svg`}) // @todo: icons
  })
  return result 
}

export const unGroupPins = (pinsGrouped: IMapPinGrouped): IPinProps[] => {
  let result: IPinProps[] = []
  Object.keys(pinsGrouped).forEach(g => result.push(...pinsGrouped[g]))
  return result
}

export const getFilters = (pinsGrouped: IMapPinGrouped): IFilters => {
  let result: IFilters = {}
  Object.keys(pinsGrouped).map(g => result[g] = {
    grouping: GROUPS[g].grouping,
    name: g,
    displayName: GROUPS[g].displayName,
    type: GROUPS[g].type,
    icon: GROUPS[g].icon,
    _count: pinsGrouped[g].length,
    active: true
  })
  return result
}
