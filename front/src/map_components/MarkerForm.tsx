import api from '../api/axios';
import React, { FormEvent } from 'react';
import { useParams } from 'react-router-dom';


type MarkerFormProps = {
  lat: number;
  lng: number;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  addMarker: (newMarker: any) => void;
  map: google.maps.Map | null;
};


const MarkerForm: React.FC<MarkerFormProps> = ({ lat, lng, title, setTitle, addMarker, map }) => {
  const { postId } = useParams<{ postId: string }>();

  const handleAddMarker = async (e: FormEvent) => {

    e.preventDefault();

    if (!map || !title) {
      alert("必要な情報が不足しています");
      return;
    }

    try {
      const post_id = parseInt(postId || "0");
      const response = await api.post('/markers', {
        lat: lat,
        lng: lng,
        title: title,
        post_id: post_id
      })

      const newMarkerData = response.data;

      const marker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: title,
        label: {
          text: title,
          color: 'black',
          fontSize: '20px',
          fontWeight: 'bold',
        },
        animation: google.maps.Animation.DROP,
      });

      marker.setMap(map)
      addMarker({ id: newMarkerData.id, lat, lng, title, marker });
      setTitle("");

    } catch (err) {
      alert("マーカーの作成に失敗しました")
    }
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-md w-full max-w-sm mx-auto">
      <h3 className="text-xl font-bold text-gray-800 mb-4">現在のピンの位置情報</h3>
      <div className="mb-4">
        <p className="text-gray-600"><span className="font-medium text-gray-800">緯度：</span>{lat}</p>
        <p className="text-gray-600"><span className="font-medium text-gray-800">経度：</span>{lng}</p>
      </div>
      <form onSubmit={handleAddMarker} className="space-y-4">
        <div>
          <label htmlFor="marker" className="block font-bold text-gray-800 mb-2">
            マーカーに表示する名前を入力
          </label>
          <input
            id="marker"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトルを入力"
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none py-2 px-4 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          この名前でピンを保存する
        </button>
      </form>
    </div>
  )
}

export default MarkerForm;
