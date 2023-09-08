import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import type { GeoJsonObject, Feature, Geometry } from 'geojson';

import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// const isBrowser = () => typeof window !== 'undefined';

const MapComponent: React.FC = () => {
  const { data } = useSWR('/dardoc/data-sources/driver-tracker.json', fetcher);

  const getCensusTractFillColor = (population2020: number) => {
    if (population2020 <= 2500) {
      return '#bd93f9';
    }
    if (population2020 > 2500 && population2020 < 5000) {
      return '#ffb86c';
    }
    if (population2020 > 5000 && population2020 < 10000) {
      return '#8be9fd';
    }
    return undefined;
  };
  const censusTractStyle = (
    val: Feature<Geometry, { pop20: number }> | undefined
  ) => {
    if (!val) {
      return {};
    }
    const pop20 = Number(val.properties.pop20);
    return {
      fillColor: getCensusTractFillColor(pop20),
      color: '#44475a',
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0.4,
    };
  };
  return (
    <>
      <div id="map">
        <MapContainer
          center={[24.5002419, 54.3857971]}
          zoom={5}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; "Map data © OpenStreetMap contributors, Esri Community Maps contributors, Map layer by Esri'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
          />
          <GeoJSON
            data={data as GeoJsonObject}
            style={(val: Feature<Geometry, { pop20: number }> | undefined) =>
              censusTractStyle(val)
            }
          />
        </MapContainer>
      </div>
    </>
  );
};

export default MapComponent;
