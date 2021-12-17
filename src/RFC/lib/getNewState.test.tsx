import { getTestsPins } from './testHelpers'
import { getNewState, IMapControllerState } from './getNewState'
import { getMapsGroups } from './getFilters'

describe('getNewState', () => {
  it('SET_DATA with empty data', async () => {    
    // Arrange
    const testsData = []
    const beforeState:IMapControllerState = {
      mapPins: [],
      filteredPins: [],
      filters: []
    }

    // Act
    const act = getNewState(beforeState, {type: "SET_DATA", payload: testsData})
    
    // Assert
    const expected = {
      mapPins: testsData,
      filteredPins: testsData,
      filters: []
    }
    expect(act).toStrictEqual(expected)
  })

  it('SET_DATA with empty state before', async () => {    
    // Arrange
    const testsData = getTestsPins()
    const beforeState:IMapControllerState = {
      mapPins: [],
      filteredPins: [],
      filters: []
    }

    // Act
    const act = getNewState(beforeState, {type: "SET_DATA", payload: testsData})

    // Assert
    expect(act.mapPins).toStrictEqual(testsData)
    expect(act.filteredPins).toStrictEqual(testsData)
    const mapGroups = Object.keys(getMapsGroups(testsData, 'id'))
    expect(act.filters.length).toBe(mapGroups.length)
  })

  it('SET_DATA with full state before', async () => {    
    // Arrange
    const testsData = getTestsPins()
    const beforeState:IMapControllerState = {
      mapPins: [ testsData[0] ],
      filteredPins: [ testsData[0] ],
      filters: []
    }

    // Act
    const act = getNewState(beforeState, {type: "SET_DATA", payload: testsData})
    
    // Assert
    expect(act.mapPins).toStrictEqual(testsData)
    expect(act.filteredPins).toStrictEqual(testsData)
    const mapGroups = Object.keys(getMapsGroups(testsData, 'id'))
    expect(act.filters.length).toBe(mapGroups.length)
  })
})
