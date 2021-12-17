import { IMapPin, IMapGrouping, IJson, IMapFilter } from '../types'
import { MAP_GROUPINGS } from './legacy.maps.groupings'

const groupBy = (xs: any, key: string) => {
  return xs.reduce((rv: IJson, x:IJson ) => {
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
  const groups: {[index: string]:any} = getMapsGroups(MAP_GROUPINGS, 'id')
  const pinsGroups: {[index: string]:any} = getMapsGroups(mapPins, 'id')
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