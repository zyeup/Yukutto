import api from '../api/axios';
import React, { Dispatch, SetStateAction } from 'react'

type MarkerInfo = {
    id: number;
    lat: number;
    lng: number;
    title: string;
    marker: google.maps.Marker;
};

type MapComponentProps = {
    markersInfos: MarkerInfo[];
    setMarkersInfos: Dispatch<SetStateAction<MarkerInfo[]>>;
    selectedMarkerId: number | null;
    setSelectedMarkerId: Dispatch<SetStateAction<number | null>>;
};

const MarkerList: React.FC<MapComponentProps> = ({ markersInfos, setMarkersInfos, selectedMarkerId, setSelectedMarkerId }) => {

    const deleteMarker = async (markersInfoId: number) => {

        try {
            await api.delete(`/markers/${markersInfoId}`);

            const newArray = [...markersInfos].filter(markerinfos => {
                if (markerinfos.id === markersInfoId) {
                    markerinfos.marker.setMap(null);
                }
                return markerinfos.id !== markersInfoId;
            })
            setMarkersInfos([...newArray]);

        } catch (err) {
            alert("削除に失敗しました")
        }
    }

    const handleSelect = (markersInfoId: number) => {
        setSelectedMarkerId(markersInfoId)
    }

    return (
        <>
            <ul className='py-2 px-4 '>
                <div className='text-black font-extralight text-2xl'>登録されたマーカーは下に表示されます</div>
                {markersInfos.map((markersInfo) => (
                     <div
                     onClick={() => handleSelect(markersInfo.id)}
                     key={markersInfo.id}
                     className={`m-2 ${markersInfo.id === selectedMarkerId ? 'bg-yellow-200' : ''}`}
                 >
                        <li className='text-black font-extralight text-2xl' key={markersInfo.id}>
                            {markersInfo.title}
                        </li>
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white font-bold rounded"
                            onClick={() => deleteMarker(markersInfo.id)}>削除する
                        </button>
                    </div>
                ))}
            </ul>

        </>
    )
}

export default MarkerList;
