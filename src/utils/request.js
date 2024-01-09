import axios from "axios";

const request = axios.create({
  baseURL: 'https://apis.map.qq.com'
})

export const translate = (lat, lng) => request.get('/ws/translation/v1/translate', {params: {
    key: "NJUBZ-752W4-FMUUF-K2QSO-ULMOE-FJBMV",
    type: 1,
    locations: `${lat},${lng}`
  }})