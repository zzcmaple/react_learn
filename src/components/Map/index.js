import "./index.scss";
import { useRef, useEffect, useState } from "react";
import { getJSONP } from "../../utils/utils";

const SearchCom = ({map, markerLayer}) => {
  const [mapAddressValue, setMapAddressValue] = useState("");
  const [showSearchMapList, setShowSearchMapList] = useState(false);
  const searchMapAddress = (e) => {
    if (e.which === 13) {
      getPointByAddress();
    }
  };

  const getPointByAddressCallback = (data) => {
    console.log(data)
    markerLayer.add(data.data.map((item) => ({
      id: Date.now(), //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
      styleId: "myStyle", //指定样式id
      position: new window.TMap.LatLng(item.location.lat, item.location.lng), //点标记坐标位置
      properties: {
        //自定义属性
        title: item.title,
        address: item.address
      }
    })) );
  };
  const getPointByAddress = () => {
    console.log(map)
    const params = {
      keyword: encodeURI(mapAddressValue),
      boundary: `nearby(${map.getCenter().lat},${map.getCenter().lng},1000,1)`,

      output: "jsonp",
    };
    getJSONP(
        "https://apis.map.qq.com/ws/place/v1/search",
        params,
        "getPointByAddressCallback",
        getPointByAddressCallback,
    );
  };
  return (
    <>
      <input
          className="seachIpt"
          maxLength={33}
          placeholder="搜索周边"
          value={mapAddressValue}
          onChange={(e) => setMapAddressValue(e.target.value.trim())}
          onKeyUp={(e) => searchMapAddress(e)}
      />
      {
        showSearchMapList && <div className="searchMapList"></div>
      }
    </>
  );
};
const Map = () => {
  const { TMap } = window;
  let isClickPoint = false;
  const [map, setMap] = useState(null);
  const [markerLayer, setMarkerLayer] = useState(null);
  useEffect(() => {
    getCurrentPosition();
  }, []);
  const init = ({ lat, lng }) => {
    const map1 = new TMap.Map(document.getElementById("map"), {
      center: new TMap.LatLng(lat, lng), //设置地图中心点坐标
      zoom: 17.2, //设置地图缩放级别
      pitch: 43.5, //设置俯仰角
      rotation: 45, //设置地图旋转角度
      viewMode: "2D",
    });
    const markerLayer1 = new TMap.MultiMarker({
      map: map1, //指定地图容器
      //样式定义
      styles: {
        //创建一个styleId为"myStyle"的样式（styles的子属性名即为styleId）
        myStyle: new TMap.MarkerStyle({
          width: 25, // 点标记样式宽度（像素）
          height: 35, // 点标记样式高度（像素）
          //焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
          anchor: { x: 16, y: 32 },
        }),
      },
      //点标记数据数组
      geometries: [
        {
          id: "1", //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
          styleId: "myStyle", //指定样式id
          position: new TMap.LatLng(lat, lng), //点标记坐标位置
          properties: {
            //自定义属性
            title: "marker1",
          },
        },
      ],
    });

    map1.on("click", (e) => {
          const lat = e.latLng.getLat().toFixed(6);
          const lng = e.latLng.getLng().toFixed(6);
          if (!isClickPoint) {
            markerLayer1.add([
              {
                id: Date.now(), //点标记唯一标识，后续如果有删除、修改位置等操作，都需要此id
                styleId: "myStyle", //指定样式id
                position: new TMap.LatLng(lat, lng), //点标记坐标位置
                properties: {
                  //自定义属性
                  title: "marker3",
                },
              },
            ]);
          } else {
            isClickPoint = false;
          }
        }
    );
    markerLayer1.on("click", (e) => {
          isClickPoint = true;
          if (window.alert(`${e.geometry.properties.title}\n${e.geometry.properties.address ? e.geometry.properties.address : ''}`)) {
            markerLayer1.remove([e.geometry.id]);
          }
        }
    );
    setMap(map1);
    setMarkerLayer(markerLayer1);
  };
  const translatePointCallback = (data) => {
    if (data.status !== 0) {
      alert(data.message);
      return;
    }
    init(data.locations[0]);
  };
  const translatePoint = ({ latitude, longitude }) => {
    const params = {
      locations: `${latitude},${longitude}`,
      output: "jsonp",
      type: 1,
    };
    getJSONP(
      "https://apis.map.qq.com/ws/coord/v1/translate",
      params,
      "translatePointCallback",
      translatePointCallback,
    );
  };
  const getCurrentPosition = () => {
    if (!("geolocation" in navigator)) return;
    navigator.geolocation.getCurrentPosition((position) => {
      translatePoint(position.coords);
    });
  };

  return (
    <div className="mapBox">
      <SearchCom map={map} markerLayer={markerLayer}  />
      <div id="map"></div>
    </div>
  );
};

export default Map;
