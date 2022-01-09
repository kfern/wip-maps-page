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
  });
  return result; 
}

const GROUPS = getMapGroups()

export const groupPins = (mapPins: IMapPin[]): IMapPinGrouped => {
  const result: IMapPinGrouped = {}
  mapPins.forEach(p => {
    const id = getGroupKey(p)
    if (!result[id]) result[id] = [];
    result[id].push({...p, icon: `map-${p.type}.svg`});
  });
  return result; 
}

export const unGroupPins = (pinsGrouped: IMapPinGrouped): IPinProps[] => {
  let result: IPinProps[] = [];
  Object.keys(pinsGrouped).forEach(g => result.push(...pinsGrouped[g]));
  return result;
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
  return result;
}

/*
// https://dev.to/glebirovich/4-ideas-of-how-to-harness-the-power-of-typescript-generic-function-2b62
interface Item<T = any> {
  [key: string]: T
}

interface ItemGroup<T> {
  [key: string]: T[];
}

export function groupByKey<T extends Item>(array: T[], key: keyof T): ItemGroup<T> {
  return array.reduce<ItemGroup<T>>((map, item) => {
    const itemKey = item[key]
    if(map[itemKey]) {
      map[itemKey].push(item);
    } else {
      map[itemKey] = [item]
    }

    return map
  }, {})
}

// ---
*/