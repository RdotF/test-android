import { View, Text, InputAccessoryView, ActivityIndicator } from 'react-native'
import * as React from 'react'
import * as FileSystem from 'expo-file-system';
import {Asset} from 'expo-asset';
import {SQLiteProvider} from 'expo-sqlite/next';
import { useSQLiteContext } from 'expo-sqlite/next';

const loadDatabase = async () => {
  const dbName = "MobileSQLite.db";
  const dbAsset = require("../../assets/MobileSQLite.db");
  const dbUri = Asset.fromModule(dbAsset).uri;
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;

  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);
  if(!fileInfo.exists) {
      await FileSystem.makeDirectoryAsync(
        `${FileSystem.documentDirectory}SQLite`, {intermediates: true});
      await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
}


export default{
 loadDatabase,
  

}