import { IMapPin, IMapGrouping } from '../types/legacy'
import { MAP_GROUPINGS } from './legacy.maps.groupings'
export interface IMapFilter {
  group: string
  id: string
  displayName: string
  icon: string
  counter: number
}

const groupBy = (xs: any, key: string) => {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const getMapsGroups = (data: IMapPin[] | IMapGrouping[], property: string): object => {
  const tmp = data.map(g => {
    const id = `${g.type}${g.subType ? '-'+g.subType:''}`
    return { ...g, id}
  })
 return groupBy(tmp, property)
}

export const getFilters = (mapPins: IMapPin[]): IMapFilter[] => {
  const groups = getMapsGroups(MAP_GROUPINGS, 'id')
  const pinsGroups = getMapsGroups(mapPins, 'id')
  const result:IMapFilter[] = Object.keys(pinsGroups).map(groupId => {
    return {
      group: groups[groupId][0].grouping,
      id: groupId,
      displayName: groups[groupId][0].displayName,
      icon: groups[groupId][0].icon,
      counter: pinsGroups[groupId].length
    }
  })
  return result
}