import React from "react";
import { MapComponentProps } from "../interfaces/index"
import api from '../api/axios';

const MarkerModal: React.FC<MapComponentProps> = ({ markersInfos, setMarkersInfos, selectedMarkerId, setSelectedMarkerId }) => {
    const selectedMarker = markersInfos.find((marker) => marker.markerId === selectedMarkerId);

    const deleteMarker = async (markersInfoId: number) => {

        const confirm = window.confirm("このマーカーを削除します。\n本当によろしいですか？");
        if (confirm) {

            try {
                await api.delete(`/markers/${markersInfoId}`);

                const newArray = [...markersInfos].filter(markerinfos => {
                    if (markerinfos.markerId === markersInfoId) {
                        markerinfos.marker.setMap(null);
                    }
                    return markerinfos.markerId !== markersInfoId;
                })
                setMarkersInfos([...newArray]);

            } catch (err) {
                alert("削除に失敗しました")
            }
        }
    }



    return (
        <div className="absolute bottom-4 right-4 z-20">
            {selectedMarker && (
                <div className="absolute bottom-4 right-4 w-[400px] bg-white/90 shadow-lg rounded-lg p-4">
                    <h3 className="text-lg font-bold mb-2">{selectedMarker.title}</h3>
                    <p className="text-sm text-gray-600">所在地：{selectedMarker.fullAddress}</p>
                    <p className="mt-2">{selectedMarker.content}</p>
                    {selectedMarker.image && <img src={selectedMarker.image} alt={selectedMarker.title} className="w-full h-auto rounded-md mt-2" />}
                    <button className="mt-4 bg-red-600 text-white px-3 py-1 rounded-md" onClick={() => deleteMarker(selectedMarker.markerId)}>削除</button>
                    <button className="absolute top-4 right-4 text-gray-600" onClick={() => setSelectedMarkerId(null)}>✖︎</button>
                </div>
            )}
        </div>
    );
};

export default MarkerModal;
