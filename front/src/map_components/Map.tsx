import { useEffect, useRef, useState, useContext } from 'react';
import { AuthContext } from "../App"
import MarkerForm from './MarkerForm';
import MarkerList from './MarkerList'
import AddressSearch from './AddressSearch';
import MarkerModal from './MarkerModal';
import api from '../api/axios';
import { MarkerInfo } from "../interfaces/index"

type MapProps = {
    postId: number,
    createUserId: number | undefined
}

// 初期化用の定数
const INITIALIZE_LAT = 35.6809591; // 緯度
const INITIALIZE_LNG = 139.7673068; // 経度
const INITIALIZE_ZOOM = 12.5; // ズームレベル

const Map: React.FC<MapProps> = ({ postId, createUserId }) => {
    const { currentUser } = useContext(AuthContext)
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [lat, setLat] = useState<number>(INITIALIZE_LAT);
    const [lng, setLng] = useState<number>(INITIALIZE_LNG);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [fullAddress, setFullAddress] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [prefecture, setPrefecture] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [markersInfos, setMarkersInfos] = useState<MarkerInfo[]>([]);
    const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);

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
            stylers: [{ visibility: '' }]
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
        if (!map) return;

        const fetchMarkers = async () => {

            try {
                const response = await api.get(`/markers?post_id=${postId}`);
                const markersData: MarkerInfo[] = response.data.map((marker: any) => {

                    const googleMarker = makeMarker(marker.lat, marker.lng, marker.title)
                    addMarkerClickListener(googleMarker, marker.id, map, setSelectedMarkerId);
                    return { postId: postId, markerId: marker.id, lat: marker.lat, lng: marker.lng, title: marker.title, content: marker.content, image: marker.image.url, fullAddress: marker.fullAddress, country: marker.location?.country, prefecture: marker.location?.prefecture, city: marker.location?.city, marker: googleMarker };
                });
                setMarkersInfos(markersData);
                markersData.forEach((markerInfo) => {
                    markerInfo.marker.setMap(map);
                });
                if (markersData.length > 0) {
                    const position = markersData[0].marker.getPosition();
                    if (position) {
                        map.setCenter(position);
                    }
                }
            } catch (error) {
                // console.log("マーカの取得に失敗しました。");
            }
        };
        fetchMarkers();
    }, [map]);

    useEffect(() => {
        markersInfos.forEach((markerInfo) => {
            if (markerInfo.markerId === selectedMarkerId) {
                markerInfo.marker.setAnimation(google.maps.Animation.BOUNCE);
            } else {
                markerInfo.marker.setAnimation(null);
            }
        });
    }, [selectedMarkerId, markersInfos]);

    const makeMarker = (lat: number, lng: number, title: string) => {
        const marker = new google.maps.Marker({
            position: { lat, lng },
            map,
            // マーカーの更新ができたらコメントを外す予定
            // draggable: true,
            title: title,
            label: {
                text: title,
                color: 'black',
                fontSize: '20px',
                fontWeight: 'bold',
            },
            animation: google.maps.Animation.DROP,
        });
        return marker;
    }


    // マーカークリック時の処理
    const addMarkerClickListener = (
        googleMarker: google.maps.Marker,
        markerId: number,
        map: google.maps.Map | null,
        setSelectedMarkerId: React.Dispatch<React.SetStateAction<number | null>>
    ) => {
        googleMarker.addListener('click', () => {
            setSelectedMarkerId(markerId);
            const position = googleMarker.getPosition();
            if (position && map) {
                map.setCenter(position);
            }
        });
    };

    //マーカーを増やす
    const addMarker = (newMarker: MarkerInfo) => {

        const newMarkerInfo = {
            postId: newMarker.postId,
            markerId: newMarker.markerId,
            lat: newMarker.lat,
            lng: newMarker.lng,
            title: newMarker.title,
            content: newMarker.content,
            fullAddress: newMarker.fullAddress,
            country: newMarker.country,
            prefecture: newMarker.prefecture,
            city: newMarker.city,
            marker: newMarker.marker,
            image: newMarker.image,
        };

        // 追加直後のマーカーにもクリック処理を対応
        addMarkerClickListener(newMarkerInfo.marker, newMarkerInfo.markerId, map, setSelectedMarkerId);
        setMarkersInfos((prevMarkerInfos) => [...prevMarkerInfos, newMarkerInfo]);
        setSelectedMarkerId(newMarker.markerId)
    };

    const centerMapOnMarker = (markerId: number) => {
        const markerInfo = markersInfos.find((marker) => marker.markerId === markerId);
        if (markerInfo && map) {
            const position = markerInfo.marker.getPosition();
            if (position) {
                map.setCenter(position);
            }
        }
    };

    return (
        <>
            <div ref={mapRef} className="absolute inset-0"></div>
            <MarkerList
                markersInfos={markersInfos}
                setMarkersInfos={setMarkersInfos}
                selectedMarkerId={selectedMarkerId}
                setSelectedMarkerId={setSelectedMarkerId}
                centerMapOnMarker={centerMapOnMarker}
            />
            {currentUser?.id == createUserId && (
                <div className="">
                    <AddressSearch
                        map={map}
                        setLat={setLat}
                        setLng={setLng}
                    />
                    <MarkerForm
                        postId={postId}
                        lat={lat}
                        lng={lng}
                        title={title}
                        setTitle={setTitle}
                        content={content}
                        setContent={setContent}
                        country={country}
                        setCountry={setCountry}
                        prefecture={prefecture}
                        setPrefecture={setPrefecture}
                        city={city}
                        setCity={setCity}
                        fullAddress={fullAddress}
                        setFullAddress={setFullAddress}
                        addMarker={addMarker}
                        makeMarker={makeMarker}
                        map={map}
                    />
                </div>
            )}
            <MarkerModal
                markersInfos={markersInfos}
                setMarkersInfos={setMarkersInfos}
                selectedMarkerId={selectedMarkerId}
                setSelectedMarkerId={setSelectedMarkerId}
                centerMapOnMarker={centerMapOnMarker}
            />
        </>
    );

};

export default Map;
