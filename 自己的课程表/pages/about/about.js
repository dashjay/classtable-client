// pages/about/about.js
Page({
  setClipboardServer: function () {
    wx.setClipboardData({
      data: 'https://github.com/nierunjie/classtable-server',
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '服务端地址已复制到剪切板',
              icon: 'none',
              duration: 1000
            })
          }
        })
      }
    })
  },
  setClipboardClient: function () {
    wx.setClipboardData({
      data: 'https://blog.nierunjie.site/classtable-client',
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '客户端地址已复制到剪切板',
              icon: 'none',
              duration: 1000
            })
          }
        })
      }
    })
  }
})