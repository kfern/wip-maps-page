import { memo } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L, { DivIcon } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { ILeafletMapProps } from '../../../types'
import Control from 'react-leaflet-custom-control';
import MapControls from '../MapControls/MapControls'

const getLeafletIcon = (iconUrlBase: string, icon: string): DivIcon => {
  return L.divIcon({
    className: 'icon-marker',
    html: `<img src="${iconUrlBase}${icon}" />`,
    iconSize: L.point(38, 38, true),
  })
}

const LeafletMap = ({ filteredPins = [], filters = {}, onChange = () => {}, onClick = () => {}, zoom, center, style, iconUrlBase }: ILeafletMapProps) => {
  return (
    <MapContainer
      className="markercluster-map"
      center={center}
      zoom={zoom}
      maxZoom={18}
      style={style}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Control position="topright">
        <MapControls filters={filters} onChange={onChange} />
      </Control>
      {/* @ts-ignore: @todo  */}
      <MarkerClusterGroup showCoverageOnHover={false}>
        {filteredPins.map(pinProps => {
          return (
            <Marker
              key={pinProps._id}
              position={[pinProps.location.lat, pinProps.location.lng]}
              icon={getLeafletIcon(iconUrlBase, pinProps.icon)}              
              eventHandlers={{ click: () => onClick(pinProps._id) }}    
            />
          )
        })}
      </MarkerClusterGroup>
    </MapContainer>
  )
}

export default memo(LeafletMap)