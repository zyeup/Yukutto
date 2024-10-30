import axios from 'axios';
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
};

const MarkerList: React.FC<MapComponentProps> = ({ markersInfos, setMarkersInfos }) => {

    const deleteMarker = async (markersInfoId: number) => {

        try {
            await axios.delete(`http://localhost:3000/api/v1/markers/${markersInfoId}`);

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

    return (
        <>
            <ul className='py-2 px-4 '>
                <div className='text-black font-extralight text-2xl'>登録されたマーカーは下に表示されます</div>
                {markersInfos.map((markersInfo) => (
                    <div className='m-2' key={markersInfo.id}>
                        <li className='text-black font-extralight text-2xl' key={markersInfo.id}>
                            {markersInfo.title}
                        </li>
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => deleteMarker(markersInfo.id)}>このマーカーを削除する
                        </button>
                    </div>
                ))}
            </ul>

        </>
    )
}

export default MarkerList;