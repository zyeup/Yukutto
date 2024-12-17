import api from '../api/axios';
import React, { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';


type MarkerFormProps = {
  lat: number;
  lng: number;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  addMarker: (newMarker: any) => void;
  map: google.maps.Map | null;
};


const MarkerForm: React.FC<MarkerFormProps> = ({ lat, lng, title, setTitle, content, setContent, addMarker, map }) => {
  const { postId } = useParams<{ postId: string }>();
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleAddMarker = async (e: FormEvent) => {

    e.preventDefault();

    if (!map || !title) {
      alert("必要な情報が不足しています");
      return;
    }

    try {
      const post_id = parseInt(postId || "0");

      const formData = new FormData();

      formData.append('lat', lat.toString());
      formData.append('lng', lng.toString());
      formData.append('title', title);
      formData.append('content', content);
      formData.append('post_id', post_id.toString());
      if (imageFile) {
        formData.append('image', imageFile); // 画像ファイルを追加
      }


      const response = await api.post('/markers', formData,  {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

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
      addMarker({ id: newMarkerData.id, lat, lng, title, content, marker, image: newMarkerData.image_url, });
      setTitle("");
      setContent("");
      setImageFile(null);

    } catch (err) {
      alert("マーカーの作成に失敗しました")
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const initialNum = ( num: number) => {
    if (num == 35.6809591 || num == 139.7673068)
      return "クリックすると表示されます"
    else
    return num
  }

  return (
    <div className="p-4 bg-white shadow-md border rounded-md w-full max-w-md mx-auto">
      <h3 className="text-xl font-bold text-gray-800 mb-4">現在のピンの位置情報</h3>
      <div className="mb-4">
        <p className="text-gray-600"><span className="font-medium text-gray-800">緯度：</span>{initialNum(lat)}</p>
        <p className="text-gray-600"><span className="font-medium text-gray-800">経度：</span>{initialNum(lng)}</p>
      </div>
      <form onSubmit={handleAddMarker} className="space-y-4">
        <div>
          <label htmlFor="marker_name" className="block font-bold text-gray-800 mb-2">
            マーカーに表示する名前を入力
          </label>
          <input
            id="marker_name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトルを入力"
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none py-2 px-4 rounded-md"
          />
          <div>
            <label htmlFor="marker_content" className="block font-bold text-gray-800 mb-2">
              マーカーの説明文を入力
            </label>
            <textarea
              id="marker_content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="説明文を入力"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none py-2 px-4 rounded-md"
            ></textarea>
          </div>
          <div>
            <label htmlFor="marker_image" className="block font-bold text-gray-800 mb-2">
              マーカーに関連する画像をアップロード
            </label>
            <input
              type="file"
              id="marker_image"
              onChange={handleImageChange}
              className="w-full border border-gray-300 py-2 px-4 rounded-md"
            />
          </div>
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
