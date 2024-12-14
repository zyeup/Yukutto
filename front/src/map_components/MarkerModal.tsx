import React, { Dispatch, SetStateAction } from "react";

type MarkerInfo = {
    id: number;
    lat: number;
    lng: number;
    title: string;
    content: string;
    marker: google.maps.Marker;
};

type MapComponentProps = {
    markersInfos: MarkerInfo[];
    setMarkersInfos: Dispatch<SetStateAction<MarkerInfo[]>>;
    selectedMarkerId: number | null;
    setSelectedMarkerId: Dispatch<SetStateAction<number | null>>;
};

const MarkerModal: React.FC<MapComponentProps> = ({ markersInfos, selectedMarkerId }) => {
    const selectedMarker = markersInfos.find((marker) => marker.id === selectedMarkerId);

    return (
        <div className="w-1/4 h-full bg-gray-50 shadow-lg p-4 overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">マーカー詳細</h3>
            {selectedMarker ? (
                <div className="text-gray-600">
                    <p className="mb-2">
                        <strong>タイトル:</strong> {selectedMarker.title}
                    </p>
                    <p className="mb-2">
                        <strong>内容:</strong> {selectedMarker.content}
                    </p>
                </div>
            ) : (
                <p className="text-gray-600">マーカーを選択してください。</p>
            )}
        </div>
    );
};

export default MarkerModal;
