// pages/warn/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: {
      num: 0,
      desc: ''
    },
    actionText: '拍摄/相册',
    picUrls: [],
    checkboxValues: [],
    itemsValue: [{
      value: '私锁私用',
      checked: false,
      color: '#b9dd08'
    }, {
      value: '车牌缺损',
      checked: false,
      color: '#b9dd08'
    }, {
      value: '轮胎坏了',
      checked: false,
      color: '#b9dd08'
    }, {
      value: '座椅坏了',
      checked: false,
      color: '#b9dd08'
    }, {
      value: '踏板坏了',
      checked: false,
      color: '#b9dd08'
    }, {
      value: '违规停放',
      checked: false,
      color: '#b9dd08'
    }, {
      value: '刹车不灵',
      checked: false,
      color: '#b9dd08'
    }, {
      value: '其他故障',
      checked: false,
      color: '#b9dd08'
    }],
    btnColor: '#f2f2f2'
  },
  changeCheckbox: function (e) {
    var _value = e.detail.value;
    if (_value.length == 0) {
      this.setData({
        btnColor: '#f2f2f2',
        checkboxValues: []
      })
    } else {
      this.setData({
        checkboxValues: _value,
        btnColor: '#b9dd08'
      })
    }
  },
  clickPhoto: function () {
    wx.chooseImage({
      success: (res) => {
        var _picUrls = this.data.picUrls;
        var _tfs = res.tempFilePaths;
        for (let temp of _tfs) {
          _picUrls.push(temp);
          this.setData({
            picUrls: _picUrls,
            actionText: ' + '
          })
        }
      },
    })
  },
  delPic: function (e) {
    let index = e.target.dataset.index;
    let _picUrls = this.data.picUrls;
    _picUrls.splice(index, 1);
    this.setData({
      picUrls: _picUrls
    })
    if (_picUrls.length == 0) {
      this.setData({
        actionText: '拍摄/相册'
      })
    }
  },
  changeNumber: function (e) {
    this.setData({
      inputValue: {
        num: e.detail.value,
        desc: this.data.inputValue.des
      }
    })
  },
  changeDesc: function (e) {
    this.setData({
      inputValue: {
        num: this.data.inputValue.num,
        desc: e.detail.value
      }
    })
  },
  submit:function(){
    if(this.data.picUrls.length > 0 && this.data.checkboxValues.length > 0){
      wx.request({
        url: 'https://www.easy-mock.com/mock/5adc4b706b6af920eaf263d1/demo/submit',
        success: (res) => {
          wx.showToast({
            title: '提交成功',
            icon: "success"
          }),
         setTimeout(function(){
           wx.navigateBack({
             delta:1
           })
         },1500)
        }
      })
    }else{
      wx.showModal({
        title: '请填写完整的反馈信息',
        content: '不填信息就提交，你是不是石乐志',
        confirmText:'我填我填',
        cancelText:'我就不填',
        success:(res) => {
          if(res.cancel){
            wx.navigateBack({
              delta:1
            })
          }
        }
      })
    }
  }
})