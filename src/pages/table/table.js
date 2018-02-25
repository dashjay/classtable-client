// pages/table/table.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      increment: 0
    })

    try {
      // 尝试读取缓存
      app.globalData.start = wx.getStorageSync('start')
      app.globalData.schdules_list = wx.getStorageSync('schdules_list')
    } catch (e) {
      console.log("缓存不存在")
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    if (app.globalData.start == null || app.globalData.start == "") {
      wx.switchTab({
        url: '../settings/settings'
      })
    }
    this.updateScreen()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getWeekList: function (diff_day) {
    var week_num = parseInt(diff_day / 7 + 1)
    this.setData({
      week_num: week_num,
    })
    var week_list = []

    if (app.globalData.schdules_list == null) {
      return null
    }
    for (var i = 0; i < app.globalData.schdules_list.length; i++) {
      if (app.globalData.schdules_list[i].week_num.indexOf(week_num) != -1) {
        week_list.push({
          day_of_week: app.globalData.schdules_list[i].day_of_week,
          class_of_day: app.globalData.schdules_list[i].class_of_day,
          duration: app.globalData.schdules_list[i].duration,
          name: app.globalData.schdules_list[i].name,
          place: app.globalData.schdules_list[i].place
        })
      }
    }
    return week_list
  },
  updateScreen: function () {
    var now = new Date()
    var diff_day_without_increment = parseInt((now - app.globalData.start) / (1000 * 60 * 60 * 24))
    //console.log(diff_day_without_increment)
    var diff_day = diff_day_without_increment + this.data.increment
    //console.log(diff_day)
    if (diff_day < 0) {
      diff_day = 0
    }

    var week_list = this.getWeekList(diff_day)
    this.setData({
      week_list: week_list
    })
  },
  incrementAdd: function () {
    var increment = this.data.increment + 7
    this.setData({
      increment: increment
    })
    this.updateScreen()
  },

  incrementSub: function () {
    var increment = this.data.increment - 7
    this.setData({
      increment: increment
    })
    this.updateScreen()
  },
  incrementZero: function () {
    var increment = 0
    this.setData({
      increment: increment
    })
    this.updateScreen()
  },
})