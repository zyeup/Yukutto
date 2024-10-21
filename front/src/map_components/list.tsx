import React, { Dispatch, SetStateAction } from 'react'

type MarkerInfo = {
    id: number;
    lat: number;
    lng: number;
    title: string;
    marker: google.maps.Marker;
};

type MapComponentProps = {
    markersInfos: MarkerInfo[]; // markersInfos プロパティを追加
    setMarkersInfos: Dispatch<SetStateAction<MarkerInfo[]>>;
};

const List: React.FC<MapComponentProps> = ({ markersInfos, setMarkersInfos }) => {

    const deleteMarker = (id: number) => {

        const newArray = [...markersInfos].filter(markerinfos => {
            if (markerinfos.id === id) {
                markerinfos.marker.setMap(null);
            }
            return markerinfos.id !== id;
        })
        setMarkersInfos([...newArray]);
    }

    return (
        <>
            <ul className='py-2 px-4 '>
                <div className='text-green-500 font-extralight text-2xl'>登録されたマーカーは下に表示されます</div>
                {markersInfos.map((markersInfo) => (
                    <div className='m-2'>
                        <li className='text-green-500 font-extralight text-2xl' key={markersInfo.id}>
                            {markersInfo.title}
                        </li>
                        <button
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => deleteMarker(markersInfo.id)}>このマーカーを削除する
                        </button>
                    </div>
                ))}
            </ul>

        </>
    )
}

export default List;