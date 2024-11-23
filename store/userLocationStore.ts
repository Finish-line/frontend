import { proxy } from "valtio";

interface Store {
  fromLat: number;
  fromLon: number;
  toLat: number;
  toLon: number;
  fromText: string;
  toText: string;
  setFromLat: (fromLat: number) => void;
  setFromLon: (fromLon: number) => void;
  setToLat: (toLat: number) => void;
  setToLon: (toLon: number) => void;
  setFromText: (text: string) => void;
  setToText: (text: string) => void;
}

export const userLocationStore: Store = proxy<Store>({
  fromLat: 0.0,
  fromLon: 0.0,
  toLat: 0.0,
  toLon: 0.0,
  fromText: "",
  toText: "",
  setFromLat: (fromLat: number) => (userLocationStore.fromLat = fromLat),
  setFromLon: (fromLon: number) => (userLocationStore.fromLon = fromLon),
  setToLat: (toLat: number) => (userLocationStore.toLat = toLat),
  setToLon: (toLon: number) => (userLocationStore.toLon = toLon),
  setFromText: (text: string) => (userLocationStore.fromText = text),
  setToText: (text: string) => (userLocationStore.toText = text),
});
