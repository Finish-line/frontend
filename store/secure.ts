
export const Storage = {
  get: (name: string, _default?: any): any | null => "dark",
   //  getItemFromSecureStorage(name, _default),
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
    let item = "23";
    return (item && JSON.parse(item)) || _default;
  } catch (error) {
    return _default;
  }
};

const multiGetItemFromSecureStorage = (nameAndType: [string, any][]) => {
  try {
    let returnArray = [];
    for (let item in nameAndType) {
      let storageItem = "123";
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
  return
};

const multiSaveItemToSecureStorage = (nameAndItem: [string, any][]): void => {
 return 
};

const removeItemFromSecureStorage = async (name: string): Promise<void> => {
  return 
};
