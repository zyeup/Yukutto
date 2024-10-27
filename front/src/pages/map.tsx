import React, { FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import List from '../map_components/list'
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

        var myOptions = {
            center: { lat: INITIALIZE_LAT, lng: INITIALIZE_LNG },
            zoom: INITIALIZE_ZOOM,
            disableDefaultUI: true,
            zoomControl: true,
        }

        const initializedMap = new google.maps.Map(mapRef.current, myOptions);

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

        const fetchMarkers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/markers');
                // データを MarkerInfo の配列に整形
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

    const checkAdd = () => {
        if (markersInfos.length > 0 && lat === markersInfos[markersInfos.length - 1].lat && lng === markersInfos[markersInfos.length - 1].lng) {
            alert("同じ地点は指定できません");
            return false;
        } else if (title === "") {
            alert("タイトルを入力してください");
            return false;
        } else {
            return true;
        }
    }

    // マーカーを追加する関数
    const addMarker = async (e: FormEvent) => {

        e.preventDefault();

        if (map && checkAdd()) {

            try {
                await axios.post('http://localhost:3000/api/v1/markers', {
                    lat: lat,
                    lng: lng,
                    title: title,
                })

                const marker = new google.maps.Marker({
                    position: { lat, lng },
                    map,
                    title: title,
                    label: {
                        text: title,
                        color: 'black',
                        fontSize: '20px',
                        fontWeight: 'bold',
                    },
                    animation: google.maps.Animation.DROP,
                });

                const markerInfo = {
                    id: Date.now(),
                    lat: lat,
                    lng: lng,
                    title: title,
                    marker: marker
                };

                marker.setMap(map)
                setMarkersInfos((prevMarkers) => [...prevMarkers, markerInfo]);
                setTitle("");
            } catch (err) {

                alert("マーカーの作成に失敗しました")

            }

        }
    };

    const deleteMarkers = () => {
        if (map) {
            markersInfos.map((markerInfos) => {
                markerInfos.marker.setMap(null);
            })
            setMarkersInfos([]);
        }
    }

    return (
        <div className="container">
            <div className="mt-4 ml-4">
                <h3>現在のピンの位置情報</h3>
                <p>緯度：{lat}</p>
                <p>経度：{lng}</p>
                <form onSubmit={addMarker}>
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
                </form>
                <button className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={addMarker}>この名前でピンを保存する
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={deleteMarkers}>ピンを全て削除する
                </button>
                <List markersInfos={markersInfos} setMarkersInfos={setMarkersInfos} ></List>
            </div>
            <div className="mt-4" ref={mapRef} style={{ width: INITIALIZE_MAP_WIDTH, height: INITIALIZE_MAP_HEIGHT }} />
        </div>
    );

};

export default Map;
