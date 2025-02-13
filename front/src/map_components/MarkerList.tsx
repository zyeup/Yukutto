import React, { useState } from 'react'
import { MapComponentProps } from "../interfaces/index"

const MarkerList: React.FC<MapComponentProps> = ({ markersInfos, setSelectedMarkerId, centerMapOnMarker }) => {
  const [isListOpen, setIsListOpen] = useState(false);


  const handleSelect = (markersInfoId: number) => {
    setSelectedMarkerId(markersInfoId)
    centerMapOnMarker(markersInfoId)
  }

  return (
    <>
      <div className={`absolute top-28 left-0 h-5/6 w-72 bg-white/90 shadow-lg p-4 transform transition-transform ${isListOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button className="absolute top-4 right-4 text-gray-600" onClick={() => setIsListOpen(false)}>✖︎</button>
        <h3 className="text-lg font-bold mb-4">マーカー一覧</h3>
        <ul className="overflow-y-auto max-h-[calc(100%-50px)]">
          {markersInfos.map((marker) => (
            <li key={marker.markerId} className="p-3 border rounded-md cursor-pointer hover:bg-gray-100 transition" onClick={() => handleSelect(marker.markerId)}>
              <h4 className="font-medium">{marker.title}</h4>
              <p className="text-sm text-gray-600">{marker.country} {marker.prefecture} {marker.city}</p>
            </li>
          ))}
        </ul>
      </div>
      <button className="absolute top-20 left-4 bg-blue-600 text-white px-3 py-1 rounded-md" onClick={() => setIsListOpen(true)}>📍リスト</button>
    </>
  )
}

export default MarkerList;
