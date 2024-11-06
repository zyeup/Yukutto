import { useEffect, useRef, useState } from 'react';
import MarkerForm from '../map_components/MarkerForm';
import MarkerList from '../map_components/MarkerList'
import axios from 'axios';
import { useParams } from 'react-router-dom';

// 初期化用の定数
const INITIALIZE_LAT = 35.6809591; // 緯度
const INITIALIZE_LNG = 139.7673068; // 経度
const INITIALIZE_ZOOM = 12.5; // ズームレベル
const INITIALIZE_MAP_WIDTH = '60%'; // 地図の幅
const INITIALIZE_MAP_HEIGHT = '600px'; // 地図の高さ

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
    const [title, setTitle] = useState<string>("");
    const [markersInfos, setMarkersInfos] = useState<MarkerInfo[]>([]);
    const [tmpMarker, setTmpMarker] = useState<google.maps.Marker | null>(null);
    const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
    const { postId } = useParams<{ postId: string }>();

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
    }, [mapRef, map]);

    useEffect(() => {
        const fetchMarkers = async () => {

            try {
                const response = await axios.get(`http://localhost:3000/api/v1/markers?post_id=${postId}`);

                const markersData: MarkerInfo[] = response.data.map((marker: any) => {
                    const googleMarker = new google.maps.Marker({
                        position: { lat: marker.lat, lng: marker.lng },
                        map,
                        draggable: true,
                        title: marker.title,
                        label: {
                            text: marker.title,
                            color: 'black',
                            fontSize: '20px',
                            fontWeight: 'bold',
                        },
                        animation: google.maps.Animation.DROP,
                    });
                    googleMarker.addListener('click', () => {
                        setSelectedMarkerId(marker.id);
                        if (marker.id === selectedMarkerId){
                            googleMarker.setAnimation(google.maps.Animation.BOUNCE)
                        }
                    });
                    return { id: marker.id, lat: marker.lat, lng: marker.lng, title: marker.title, marker: googleMarker };
                });
                setMarkersInfos(markersData);
                markersData.forEach((markerInfo) => {
                    markerInfo.marker.setMap(map);
                });
            } catch (error) {
                console.error("Error fetching markers:", error);
            }
        };
            fetchMarkers();
    }, [map]);

    useEffect(() => {
        markersInfos.forEach((markerInfo) => {
            if (markerInfo.id === selectedMarkerId) {
                markerInfo.marker.setAnimation(google.maps.Animation.BOUNCE);
            } else {
                markerInfo.marker.setAnimation(null); // 他のマーカーはBOUNCEを解除
            }
        });
    }, [selectedMarkerId, markersInfos]);

    useEffect(() => {
        if (map) {
            if (lat !== INITIALIZE_LAT || lng !== INITIALIZE_LNG)
                nowLocate(lat, lng);
        }
    }, [map, lat, lng]);

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

    const nowLocate = (clickedLat: number, clickedLng: number) => {

        if (tmpMarker) {
            tmpMarker.setMap(null);
        }
        const marker = new google.maps.Marker({
            position: { lat: clickedLat, lng: clickedLng },
            map,
            title: title,
            icon: {
                fillColor: "red",
                fillOpacity: 1,
                path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                scale: 8,
                strokeColor: "red",
                strokeWeight: 1.0
            },
            label: {
                text: " ",
                color: 'black',
                fontSize: '20px',
                fontWeight: 'bold',
            },
        });
        marker.setMap(map);
        setTmpMarker(marker);
    }

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
                <MarkerList markersInfos={markersInfos} setMarkersInfos={setMarkersInfos} selectedMarkerId={selectedMarkerId} setSelectedMarkerId={setSelectedMarkerId} ></MarkerList>
            </div>
            <div className="mt-4" ref={mapRef} style={{ width: INITIALIZE_MAP_WIDTH, height: INITIALIZE_MAP_HEIGHT }} />
        </div>
    );

};

export default Map;
