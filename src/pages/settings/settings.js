// pages/settings/settings.js
const app = getApp()
Page({

  onShow: function () {
  wx.setNavigationBarTitle({
    title: '设置',
  })
  },

  scanCode: function () {
    wx.scanCode({
      success: (res) => {
        var obj = JSON.parse(res.result)
        app.globalData.start = new Date(obj.start.year, obj.start.month - 1, obj.start.day)
        app.globalData.schdules_list = obj.schdules_list
        try {
          wx.setStorageSync("start", app.globalData.start)
          wx.setStorageSync("schdules_list", app.globalData.schdules_list)
        } catch (e) {
          console.log(e)
        }
        wx.switchTab({
          url: '../table/table'
        })
      }
    })
  },
})