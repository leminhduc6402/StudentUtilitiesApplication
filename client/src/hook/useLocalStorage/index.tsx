import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalStorageContext } from '../../store/LocalStorageContext';
import { useState, useContext } from 'react';

const storage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: null,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
    // we'll talk about the details later.
  },
});

function useLocalStorage() {
  const [dataSync, setDataSync]: any = useContext(LocalStorageContext);

  function storeData(key: string, data: any) {
    storage.save({
      key,
      data,
      // if expires not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: null,
    });
  }

  function getData(key: string) {
    storage
      .load({
        key,

        // autoSync (default: true) means if data is not found or has expired,
        // then invoke the corresponding sync method
        autoSync: true,

        // syncInBackground (default: true) means if data expired,
        // return the outdated data first while invoking the sync method.
        // If syncInBackground is set to false, and there is expired data,
        // it will wait for the new data and return only after the sync completed.
        // (This, of course, is slower)
        syncInBackground: true,

        // you can pass extra params to the sync method
        // see sync example below
        syncParams: {
          extraFetchOptions: {
            // blahblah
          },
          someFlag: true,
        },
      })
      .then((res) => {
        // found data go to then()
        setDataSync({
          ...dataSync,
          [key]: res,
        });
      })
      .catch((err) => {
        switch (err.name) {
          case 'NotFoundError':
            setDataSync({
              ...dataSync,
              [key]: null,
            });
            break;
          case 'ExpiredError':
            // TODO
            break;
        }
      });
  }

  function removeData(key: string) {
    try {
      storage.remove({
        key,
      });
      setDataSync({
        ...dataSync,
        [key]: null,
      });
    } catch (error) {
      // There was an error on the native side
    }
  }

  return { dataSync, storeData, getData, removeData };
}

export default useLocalStorage;
