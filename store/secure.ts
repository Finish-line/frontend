import * as SecureStore from "expo-secure-store";

export const Storage = {
  get: (name: string, _default?: any): any | null =>
    getItemFromSecureStorage(name, _default),
  multiGet: (nameAndType: [string, any][]): any | null =>
    multiGetItemFromSecureStorage(nameAndType),
  save: (name: string, item: any): void => saveItemToSecureStorage(name, item),
  multiSave: (nameAndItem: [string, any][]): void =>
    multiSaveItemToSecureStorage(nameAndItem),
  remove: async (name: string): Promise<void> =>
    removeItemFromSecureStorage(name),
};

const getItemFromSecureStorage = (name: string, _default?: any) => {
  try {
    let item = SecureStore.getItem(name);
    return (item && JSON.parse(item)) || _default;
  } catch (error) {
    return _default;
  }
};

const multiGetItemFromSecureStorage = (nameAndType: [string, any][]) => {
  try {
    let returnArray = [];
    for (let item in nameAndType) {
      let storageItem = SecureStore.getItem(nameAndType[0][0]);
      if (storageItem) {
        returnArray.push([
          JSON.parse(storageItem),
          nameAndType[1] !== undefined ? nameAndType[1] : "",
        ]);
      }
    }
    return returnArray;
  } catch (error) {
    return null;
  }
};

const saveItemToSecureStorage = (name: string, item: any): void => {
  try {
    SecureStore.setItem(name, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

const multiSaveItemToSecureStorage = (nameAndItem: [string, any][]): void => {
  try {
    for (let item of nameAndItem) {
      SecureStore.setItem(item[0], JSON.stringify(item[1]));
    }
  } catch (error) {
    console.log(error);
  }
};

const removeItemFromSecureStorage = async (name: string): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(name);
  } catch (error) {
    console.log(error);
  }
};
