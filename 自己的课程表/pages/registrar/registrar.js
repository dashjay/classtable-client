// pages/registrar/registrar.js
const app = getApp()
Page({

  data: {
    date: '2018-03-15',
    array: ['TSMC', 'SDAU'],
    index: 0,
    username: 'Ya',
    password: '****',
    captcha: 'Hello World',
    captcha_base64: ""
  },

  setDate: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  setSchool: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

  getCaptcha: function () {
    var _this = this;
    var school = this.data.array[this.data.index];
    wx.request({
      url: 'http://classtable/login',
      data: {
        school: school,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        wx.setStorageSync("sessionid", res.header["Set-Cookie"])
        _this.setData({
          captcha_base64: res.data
        });
      }
    })


  },

  formSubmit: function (e) {
    var school = (this.data.array[this.data.index]).toLowerCase();
    var year = this.data.date.split('-')[0];
    var month = this.data.date.split('-')[1];
    var day = this.data.date.split('-')[2];
    var username = e.detail.value.username;
    var password = e.detail.value.password;
    var captcha_text = e.detail.value.captcha;

    wx.request({
      url: 'http://classtable/login',
      method: 'POST',
      data: {
        school: school,
        username: username,
        password: password,
        captcha_text: captcha_text,
        year: year,
        month: month,
        day: day,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': wx.getStorageSync("sessionid")
      },
      success: function (res) {
        console.log(res.data)
        var obj = res.data
        app.globalData.start = new Date(obj.start.year, obj.start.month - 1, obj.start.day)
        app.globalData.classtable = obj.classtable
        wx.setStorageSync("start", app.globalData.start)
        wx.setStorageSync("classtable", app.globalData.classtable)
        wx.switchTab({
          url: '/pages/table/table'
        })
      }
    })
  },
})