import { render } from '@testing-library/react'
import { IMapPin } from './types/legacy'
import { getMapsGroups, IMapFilter } from './lib/getFilters'
import { getTestsPins } from './lib/testHelpers'

import MapController from './MapController'

interface IMockMapViewProps {
  filteredPins?: IMapPin[]  
  filters?: IMapFilter[]
}
const MockMapView = ({filteredPins = [], filters= []}:IMockMapViewProps) => {
  return (
    <div>
      <p>filters.length: <span data-testid="filtersCounter">{filters.length}</span></p>
      <ul>{filters.map(f => <li key={f.id}>{`${f.id} "${f.displayName}" ${f.counter}`}</li>)}</ul>

      <p>filteredPins.length: <span data-testid="filteredPinsCounter">{filteredPins.length}</span></p>
      <ul>{filteredPins.map(d => <li key={d._id}>{`${d._id} ${d.type}`}</li>)}</ul>
    </div>
  )
}

describe('MapController', () => {
  let ComponentUnderTest;

  beforeEach(() => {
    ComponentUnderTest = ({mapPins, filters}) => (
      <MapController mapPins={mapPins} >
        <MockMapView />
      </MapController>
    )
  })

  it('should render', async () => {    
    // Arrange
    const testsData = getTestsPins()
    const testsGroups = getMapsGroups(testsData, 'id')

    // Act
    const { queryByText, getByTestId } = render(<ComponentUnderTest mapPins={testsData} />);

    // Assert
    expect(getByTestId('filtersCounter').textContent).toBe(String(Object.keys(testsGroups).length))
    expect(getByTestId('filteredPinsCounter').textContent).toBe(String(testsData.length))
    expect(queryByText(new RegExp(testsData[0]._id))).toBeInTheDocument()
    expect(queryByText(new RegExp(testsData[1]._id))).toBeInTheDocument()
  })

  it('mapPins prop changes should refresh the map', async () => {    
    // Arrange
    const testsData = getTestsPins()

    const { rerender, queryByText, getByTestId } = render(<ComponentUnderTest mapPins={testsData} />);

    expect(getByTestId('filteredPinsCounter').textContent).toBe(String(testsData.length))
    expect(queryByText(new RegExp(testsData[0]._id))).toBeInTheDocument()
    expect(queryByText(new RegExp(testsData[1]._id))).toBeInTheDocument()

    // Act: change props 
    const newData = [ testsData[1] ]
    rerender(<ComponentUnderTest mapPins={newData} />);
    
    // Assert
    expect(getByTestId('filtersCounter').textContent).toBe("1")
    expect(getByTestId('filteredPinsCounter').textContent).toBe("1")
    expect(queryByText(new RegExp(newData[0]._id))).toBeInTheDocument()
  })  

})