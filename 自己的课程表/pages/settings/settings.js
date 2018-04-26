// pages/settings/settings.js
const app = getApp()
Page({
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '设置',
    })
  },

  getClipboard: function () {
    wx.getClipboardData({
      success: function (res) {
        try {
          var obj = JSON.parse(res.data)
          app.globalData.start = new Date(obj.start.year, obj.start.month - 1, obj.start.day)
          app.globalData.classtable = obj.classtable
          wx.setStorageSync("start", app.globalData.start)
          wx.setStorageSync("classtable", app.globalData.classtable)
          wx.switchTab({
            url: '/pages/table/table'
          })
        } catch (e) {
          wx.showToast({
            title: '信息有误 请阅读文档',
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  },

  enterRegistrar: function () {
    wx.navigateTo({
      url: '/pages/registrar/registrar'
    })
  },

  about:function(){
    wx.navigateTo({
      url: '/pages/about/about'
    })
  },

})