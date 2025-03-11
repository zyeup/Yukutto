import api from '../api/axios';
import React, { FormEvent, useRef, useState, useEffect } from 'react';
import { MarkerFormProps } from "../interfaces/index"
import GeocodeAddress from "./GeocodeAddress"

const MarkerForm: React.FC<MarkerFormProps> = ({ postId, lat, lng, title, setTitle, content, setContent, country, setCountry, prefecture, setPrefecture, city, setCity, fullAddress, setFullAddress, addMarker, makeMarker, map }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tmpMarker, setTmpMarker] = useState<google.maps.Marker | null>(null);

  useEffect(() => {
    if (map) {
      nowLocate(lat, lng);
    }
  }, [map, lat, lng]);

  const nowLocate = (clickedLat: number, clickedLng: number) => {

    if (tmpMarker) {
      tmpMarker.setMap(null);
    }
    const marker = new google.maps.Marker({
      position: { lat: clickedLat, lng: clickedLng },
      map,
      title: title,
      icon: {
        fillColor: "red",
        fillOpacity: 1,
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        scale: 8,
        strokeColor: "red",
        strokeWeight: 1.0
      },
      label: {
        text: " ",
        color: 'black',
        fontSize: '20px',
        fontWeight: 'bold',
      },
    });
    marker.setMap(map);
    setTmpMarker(marker);
  }


  const handleAddMarker = async (e: FormEvent) => {

    e.preventDefault();

    if (!map || !title) {
      alert("必要な情報が不足しています");
      return;
    }

    try {
      const formData = new FormData();

      // formDataを使用するため、数値は文字列に変換する
      formData.append("marker[lat]", lat.toString());
      formData.append("marker[lng]", lng.toString());
      formData.append("marker[title]", title);
      formData.append("marker[content]", content);
      formData.append("marker[post_id]", postId.toString());
      formData.append("marker[full_address]", fullAddress.toString());

      if (imageFile) {
        formData.append('marker[image]', imageFile);
      }
      formData.append("marker[location_attributes][country]", country);
      formData.append("marker[location_attributes][prefecture]", prefecture);
      formData.append("marker[location_attributes][city]", city);

      const response = await api.post('/markers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const newMarkerData = response.data;
      const marker = makeMarker(newMarkerData.lat, newMarkerData.lng, newMarkerData.title)

      marker.setMap(map)

      addMarker({
        postId,
        markerId: newMarkerData.id,
        lat: newMarkerData.lat,
        lng: newMarkerData.lng,
        title: newMarkerData.title,
        content: newMarkerData.content,
        marker,
        fullAddress: newMarkerData.fullAddress,
        country: newMarkerData.location.country,
        prefecture: newMarkerData.location.prefecture,
        city: newMarkerData.location.city,
        image: newMarkerData.image.url,
      });
      setTitle("");
      setContent("");
      setImageFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (err) {
      alert("マーカーの作成に失敗しました")
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <div className="absolute top-[100px] right-8 p-4 bg-white shadow-md border rounded-md w-full max-w-md mx-auto z-10">
      <h3 className="text-xl font-bold text-gray-800 mb-4">現在のピンの位置情報</h3>
      <div className="mb-4">
        <GeocodeAddress lat={lat} lng={lng} showAddress={true} country={country} setCountry={setCountry} prefecture={prefecture} setPrefecture={setPrefecture} city={city} setCity={setCity} fullAddress={fullAddress} setFullAddress={setFullAddress} />
        <p className="text-gray-600"><span className="font-medium text-gray-800">緯度：</span>{lat}</p>
        <p className="text-gray-600"><span className="font-medium text-gray-800">経度：</span>{lng}</p>
      </div>
      <form onSubmit={handleAddMarker} className="space-y-4">
        <div>
          <label htmlFor="marker_name" className="block font-bold text-gray-800 mb-2">
            マーカーの名前(30文字以内)
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
              説明文(140文字以内)
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
              ref={fileInputRef}
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
