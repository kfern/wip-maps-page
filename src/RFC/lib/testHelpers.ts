import { IMapPin } from '../types'

export const getTestsPins = () : IMapPin[] => {
  const testsData: IMapPin[] = [
    {
      _id: '1tZ2jw9ZuByLGnl8olnV',
      location: { lat: 51.982508903792166, lng: -0.1298218662584345 },
      type: 'collection-point',
      moderation: 'awaiting-moderation'
    },
    {
      _id: 'TLduJS8zMiYQMZoyEGDz',
      location: { lat: 50.91444413281803, lng: -0.9230838316050906 },
      type: 'workspace',
      subType: 'extrusion',
      moderation: 'awaiting-moderation'
    }
  ]
  return testsData
}