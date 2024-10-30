import axios from 'axios';
import React, { FormEvent } from 'react';


type MarkerFormProps = {
  lat: number;
  lng: number;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  addMarker: (newMarker: any) => void;
  map: google.maps.Map | null;
};


const MarkerForm: React.FC<MarkerFormProps> = ({ lat, lng, title, setTitle, addMarker, map }) => {

  const handleAddMarker = async (e: FormEvent) => {

    e.preventDefault();

    if (!map || !title) {
      alert("必要な情報が不足しています");
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/v1/markers', {
        lat: lat,
        lng: lng,
        title: title,
      })

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
      addMarker({ id: Date.now(), lat, lng, title, marker });
      setTitle("");

    } catch (err) {
      alert("マーカーの作成に失敗しました")
    }
  }

  return (
    <div>
      <h3>現在のピンの位置情報</h3>
      <p>緯度：{lat}</p>
      <p>経度：{lng}</p>
      <form>
        <label className='font-bold' htmlFor='marker'>マーカーに表示する名前を入力
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトルを入力"
            className="border border-1 border-black focus:border-black focus:outline-none py-2 px-4 rounded"
          />
        </label>
        <button
          type="submit"
          className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddMarker}>この名前でピンを保存する
        </button>

      </form>

    </div>
  )
}

export default MarkerForm;