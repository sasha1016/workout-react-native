import React from 'react';
import Layout from './Layout/' ; 

import * as Font from 'expo-font' ; 
import { AppLoading } from 'expo' ; 

const loadFonts = async () => {
  await Font.loadAsync({
    Roboto:require('native-base/Fonts/Roboto.ttf'),
    Roboto_medium:require('native-base/Fonts/Roboto_medium.ttf'),
  })
}

export default function App() {
  const [loaded,setLoaded] = React.useState(false)  ;

  if(loaded) {
    return (<Layout/>)
  } else {
    return (<AppLoading
      startAsync={loadFonts}
      onFinish={() => setLoaded(true)}
    />)
  }
}

