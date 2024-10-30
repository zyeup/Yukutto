import { useEffect, useRef, useState } from 'react';
import MarkerForm from '../map_components/MarkerForm';
import MarkerList from '../map_components/MarkerList'
import axios from 'axios';

// 初期化用の定数
const INITIALIZE_LAT = 35.6809591; // 緯度
const INITIALIZE_LNG = 139.7673068; // 経度
const INITIALIZE_ZOOM = 12.5; // ズームレベル
const INITIALIZE_MAP_WIDTH = '50%'; // 地図の幅
const INITIALIZE_MAP_HEIGHT = '800px'; // 地図の高さ

type MarkerInfo = {
    id: number;
    lat: number;
    lng: number;
    title: string;
    marker: google.maps.Marker;
};

const Map: React.FC = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [lat, setLat] = useState<number>(INITIALIZE_LAT);
    const [lng, setLng] = useState<number>(INITIALIZE_LNG);
    const [title, setTitle] = useState<string>('');
    const [markersInfos, setMarkersInfos] = useState<MarkerInfo[]>([]);

    useEffect(() => {
        if (!mapRef.current || map) return;

        const initializedMap = new google.maps.Map(mapRef.current, {
            center: { lat: INITIALIZE_LAT, lng: INITIALIZE_LNG },
            zoom: INITIALIZE_ZOOM,
            disableDefaultUI: true,
            zoomControl: true,
        });

        initializedMap.mapTypes.set('noText', new google.maps.StyledMapType([{
            featureType: 'all',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }]
        }]));
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

        const fetchMarkers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/markers');

                const markersData: MarkerInfo[] = response.data.map((marker: any) => ({
                    id: marker.id,
                    lat: marker.lat,
                    lng: marker.lng,
                    title: marker.title,
                    marker: new google.maps.Marker({
                        position: { lat: marker.lat, lng: marker.lng },
                        map,
                        title: marker.title,
                        label: {
                            text: marker.title,
                            color: 'black',
                            fontSize: '20px',
                            fontWeight: 'bold',
                        },
                        animation: google.maps.Animation.DROP,
                    }),
                }));
                setMarkersInfos(markersData);
                markersData.forEach((markerInfo) => {
                    markerInfo.marker.setMap(initializedMap);
                });
            } catch (error) {
                console.error("Error fetching markers:", error);
            }
        };
        fetchMarkers();
    }, []);

    // マーカーを追加する関数
    const addMarker = async (newMarker: MarkerInfo) => {

        const newMarkerInfo = {
            id: newMarker.id,
            lat: newMarker.lat,
            lng: newMarker.lng,
            title: newMarker.title,
            marker: newMarker.marker
        };

        setMarkersInfos((prevMarkerInfos) => [...prevMarkerInfos, newMarkerInfo]);
    };


    return (
        <div className="container">
            <div className="mt-4 ml-4">
                <MarkerForm
                    lat={lat}
                    lng={lng}
                    title={title}
                    setTitle={setTitle}
                    addMarker={addMarker}
                    map={map}
                />
                <MarkerList markersInfos={markersInfos} setMarkersInfos={setMarkersInfos} ></MarkerList>
            </div>
            <div className="mt-4" ref={mapRef} style={{ width: INITIALIZE_MAP_WIDTH, height: INITIALIZE_MAP_HEIGHT }} />
        </div>
    );

};

export default Map;
