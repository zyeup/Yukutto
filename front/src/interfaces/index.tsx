import { Dispatch, SetStateAction } from 'react';

export type PostData = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updateAt: string;
  userId: number | undefined;
};

export type PostProps = {
  posts: PostData[];
  setPosts: Dispatch<SetStateAction<PostData[]>>;
};

export type MarkerInfo = {
  id: number;
  lat: number;
  lng: number;
  title: string;
  content: string;
  fullAddress: string;
  country: string;
  prefecture: string;
  city: string;
  marker: google.maps.Marker;
  image: string;
};

export type MarkerFormProps = {
  id: number;
  lat: number;
  lng: number;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  prefecture: string;
  setPrefecture: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  fullAddress: string;
  setFullAddress: React.Dispatch<React.SetStateAction<string>>;
  addMarker: (newMarker: any) => void;
  makeMarker: (lat: number, lng: number, title: string) => google.maps.Marker;
  map: google.maps.Map | null;
};

export type MapComponentProps = {
  markersInfos: MarkerInfo[];
  setMarkersInfos: Dispatch<SetStateAction<MarkerInfo[]>>;
  selectedMarkerId: number | null;
  setSelectedMarkerId: Dispatch<SetStateAction<number | null>>;
  centerMapOnMarker: (markerId: number) => void;
};

export type AddressSearchProps = {
  map: google.maps.Map | null;
  setLat: React.Dispatch<React.SetStateAction<number>>;
  setLng: React.Dispatch<React.SetStateAction<number>>;
};

export type SearchResult = {
  address: string;
  location: google.maps.LatLng;
};

export interface SignUpParams {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface SignInParams {
  email: string
  password: string
}

export interface User {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  nickname?: string
  image?: string
  allowPasswordChange: boolean
  createdAt: Date
  updatedAt: Date
}
