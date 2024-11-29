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
<div className="p-4 bg-white shadow-md rounded-md w-full max-w-md mx-auto">
  <h3 className="text-xl font-bold text-gray-800 mb-4">
    登録されたマーカー一覧
  </h3>
  <p className="text-gray-600 mb-4">
    登録されたマーカーは以下に表示されます。選択すると詳細が表示されます。
  </p>
  <ul className="space-y-4">
    {markersInfos.map((markersInfo) => (
      <li
        key={markersInfo.id}
        className={`p-4 border rounded-md cursor-pointer transition-colors duration-300 ${
          markersInfo.id === selectedMarkerId
            ? "bg-yellow-100 border-yellow-400"
            : "bg-gray-50 hover:bg-gray-100 border-gray-300"
        }`}
        onClick={() => handleSelect(markersInfo.id)}
      >
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-gray-800">
            {markersInfo.title}
          </span>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md"
            onClick={(e) => {
              e.stopPropagation(); // ボタンのクリックで親要素のクリックが発火しないようにする
              deleteMarker(markersInfo.id);
            }}
          >
            削除する
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>
        </>
    )
}

export default MarkerList;
