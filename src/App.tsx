import React, { useEffect, useRef, useState, useCallback } from 'react';
import './App.css';
import '@isygis/geo-innsyn-web-components/geo-innsyn-web-components.js'
import { EElementsParams } from '@isygis/geo-innsyn-web-components/enums/custom-element-params';
import { IGIParam } from '@isygis/geo-innsyn-web-components/interfaces/gi-param';
import { IMapProperty, IShowHideLayer, IShowMarker, IActivateParam, IShowLayers, ISaksInfoParam, IExtent, IMapCenter, IUploadGeoJson, IUploadDrawingGeoJson, IHide, ILanguage, ITransformCoordinates } from '@isygis/geo-innsyn-web-components/interfaces/map-params';


export interface IParamId {
  giParamId?: string;
}

function App() {
  const [giParam, setGiParam] = useState<any>({});
  const [mapOutput, setMapOutput] = useState<any>({});
  const [configUrl] = useState<string>('https://geoinnsyn.no/?project=GeoInnsyn&application=demo&apiKey=qwerty1234');
  const [hideMenuIcon] = useState<string>('false');
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
    console.table('MAP OUTPUT REACT: ', mapOutput);
    // getting event by id
    if (mapOutput['mapOutputId'] === 'mapLoaded') {
      console.log('MapLoaded');
    }
    mapOutputRef.current.addEventListener('mapoutput', handleEvent);
    return () => {
      mapOutputRef.current.removeEventListener('mapoutput', handleEvent);
    };
  }, [mapOutput])

  const zoomIn = () => {
    setGiParam({ giParamId: EElementsParams.ZOOMIN } as IGIParam)
  }

  const zoomOut = () => {
    setGiParam({ giParamId: EElementsParams.ZOOMOUT } as IGIParam)
  }

  const showProperty = () => {
    const visParams = {
      giParamId: 'showProperty',
      bruksnummer: '289',
      festenummer: '',
      gaardsnummer: '116',
      kommunenummer: '3005',
      seksjonsnummer: ''
    };
    setGiParam(visParams)
  }

  const showNeighbors = () => {
    const visParams = {
      giParamId: 'showNeighbors',
      bruksnummer: '289',
      festenummer: '',
      gaardsnummer: '116',
      kommunenummer: '3005',
      seksjonsnummer: ''
    };
    setGiParam(visParams)
  }

  const hideMarker = () => {
    setGiParam({ giParamId: 'hideMarker' })
  }

  const removeSelection = () => {
    setGiParam({ giParamId: EElementsParams.DEACTIVATESHOWNEIGHBORS })
  }

  const getMapLayers = () => {
    setGiParam({ giParamId: EElementsParams.GETMAPLAYERS })
  }

  const getVisibleLayers = () => {
    setGiParam({ giParamId: EElementsParams.GETVISIBLELAYERS, active: true })
  }

  const showLayer = () => {
    setGiParam({ giParamId: EElementsParams.SHOWLAYER, guid: '4549-456c-db37-2e8d' })
  }

  const hideLayer = () => {
    setGiParam({ giParamId: EElementsParams.HIDELAYER, guid: '4549-456c-db37-2e8d' })
  }
  
  const showMarkerWhenClick = () => {
    setGiParam({ giParamId: EElementsParams.SHOWMARKERWHENCLICK, active: true, markerColor: 'rgba(34, 215, 141, 1)' } as IShowMarker)
  }
  
  const hideMarkerWhenClick = () => {
    setGiParam({ giParamId: EElementsParams.SHOWMARKERWHENCLICK, active: false } as IActivateParam)
  }
  
  const testGiParamsArray = () => {
    setGiParam([
      {
        giParamId: 'showProperty',
        bruksnummer: '199',
        festenummer: undefined,
        gaardsnummer: '67',
        kommunenummer: '3407',
        seksjonsnummer: undefined
      },
      { giParamId: EElementsParams.GETVISIBLELAYERS, active: true } as IActivateParam,
      { giParamId: EElementsParams.SHOWLAYER, guid: '4549-456c-db37-2e8d' } as IShowHideLayer
    ])
  }
  
  const getClickCoordinates = (value: boolean) => {    
    setGiParam({ giParamId: EElementsParams.GETCLICKCOORDINATES, active: value } as IActivateParam)
  }
  
  const getPropertyInfo = (value: boolean) => {
    setGiParam({ giParamId: EElementsParams.GETPROPERTYINFO, active: value } as IActivateParam)
  }
  
  const hideAllVisibleLayers = () => {
    setGiParam({ giParamId: EElementsParams.HIDEALLVISIBLELAYERS })
  }
  
  const showLayers = () => {
    setGiParam({ giParamId: EElementsParams.SHOWLAYERS, guids: ['4549-456c-db37-2e8d', '1c52-abde-4553-e879'] } as IShowLayers)
  }
  
  const resizeMap = () => {
    setGiParam({ giParamId: EElementsParams.RESIZEMAP })
  }
  
  const getObjectGeometry = (value: boolean) => {
    setGiParam({ giParamId: EElementsParams.GETOBJECTGEOMETRY, active: value } as IActivateParam)
  }
  
  const mapAnimation = (value: boolean) => {
    setGiParam({ giParamId: EElementsParams.SETMAPANIMATION, active: value } as IActivateParam)
  }
  
  const getProjectConfig = (value: boolean) => {
    setGiParam({ giParamId: EElementsParams.GETPROJECTCONFIG, active: value } as IActivateParam)
  }
  
  const getSaksInfo = () => {
    // this.showFeatureInfoChart = true;
    setGiParam({ giParamId: EElementsParams.GETSAKSINFO, knr: '3407', planid: '0453' } as ISaksInfoParam)
  }
  
  const setExtent = () => {
    setGiParam({
      giParamId: EElementsParams.SETEXTENT,
      epsg: "EPSG:32632",
      extent: [599241.9651565553, 6743969.178014754, 601538.7405471803, 6745581.019811629]
    } as IExtent)
  }
  
  const getExtent = () => {
    setGiParam({ giParamId: EElementsParams.GETEXTENT })
  }
  
  const getCenter = () => {
    setGiParam({ giParamId: EElementsParams.GETCENTER })
  }
  
  const setCenter = () => {
    setGiParam({
      giParamId: EElementsParams.SETCENTER,
      epsg: "EPSG:32632",
      lat: 6742848.280273437,
      lon: 586521.8266601556,
      scale: 2500,
      zoom: 15,
      showMarker: true,
      markerColor: 'rgba(255, 147, 0, 1)'
    } as IMapCenter)
  }
  
  const setCenter1 = () => {
    setGiParam({
      giParamId: EElementsParams.SETCENTER,
      epsg: "EPSG:32632",
      lat: 6942848.280273437,
      lon: 596521.8266601556,
      scale: 2500,
      zoom: 12,
      showMarker: true
    } as IMapCenter)
  }
  
  const uploadGeoJson = () => {
    // setGiParam({ giParamId: EElementsParams.UPLOADGEOJSON, layerName: 'public.tettsted', features: JSON.stringify(geojsonTest), jsonStyle: JSON.stringify(jsonStyleTest), featureInfoElements: JSON.stringify(geoJsonFeatureInfoTest), featureInfoTitle: 'Feature Info Name' } as IUploadGeoJson)
  }
  
  const uploadDrawingGeoJson = () => {
    const TASKS = { "type": "FeatureCollection", "features": [{ "type": "Feature", "geometry": { "type": "Point", "coordinates": [10.424242651312149, 63.43525321967451] }, "properties": { "style": { "fill": { "color": "rgba(0,0,0,0.75)" }, "stroke": { "color": "rgba(0,0,0,1)", "width": 2 }, "image": { "radius": 7, "fill": { "color": "rgba(0,0,0,1)" } }, "text": "", "textSize": 16 } }, "id": "3d34a05a-6e26-6943-10e7-ba8a3e48ba34" }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [10.402755653274973, 63.431979217703535] }, "properties": { "style": { "fill": { "color": "rgba(0,0,0,0.75)" }, "stroke": { "color": "rgba(0,0,0,1)", "width": 2 }, "image": { "radius": 7, "fill": { "color": "rgba(0,0,0,1)" } }, "text": "", "textSize": 16 } }, "id": "e4a5c347-6d40-9d5f-eaaf-4a534483287b" }, { "type": "Feature", "geometry": { "type": "Point", "coordinates": [10.38908582574433, 63.432112651326385] }, "properties": { "style": { "fill": { "color": "rgba(0,0,0,0.75)" }, "stroke": { "color": "rgba(0,0,0,1)", "width": 2 }, "image": { "radius": 7, "fill": { "color": "rgba(0,0,0,1)" } }, "text": "", "textSize": 16 } }, "id": "d11948e0-10bc-e63b-aa13-d446f2b3ecd3" }, { "type": "Feature", "geometry": { "type": "LineString", "coordinates": [[10.393829001109438, 63.43581773195873], [10.393475707073044, 63.428546193721324], [10.409482783683933, 63.42996028063373], [10.409807425271936, 63.43548755392117], [10.401569136624744, 63.43556852482524]] }, "properties": { "measurement": "2644.87 m", "style": { "fill": { "color": "rgba(0,0,0,1)" }, "stroke": { "color": "rgba(74,144,226,1)", "width": 2 }, "image": { "radius": 7, "fill": { "color": "rgba(74,144,226,1)" } }, "text": "", "textSize": 16 } }, "id": "44b267b9-f6da-5616-bbcc-3238bb22a3bd" }, { "type": "Feature", "geometry": { "type": "Polygon", "coordinates": [[[10.379584985990343, 63.43172353573288], [10.355928122408958, 63.42752197542931], [10.38423925261085, 63.42667443917932], [10.381005271040024, 63.42877164793275], [10.379584985990343, 63.43172353573288]]] }, "properties": { "measurement": "366219.15 m²", "style": { "fill": { "color": "rgba(208,2,27,1)" }, "stroke": { "color": "rgba(208,2,27,1)", "width": 2 }, "image": { "radius": 7, "fill": { "color": "rgba(208,2,27,1)" } }, "text": "", "textSize": 16 } }, "id": "18e30c6f-cbcd-c7d6-3d6e-21201082028d" }] }
    setGiParam({ giParamId: EElementsParams.UPLOADDRAWINGGEOJSON, data: JSON.stringify(TASKS) } as IUploadDrawingGeoJson)
  }
  
  const removeDrawingGeoJson = () => {
    setGiParam({ giParamId: EElementsParams.REMOVEDRAWINGGEOJSON })
  }
  
  const getChosenSearchResult = (value: boolean) => {
    setGiParam({ giParamId: EElementsParams.GETCHOSENSEARCHRESULT, active: value } as IActivateParam)
  }
  
  const hideTranslateBar = (value: boolean) => {
    setGiParam({ giParamId: EElementsParams.HIDETRANSLATEBAR, hide: value } as IHide)
  }
  
  const setLanguage = (value: string) => {
    setGiParam({ giParamId: EElementsParams.SETLANGUAGE, language: value } as ILanguage)
  }
  
  const transformCoordinates = () => {
    setGiParam({ giParamId: EElementsParams.GETTRANSFORMCOORDINATES, fromEpsg: 'EPSG:32632', toEpsg: 'EPSG:4326', coordinates: [562247.0545959469, 6630364.923614501] } as ITransformCoordinates)
  }
  
  const mapMoveEndActive = () => {
    setGiParam({ giParamId: EElementsParams.GETMAPMOVEEND, active: true } as IActivateParam)
  }
  
  return (
    <div className="App">      
      <div className="wrapper">
        <header className="header">Header</header>
        <article className="main">
          <div className='isygis'>
            <isygis-custom-isy-search-bar hidemenuicon={hideMenuIcon} />
            <isygis-custom-isy-side-nav />
            <isygis-custom-isy-info-panel />
            <isygis-custom-isy-base-layers />
            <isygis-custom-isy-map configurl={configUrl} giparams={JSON.stringify(giParam)} ref={mapOutputRef} />
          </div>
        </article>
        <aside className="aside aside-1">
          <div>
            Aside 1
          </div>
          <button onClick={ zoomIn }>Zoom In</button><br />
          <button onClick={ zoomOut }>Zoom Out</button><br />
          <button onClick={ hideMarker }>Hide Marker</button><br />
          <button onClick={ showProperty }>Show Property</button><br />
          <button onClick = { showNeighbors }> Show neighbors</button><br />
          <button onClick = { removeSelection }> Remove selection</button><br />
          <button onClick = { getMapLayers }> Get Map Layers</button><br />
          <button onClick = { getVisibleLayers }> Get Visible Layers</button><br />
          <button onClick = { showLayer }> Show Layer</button><br />
          <button onClick = { hideLayer }> Hide Layer</button><br />
          <button onClick = { showMarkerWhenClick }> Show marker when click</button><br />
          <button onClick = { hideMarkerWhenClick }> Hide marker when click</button><br />
          <button onClick = { testGiParamsArray }> Test giParams array</button><br />
          <button onClick = { () => getClickCoordinates(true) }> Start get Click Coordinates</button><br />
          <button onClick={() => getClickCoordinates(false) }> Stop get Click Coordinates</button><br />
          <button onClick={() => getPropertyInfo(true) }> Start get property info</button><br />
          <button onClick={() => getPropertyInfo(false) }> Stop get property info</button><br />
          <button onClick = { hideAllVisibleLayers }> Hide all visible layers</button><br />
          <button onClick = { showLayers }> Show layers</button><br />
          <button onClick = { resizeMap }> Resize map</button><br />
          <button onClick={() => getObjectGeometry(true) }> Start Get object geometry</button><br />
          <button onClick={() => getObjectGeometry(false) }> End Get object geometry</button><br />
          <button onClick={() => mapAnimation(false) }> Stop map animation</button><br />
          <button onClick={() => mapAnimation(true) }> Start map animation</button><br />
          <button onClick={() => getProjectConfig(true) }> Start get project config</button><br />
          <button onClick={() => getProjectConfig(false) }> Stop get project config</button><br />
          <button onClick = { getSaksInfo }> Get saks info</button><br />
          <button onClick = { getExtent }> Get Extent</button><br />
          <button onClick = { setExtent }> Set Extent</button><br />
          <button onClick = { getCenter }> Get Center</button><br />
          <button onClick = { setCenter }> Set Center</button><br />
          <button onClick = { setCenter1 }> Set Center1</button><br />
          <button onClick = { uploadGeoJson }> Upload Geojson</button><br />
          <button onClick = { uploadDrawingGeoJson }> Upload Drawing Geojson</button><br />
          <button onClick = { removeDrawingGeoJson }> Remove Drawing Geojson</button><br />
          <button onClick={() => getChosenSearchResult(true) }> Get Chosen Search Result Start</button><br />
          <button onClick={() => getChosenSearchResult(false) }> Get Chosen Search Result End</button><br />
          <button onClick={() => hideTranslateBar(true) }> Hide Translate Bar</button><br />
          <button onClick={() => hideTranslateBar(false) }> Show Translate Bar</button><br />
          <button onClick={() => setLanguage('en') }> Set language EN</button><br />
          <button onClick={() => setLanguage('no') }> Set language NO</button><br />
          <button onClick = { transformCoordinates }> TransformCoordinates</button><br />
          <button onClick = { mapMoveEndActive }> MapMoveEndActive</button><br />
        </aside>
        <aside className="aside aside-2">Aside 2</aside>
        <footer className="footer">Footer</footer>
      </div>
    </div>
  );
}

export default App;
