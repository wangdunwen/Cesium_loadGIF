// 加载js
window.onload = function () {
  // 初始化地图
  initMap();

  // gif测试
  testGif();
};

/*
* 初始化地图
*/
function initMap() {
  window.viewer = new Cesium.Viewer('map', {
    animation: false,
    fullscreenButton: false,
    baseLayerPicker: false,
    geocoder: false,
    homeButton: false,
    infoBox: false,
    sceneModePicker: false,
    selectionIndicator: false,
    timeline: false,
    navigationHelpButton: false,
    imageryProvider: Cesium.createTileMapServiceImageryProvider({
      url : '../lib/Cesium/Assets/Textures/NaturalEarthII',
      fileExtension: 'jpg'
    })
  });

  // 去除版权信息
  viewer._cesiumWidget._creditContainer.style.display = 'none';

  // 显示帧率插件
  viewer.scene.debugShowFramesPerSecond = true;
}

/*
* gif测试
*/
function testGif() {
  const gifDiv = document.createElement('div');
  const gifImg = document.createElement('img');

  // gif库需要img标签配置下面两个属性
  gifImg.setAttribute('rel:animated_src', '../res/images/timg.gif')
  gifImg.setAttribute('rel:auto_play', '0')
  gifDiv.appendChild(gifImg);

  // 新建gif实例
  var rub = new SuperGif({ gif: gifImg } );

  rub.load(function () {
    var img_list = [];

    // 获取 gif 图的每一帧图片
    for (var i=1; i <= rub.get_length(); i++) {
      // 遍历gif实例的每一帧
      rub.move_to(i);
      img_list.push(rub.get_canvas().toDataURL())
    }

    let flag = 0;
    let len = img_list.length;
    // 创建图片实体
    let gif_entity = viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
      billboard: {
        image: img_list[0], // default: undefined
        show: true, // default
        scale: 0.3 // default: 1.0
      }
    });

    // 循环更新 billboard
    setInterval(() => {
      flag++;
      if (flag >= len) {
        flag = 0;
      }
      gif_entity.billboard.image = img_list[flag];
    }, 1000 / 30);
  });
}