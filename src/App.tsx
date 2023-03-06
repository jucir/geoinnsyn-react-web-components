import React, { useEffect, useRef, useState, useCallback } from 'react';
import './App.css';
import '@isygis/geo-innsyn-web-components/geo-innsyn-web-components.js'
import { EElementsParams } from '@isygis/geo-innsyn-web-components/enums/custom-element-params';
import { IGIParam } from '@isygis/geo-innsyn-web-components/interfaces/gi-param';
import { IMapProperty, IShowHideLayer } from '@isygis/geo-innsyn-web-components/interfaces/map-params';


export interface IParamId {
  giParamId?: string;
}

function App() {
  const [giParam, setGiParam] = useState<any>({});
  const [mapOutput, setMapOutput] = useState<any>({});
  const [configUrl] = useState<string>('https://geoinnsyn.no/?application=demo&project=demo');
  /**
   * do my async thing effect
  */
  const mapOutputRef = useRef<any>(null);
  // console.log('Test: ', GeoInnsynWebComponents);

  useEffect(() => {
    if (Object.keys(giParam).length !== 0) {
      const effect = async () => {
        setGiParam({});
      };
      effect();
    }
  }, [giParam]);

  useEffect(() => {
    const handleEvent = (e: any) => {
      setMapOutput(e.detail)
    };
    console.log('MAP OUTPUT REACT: ', mapOutput);
    // getting event by id
    if (mapOutput['mapOutputId'] === 'mapLoaded') {
      console.log('MapLoaded');
    }
    mapOutputRef.current.addEventListener('mapoutput', handleEvent);
    return () => {
      mapOutputRef.current.removeEventListener('mapoutput', handleEvent);
    };
  }, [mapOutput])
  
  
  return (
    <div className="App">      
      <div className="wrapper">
        <header className="header">Header</header>
        <article className="main">
          <div className='isygis'>
            {/* <isygis-custom-isy-search-bar /> */}
            {/* <isygis-custom-isy-side-nav /> */}
            {/* <isygis-custom-isy-info-panel /> */}
            <isygis-custom-isy-map configurl={configUrl} giparams={JSON.stringify(giParam)} ref={mapOutputRef} />
          </div>
        </article>
        <aside className="aside aside-1">
          <div>
            Aside 1
          </div>
          <button onClick={() => setGiParam({ giParamId: EElementsParams.ZOOMIN } as IGIParam)}>Zoom In</button><br />
          <button onClick={() => setGiParam({ giParamId: EElementsParams.ZOOMOUT } as IGIParam)}>Zoom Out</button><br />
          <button onClick={() => setGiParam({ giParamId: EElementsParams.HIDEMARKER } as IGIParam)}>Hide Marker</button><br />
          <button onClick={() => setGiParam({
            giParamId: EElementsParams.SHOWPROPERTY,
            bruksnummer: '289',
            festenummer: '',
            gaardsnummer: '116',
            kommunenummer: '3005',
            seksjonsnummer: ''
          } as IMapProperty
          )}>Show Property
          </button><br />
          <button onClick={() => setGiParam({
            giParamId: EElementsParams.SHOWNEIGHBORS,
            bruksnummer: '289',
            festenummer: '',
            gaardsnummer: '116',
            kommunenummer: '3005',
            seksjonsnummer: ''
          } as IMapProperty
          )}>Show Neighbors
          </button><br />
          <button onClick={() => setGiParam({ giParamId: EElementsParams.DEACTIVATESHOWNEIGHBORS } as IGIParam)}>Remove selections</button><br />
          <button onClick={() => setGiParam({ giParamId: EElementsParams.GETMAPLAYERS } as IGIParam)}>Get Map Layers</button><br />
          <button onClick={() => setGiParam({ giParamId: EElementsParams.GETVISIBLELAYERS } as IGIParam)}>Get Visible Layers</button><br />
          <button onClick={() => setGiParam({ giParamId: EElementsParams.SHOWLAYER, guid: '4549-456c-db37-2e8d' } as IShowHideLayer)}>Show Layer</button><br />
          <button onClick={() => setGiParam({ giParamId: EElementsParams.HIDELAYER, guid: '4549-456c-db37-2e8d' } as IShowHideLayer)}>Hide Layer</button><br />
          <button onClick={() => setGiParam({ giParamId: EElementsParams.SHOWMARKERWHENCLICK } as IGIParam)}>Show marker when click</button><br />
          {/* <button onClick={() => setGiParam({ giParamId: EElementsParams.HIDEMARKERWHENCLICK } as IGIParam)}>Hide marker when click</button><br /> */}
          {/* <button onClick={() => setGiParam({ giParamId: EElementsParams.SETCENTER, lat: 6741965.55, lon: 590827.64, showMarker: true } as IMapSetCenter)}>Set center</button><br /> */}
        </aside>
        <aside className="aside aside-2">Aside 2</aside>
        <footer className="footer">Footer</footer>
      </div>
    </div>
  );
}

export default App;
