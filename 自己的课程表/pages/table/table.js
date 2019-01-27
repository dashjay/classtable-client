const app = getApp()

Page({
  data: {
    colorArrays: ["#85B8CF", "#90C652", "#D8AA5A", "#FC9F9D", "#0A9A84", "#61BC69", "#12AEF3", "#E29AAD"],
    lastX: 0,
    currentGesture: '',
  },

  isNotExisted: function (item) {
    if (item == "" || item == null) {
      return true
    }
    return false
  },

  haveData: function () {
    console.log(app.globalData.start)
    if (
      this.isNotExisted(app.globalData.classtable) ||
      this.isNotExisted(app.globalData.start)
    ) {
      return false
    }
    return true
  },

  onLoad: function (options) {
    this.setData({
      increment: 0
    })

    app.globalData.start = wx.getStorageSync('start')
    app.globalData.classtable = wx.getStorageSync('classtable')


  },

  onShow: function () {
    if (!this.haveData()) {
      wx.showToast({
        title: '长按该页面,获取剪切板数据',
        icon: 'none',
        duration: 3000
      })
      return
    }
    this.incrementZero()
  },

  onPullDownRefresh: function () {
    setTimeout(this.incrementZero, 500)
    setTimeout(wx.stopPullDownRefresh, 500)
  },

  getWeekList: function (diff_day) {

    var week_num = parseInt(diff_day / 7 + 1)
    this.setData({
      week_num: week_num,
    })
    var week_list = []

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
    if (!this.haveData()) {
      return
    }
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
    this.setData({ increment: increment })
    this.updateScreen()
  },

  incrementSub: function () {
    var increment = this.data.increment - 7
    this.setData({ increment: increment })
    this.updateScreen()
  },

  incrementZero: function () {
    this.setData({ increment: 0 })
    this.updateScreen()
  },


  handleTouchMove: function (event) {
    var currentX = event.touches[0].pageX
    var tx = currentX - this.data.lastX
    if (tx < -100) { this.data.currentGesture = 'left' }
    else if (tx > 100) { this.data.currentGesture = 'right' }
  },


  handleTouchStart: function (event) {
    this.data.lastX = event.touches[0].pageX
  },

  handleTouchEnd: function (event) {
    if (this.data.currentGesture == 'left') { this.incrementAdd() }
    if (this.data.currentGesture == 'right') { this.incrementSub() }
    this.data.currentGesture = 0;
  },

  getClipboard: function () {
    wx.getClipboardData({
      success: function (res) {
        try {
          var obj = JSON.parse(res.data)
          if (obj.start.year == null) {
            throw 'Error'
          }
          app.globalData.start = new Date(
            obj.start.year,
            obj.start.month - 1,
            obj.start.day)

          app.globalData.classtable = obj.classtable
          wx.setStorageSync("start", app.globalData.start)
          wx.setStorageSync("classtable", app.globalData.classtable)
        } catch (e) {
          wx.setClipboardData({
            data: 'https://classtable.lanthora.org',
            success: function (res) {
              wx.getClipboardData({
                success: function (res) {
                  console.log(res.data) // data
                }
              })
            }
          })

          wx.showToast({
            title: '信息有误,获取信息方式已复制到剪切板,请使用浏览器查看',
            icon: 'none',
            duration: 5000
          })
        }
      }
    })
  },

  bindLongTab: function () {
    var _this = this
    wx.showModal({
      title: '提示',
      content: '是否从剪切板更新课表',
      success: function (res) {
        if (res.confirm) {
          _this.getClipboard()
          setTimeout(_this.incrementZero, 500)
        }
      }
    })
  }
})
