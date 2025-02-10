import React from "react";
import { MapComponentProps } from "../interfaces/index"
// import GeocodeAddress from "./GeocodeAddress"

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
                        <strong>住所:</strong> {selectedMarker.fullAddress}
                    </p>
                    <p className="mb-2">
                        <strong>内容:</strong> {selectedMarker.content}
                    </p>
                    {selectedMarker.image && (
                        <img
                            src={selectedMarker.image}
                            alt={selectedMarker.title}
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                    )}
                </div>
            ) : (
                <p className="text-gray-600">マーカーを選択してください。</p>
            )}
        </div>
    );
};

export default MarkerModal;
