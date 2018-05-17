//index.js
Page({
  data: {
    latitude: 0,
    longitude: 0
  },
  bindcontroltap: function(e){
    switch(e.controlId){
      case 1 :
        this.movetoCenter();
        break;
      case 2 :
        if(this.timer){
          wx.navigateBack({
            delta: 1
          })
        }else{
          wx.scanCode({
            success: () => {
              wx.showLoading({
                title: '正在获取密码',
              })
              wx.request({
                url: 'https://www.easy-mock.com/mock/5adc4b706b6af920eaf263d1/demo/getName#!method=get',
                success : (res) => {
                  wx.hideLoading();
                  wx.redirectTo({
                    url: '../scanResult/index?password='+res.data.data.password+'&number='+res.data.data.number,
                    success:() => {
                      wx.showToast({
                        title: '获取密码成功',
                      })
                    }
                  })
                }
              })
            },fail: () => {

            }
          })
        } 
        break; 
      case 3 :
        wx.navigateTo({
          url: '../warn/index',
        })
        break
      case 4 :    
        wx.navigateTo({
          url: '../my/index',
        })
    }
  } ,
  onLoad: function(options){
    this.timer = options.timer;
    wx.getLocation({
      type:'wgs84',
      success: (res) => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
    })
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          controls:[{
            id:1,
            iconPath:'/img/location.png',
            position: {
              width: 40,
              height: 45,
              left: 20,
              top: res.windowHeight - 90
            },
            clickable: true
          },{
            id: 2,
            iconPath: '/img/bike.png',
            position: {
              width: 140,
              height: 140,
              left: res.windowWidth / 2 - 70,
              top: res.windowHeight - 140
            },
            clickable: true
          },{
            id:3,
            iconPath:'/img/setting.png',
            position:{
              width:45,
              height:40,
              top:res.windowHeight - 70,
              left:res.windowWidth - 70
            },
            clickable: true
          },{
            id:4,
            iconPath:'/img/pay.png',
            position:{
              width:40,
              height:40,
              top:res.windowHeight - 140,
              left:res.windowWidth - 70
            },
            clickable: true
          }]
        })
      },
    })
  },
  onShow: function(){
    this.mapctx = wx.createMapContext('yz-map');
    this.movetoCenter()
  },
  movetoCenter: function(){
    this.mapctx.moveToLocation()   
  }
})
