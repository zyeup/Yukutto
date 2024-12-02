import React, { useState } from 'react';

type AddressSearchProps = {
    map: google.maps.Map | null;
    setLat: React.Dispatch<React.SetStateAction<number>>;
    setLng: React.Dispatch<React.SetStateAction<number>>;
};

type SearchResult = {
    address: string;
    location: google.maps.LatLng;
};

const AddressSearch: React.FC<AddressSearchProps> = ({ map, setLat, setLng }) => {
    const [address, setAddress] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<SearchResult[]>([]);

    const handleSearch = async () => {
        if (!address) {
            setError("住所を入力してください。");
            return;
        }
        setError(null);

        try {
            const geocoder = new google.maps.Geocoder();
            const response = await geocoder.geocode({ address });

            if (response.results.length > 0) {
                const searchResults = response.results.map((result) => ({
                    address: result.formatted_address,
                    location: result.geometry.location,
                }));

                setResults(searchResults);
            } else {
                setError("住所を見つけられませんでした。");
                setResults([]);
            }
        } catch (err) {
            console.error("Geocoding APIエラー:", err);
            setError("検索中にエラーが発生しました。");
        }
    };

    const handleResultClick = (result: SearchResult) => {
        const { location } = result;
        const lat = location.lat();
        const lng = location.lng();

        if (map) {
            map.setCenter(location);
            map.setZoom(14);

            new google.maps.Marker({
                position: location,
                map,
                title: result.address,
            });
        }

        setLat(lat);
        setLng(lng);
        // setResults([]); // 候補リストを非表示にする
    };

    return (
    <div className="p-4 bg-gray-100 shadow-md rounded-lg mb-4">
        <h3 className="text-lg font-semibold mb-2">住所から検索</h3>
        <div className="flex space-x-2">
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="住所を入力"
                className="flex-1 p-2 border rounded-lg"
            />
            <button
                onClick={handleSearch}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
                検索
            </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <ul className="mt-4 border border-gray-300 rounded-lg bg-white shadow-md divide-y divide-gray-200">
            {results.map((result, index) => (
                <li
                    key={index}
                    onClick={() => handleResultClick(result)}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                >
                    {result.address}
                </li>
            ))}
        </ul>
    </div>
    );
};

export default AddressSearch;
