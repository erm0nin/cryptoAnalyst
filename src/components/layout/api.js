import {cryptoAssets, cryptoData} from '../../data';

export function fakeFetchCrypto(){
  return new Promise(resolve => {
    setTimeout(()=>{
      resolve(cryptoData)
    }, 200)
  })
}

export function fatchAssets(){
  return new Promise(resolve => {
    setTimeout(()=>{
      resolve(cryptoAssets)
    }, 200)
  })
}