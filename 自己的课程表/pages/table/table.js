// pages/table/table.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    lastX: 0,          //滑动开始x轴位置
    currentGesture: '', //标识手势
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
      app.globalData.classtable = wx.getStorageSync('classtable')
    } catch (e) {
      console.log(e)
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    if (app.globalData.start == null || app.globalData.start == "") {
      wx.switchTab({
        url: '/pages/settings/settings'
      })
    }
    this.incrementZero()
    this.updateScreen()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.incrementZero()
    wx.stopPullDownRefresh()
  },

  getWeekList: function (diff_day) {
    var week_num = parseInt(diff_day / 7 + 1)
    this.setData({
      week_num: week_num,
    })
    var week_list = []

    if (app.globalData.classtable == null) {
      return null
    }
    for (var i = 0; i < app.globalData.classtable.length; i++) {
      if (app.globalData.classtable[i].week_num.indexOf(week_num) != -1) {
        week_list.push({
          day_of_week: app.globalData.classtable[i].day_of_week,
          class_of_day: app.globalData.classtable[i].class_of_day,
          duration: app.globalData.classtable[i].duration,
          name: app.globalData.classtable[i].name,
          place: app.globalData.classtable[i].place
        })
      }
    }
    return week_list
  },

  updateScreen: function () {
    var now = new Date()
    var diff_day_without_increment = parseInt((now - app.globalData.start) / (1000 * 60 * 60 * 24))
    var diff_day = diff_day_without_increment + this.data.increment
    if (diff_day < 0) {
      diff_day = 0
    }

    var week_list = this.getWeekList(diff_day)
    this.setData({
      week_list: week_list
    })

    wx.setNavigationBarTitle({
      title: "第" + this.data.week_num + "周"
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


  handleTouchMove: function (event) {
    var currentX = event.touches[0].pageX
    var tx = currentX - this.data.lastX
    var text = ""
    if (tx < -40) {
      this.data.currentGesture = 'left'
    }

    else if (tx > 40) {
      this.data.currentGesture = 'right'
    }
  },

  //滑动开始事件
  handleTouchStart: function (event) {
    this.data.lastX = event.touches[0].pageX
  },

  //滑动结束事件
  handleTouchEnd: function (event) {
    if (this.data.currentGesture == 'left') {
      this.incrementAdd()
    }
    if (this.data.currentGesture == 'right') {
      this.incrementSub()
    }
    this.data.currentGesture = 0;
  },

})