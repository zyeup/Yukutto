import React, { useEffect, useRef, useState } from 'react';
import './App.css'

// 初期化用の定数
const INITIALIZE_LAT = 35.6809591; // 緯度
const INITIALIZE_LNG = 139.7673068; // 経度
const INITIALIZE_ZOOM = 12.5; // ズームレベル
const INITIALIZE_MAP_WIDTH = '50%'; // 地図の幅
const INITIALIZE_MAP_HEIGHT = '800px'; // 地図の高さ


const App: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [lat, setLat] = useState<number>(INITIALIZE_LAT);
  const [lng, setLng] = useState<number>(INITIALIZE_LNG);
  const [title, setTitle] = useState<string>('New Marker'); 

  const markerArray: google.maps.Marker[] = [];  // マーカーの配列の型を指定
  const [markers, setMarkers] = useState<google.maps.Marker[]>(markerArray);   // マーカーをstateとして管理

  useEffect(() => {
    if (!mapRef.current || map) return;

    const initializedMap = new google.maps.Map(mapRef.current, {
      center: { lat: INITIALIZE_LAT, lng: INITIALIZE_LNG },
      zoom: INITIALIZE_ZOOM,
    });

    // 余計な文字を非表示にする
    // 左上の地図を押すと元に戻るので要修正
    var style = [{
      featureType: 'all',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }]
    }];
    var lopanType = new google.maps.StyledMapType(style);
    initializedMap.mapTypes.set('noText', lopanType);
    initializedMap.setMapTypeId('noText');

    initializedMap.addListener('click', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const clickedLat = event.latLng.lat();
        const clickedLng = event.latLng.lng();

        // クリックされた座標をstateに保存
        setLat(clickedLat);
        setLng(clickedLng); 
      }
    });

    setMap(initializedMap);
  }, []);

   // マーカーを追加する関数
   const addMarker = () => {
    if (map) {
      const marker =new google.maps.Marker({
        position: { lat, lng },
        map,
        title: 'New Marker',
        label: {
          text: title,
          color: 'red',
          fontSize: '12px',
          fontWeight: 'normal',
        },
      });
      marker.setMap(map)
      setMarkers((prevMarkers) => [...prevMarkers, marker]);    }
  };

  const deleteMarker = () => {
    if (map) {
      markers.map((marker) => {
        marker.setMap(null);
    })
    }
  }

  return (
    <div className="container">
      <div style={{ marginTop: '10px' }}>
        <h3>現在のピンの位置情報</h3>
        <p>緯度：{lat}</p> 
        <p>経度：{lng}</p> 
        <label className='font-bold' htmlFor='marker'>マーカーに表示する名前を入力
          <input
            id="marker"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトルを入力"
            className="border border-1 border-black focus:border-black focus:outline-none py-2 px-4 rounded"
          />
        </label>
        <button className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                onClick={addMarker}>この名前でピンを保存する
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" 
                onClick={deleteMarker}>ピンを全て削除する
        </button>
      </div>
      <div ref={mapRef} style={{ width: INITIALIZE_MAP_WIDTH, height: INITIALIZE_MAP_HEIGHT }} />
    </div>
  );
};

export default App
