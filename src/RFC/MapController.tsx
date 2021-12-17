import React, { useEffect, useState } from 'react'
import { IMapPin, IMapControllerState } from './types'
import { getNewState } from './lib/getNewState'

interface IMapControllerProps {
  children: React.ReactNode
  mapPins: IMapPin[]
}

const getInitialState = (): IMapControllerState => {
  return {
    mapPins: [], 
    filteredPins: [],
    filters: []
  }
}

const MapController = ({ children, mapPins }: IMapControllerProps) => {
  const [ state, setState ] = useState<IMapControllerState>(getInitialState())

  // Update the internal state when mapPins change
  useEffect(() => {
    setState(actualState => getNewState(actualState, {type: "SET_DATA", payload: mapPins}))
  }, [mapPins])

  // children with updated data  
  const Content = React.Children.map(children, child => {
    /* istanbul ignore else: We only test valid components  */
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { filteredPins: state.filteredPins, filters: state.filters });
    }
    /* istanbul ignore next: We only test valid components  */
    return child;
  })
  return (
    <div>{Content}</div>
  )
}

export default MapController