import api from '../api/axios';
import React from 'react'
import { MapComponentPropsCenter } from "../interfaces/index"

const MarkerList: React.FC<MapComponentPropsCenter> = ({ markersInfos, setMarkersInfos, selectedMarkerId, setSelectedMarkerId, centerMapOnMarker }) => {

  const deleteMarker = async (markersInfoId: number) => {

    const confirm = window.confirm("このマーカーを削除します。\n本当によろしいですか？");
    if (confirm) {

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
  }

  const handleSelect = (markersInfoId: number) => {
    setSelectedMarkerId(markersInfoId)
  }

  return (
    <>
      <div className="flex">
        <div className="p-4 m-4 bg-white shadow-md border rounded-md w-full max-w-md mx-auto">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            登録されたマーカー一覧
          </h3>
          <p className="text-gray-600 mb-4">
            登録されたマーカーは以下に表示されます。
          </p>
          <ul className="space-y-4 grid grid-cols-1 max-h-[250px] overflow-y-scroll">
            {markersInfos.map((markersInfo) => (
              <li
                key={markersInfo.id}
                className={`p-4 border rounded-md cursor-pointer transition-colors duration-300 ${markersInfo.id === selectedMarkerId
                    ? "bg-yellow-100 border-yellow-400"
                    : "bg-gray-50 hover:bg-gray-100 border-gray-300"
                  }`}
                onClick={() => {
                  handleSelect(markersInfo.id)
                  centerMapOnMarker(markersInfo.id)
                }}
              >
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-800">
                    <h1>{markersInfo.title}</h1>
                  </span>
                  <button
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md"
                    onClick={(e) => {
                      deleteMarker(markersInfo.id);
                      e.preventDefault();
                    }}
                  >
                    削除する
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default MarkerList;
