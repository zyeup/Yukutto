import React from 'react'

type MarkerInfo = {
    id: number;
    lat: number;
    lng: number;
    title: string;
};

type MapComponentProps = {
    markersInfos: MarkerInfo[]; // markersInfos プロパティを追加
};

const List: React.FC<MapComponentProps> = ({ markersInfos }) => {
    return (
        <>
            <ul>
                {markersInfos.map((markersInfo) => (
                    <li key={markersInfo.id}>
                        {markersInfo.title}: {markersInfo.lat}, {markersInfo.lng}
                    </li>
                ))}
            </ul>

        </>
    )
}

export default List;