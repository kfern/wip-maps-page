import { IMapPinGrouped, IFilters } from '../../types'
import { getFilters } from './utils'

describe('getFilters', () => {
  it('should return an empty object when data is empty', async () => {

    const act = getFilters({})

    // Assert
    expect(act).toStrictEqual({})
  })

  it('should return an object of filters based on pins types', async () => {
    // Arrange
    const testsData: IMapPinGrouped = {
      'collection-point': [
        {
          _id: 'Wmgw4LqZItL3IPrKJauZ',
          location: { lat: 51.43997170051467, lng: -0.6384303440314518 },
          type: 'collection-point',
          moderation: 'awaiting-moderation',
          icon: 'map-collection-point.svg'
        }
      ]
    }

    const act = getFilters(testsData)

    // Assert
    const expected: IFilters = {
      'collection-point': {
        grouping: 'individual',
        name: 'collection-point',
        displayName: 'Collection Point',
        type: 'collection-point',
        icon: 'map-collection-point.svg',
        _count: 1,
        active: true
      }
    }

    expect(act).toStrictEqual(expected)
  })

  it('should return an object of filters based on pins subtypes', async () => {
    // Arrange
    const testsData: IMapPinGrouped = {
      'workspace-mix': [
        {
          _id: 'Wmgw4LqZItL3IPrKJauZ',
          location: { lat: 51.43997170051467, lng: -0.6384303440314518 },
          type: 'workspace',
          subType: 'mix',
          moderation: 'awaiting-moderation',
          icon: 'map-workspace.svg'
        }
      ]
    }

    const act = getFilters(testsData)

    // Assert
    const expected: IFilters = {
      'workspace-mix': {
        grouping: 'place',
        name: 'workspace-mix',
        displayName: 'Mix',
        type: 'workspace',
        icon: 'map-workspace.svg',
        _count: 1,
        active: true
      }
    }

    expect(act).toStrictEqual(expected)
  })

})
