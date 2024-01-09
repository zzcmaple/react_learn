import coordtransform from "coordtransform";
import { TENCENT_MAP_KEY } from "../constant/base";
/**
 * 将 WGS-84 坐标转换为 GCJ-02 坐标
 * @param geoCoords
 * @returns {*}
 */
export const geoToGCJ02 = (geoCoords) => {
  const { longitude, latitude } = geoCoords; // 经度和纬度

  // 使用 coordtransform 库将坐标从 WGS-84 转换为 GCJ-02
  const gcj02Coords = coordtransform.wgs84togcj02(longitude, latitude);

  return gcj02Coords;
};


// 通过JSONP 跨域获取数据

export const getJSONP = (url, data, callbackStr, callback) => {
  window[callbackStr] = callback;
  data.key = TENCENT_MAP_KEY;
  const urlData = new URLSearchParams(data);
  const script = document.createElement("script");
  script.src = `${url}?${urlData}&callback=${callbackStr}`;
  script.id = "jsonp";
  document.body.appendChild(script);
}

