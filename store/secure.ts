import AsyncStorage from "@react-native-async-storage/async-storage";

export const Storage = {
  get: (name: string, _default?: any): any | null =>
    getItemFromSecureStorage(name, _default),
  multiGet: (nameAndType: [string, any][]): any | null =>
    multiGetItemFromSecureStorage(nameAndType),
  save: (name: string, item: any): Promise<void> =>
    saveItemToSecureStorage(name, item),
  multiSave: (nameAndItem: [string, any][]): Promise<void> =>
    multiSaveItemToSecureStorage(nameAndItem),
  remove: async (name: string): Promise<void> =>
    removeItemFromSecureStorage(name),
};

const getItemFromSecureStorage = async (name: string, _default?: any) => {
  try {
    let item = await AsyncStorage.getItem(name);
    console.log(item);
    return (item && JSON.parse(item)) || _default;
  } catch (error) {
    return _default;
  }
};

const multiGetItemFromSecureStorage = async (nameAndType: [string, any][]) => {
  let result: any = {};
  for (let item in nameAndType) {
    result[item[0]] = await getItemFromSecureStorage(item[0], item[1]);
  }
  return result;
};

const saveItemToSecureStorage = async (
  name: string,
  item: any
): Promise<void> => {
  await AsyncStorage.setItem(name, JSON.stringify(item));
};

const multiSaveItemToSecureStorage = async (
  nameAndItem: [string, any][]
): Promise<void> => {
  for (let item in nameAndItem) {
    await AsyncStorage.setItem(item[0], JSON.stringify(item[1]));
  }
  return;
};

const removeItemFromSecureStorage = async (name: string): Promise<void> => {
  return;
};
