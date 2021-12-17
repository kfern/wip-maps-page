import { IMapPin, IMapFilter } from '../types'

import { getFilters } from './getFilters'

describe('getFilters', () => {
  it('should return an empty array when data is empty', async () => {

    const act = getFilters([])

    // Assert
    expect(act).toStrictEqual([])
  })

  it('should return an array of filters based on pins types', async () => {
    // Arrange
    const testsData: IMapPin = {
      _id: 'Wmgw4LqZItL3IPrKJauZ',
      location: { lat: 51.43997170051467, lng: -0.6384303440314518 },
      type: 'collection-point',
      moderation: 'awaiting-moderation'
    }

    const act = getFilters([testsData])

    // Assert
    const expected: IMapFilter[] = [{
      group: 'individual',
      displayName: 'Collection Point',
      id: testsData.type,
      icon: '@todo', //'map-collection.svg',
      counter: 1
    }]

    expect(act).toStrictEqual(expected)
  })

  it('should return an array of filters based on pins subtypes', async () => {
    // Arrange
    const testsData: IMapPin = {
      _id: 'Wmgw4LqZItL3IPrKJauZ',
      location: { lat: 51.43997170051467, lng: -0.6384303440314518 },
      type: 'workspace',
      subType: 'mix',
      moderation: 'awaiting-moderation'
    }

    const act = getFilters([testsData])

    // Assert
    const expected: IMapFilter[] = [{
      group: 'place',
      displayName: 'Mix',
      id: `${testsData.type}-${testsData.subType}`,
      icon: '@todo', // 'map-workspace.svg',
      counter: 1
    }]

    expect(act).toStrictEqual(expected)
  })

})
