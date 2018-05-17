// pages/charge/index.js
Page({
  /**
   * 页面的初始数据
   */
  input:function(e){
    this.setData({
      money: e.detail.value
    })
  },
  charge:function(){
    if(this.data.money <= 0 || isNaN(this.data.money)){
      wx.showModal({
        title: '充值失败',
        content: '能不能好好输？',
      })
    }else{
      wx.getStorage({
        key: 'overage',
        success: (res) => {
          wx.setStorage({
            key: 'overage',
            data: parseInt(res.data) + parseInt(this.data.money),
          })  
        },
        fail:() => {
          wx.setStorage({
            key: 'overage',
            data: this.data.money,
          })
        }
      })
     
      wx.redirectTo({
        url: '../wallet/index',
      })
    }
  }
})