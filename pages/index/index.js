//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    accounts: [],

  },
  kindToggle: function (e) {
    var id = e.currentTarget.id, accounts = this.data.accounts;
    for (var i = 0, len = accounts.length; i < len; ++i) {
      if (accounts[i].id == id) {
        accounts[i].open = !accounts[i].open
      } else {
        accounts[i].open = false
      }
    }
    this.setData({
      accounts: accounts
    });
  },
  copyPassword: function (e) {
    var id = e.currentTarget.id, accounts = this.data.accounts;
    var password = ""
    for (var i = 0, len = accounts.length; i < len; ++i) {
      if (accounts[i].id == id) {
        password = accounts[i].password
        break;
      }
    }

    if (password == "") {
      wx.showToast({ title: "错误", icon: "warn" })
      return
    }

    wx.setClipboardData({
      data: password,
      success: function (res) {
        wx.showToast({
          title: "密码: " +password+"已成功复制到剪切板", icon: "success" })
      }
    })

  },
  editAccount: function (e) {
    var id = e.currentTarget.id
    var url = '/pages/new/new?id=' + id
    wx.redirectTo({
      url: url,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  newAccount: function (e) {
    wx.redirectTo({
      url: '/pages/new/new', //重定向
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  deleteAccount: function (e) {
    var that = this
    var id = e.currentTarget.id, accounts = this.data.accounts;

    wx.showModal({
      title: "删除",
      content: "你确定要删除此项么？",
      success: function (res) {
        if (res.confirm) {
          wx.removeStorage({ key: id })
          for (var i = 0, len = accounts.length; i < len; ++i) {
            if (accounts[i].id == id) {
              accounts.splice(i, 1)
              break;
            }
          }
          that.setData({ accounts: accounts })
        }
      }
    })


  },
  onLoad: function () {
    var res = wx.getStorageInfoSync()
    var accounts = []
    for (var i = 0; i < res.keys.length; i++) {
      var id = res.keys[i];
      //console.log("id "+id); 
      var nextCharacter = function (asciiValue, k) {
        var s = asciiValue;
        // 获取给定字母的后面第 k 个字母
        if ((s >= 65 && s <= 90) || (s >= 97 && s <= 122)) {
          if ((s + k >= 65 && s + k <= 90) || (s + k >= 97 && s + k <= 122)) {
            return String.fromCharCode(s + k);
          } else {
            return String.fromCharCode(s + k - 26);
          }
        }
        // 非字母字符不变化
        else {
          return String.fromCharCode(s);
        }
      }

      var caesarCipher = function (stringValue, k) { // k 表示每个字母向右移动 k 位
        var newString = "";
        for (var i = 0; i < stringValue.length; i++) {
          newString += nextCharacter(stringValue[i].charCodeAt(), k);
        }
        return newString;
      }
      //console.log(`Old String: "KhoorZrug! ^-^", Encrypted String: "${caesarCipher("KhoorZrug! ^-^", -3)}"`);//凯撒加密

      if (id == "logs")
        continue 
      var account = wx.getStorageSync(id) //从本地缓存中同步获取指定 key 对应的内容 
      //console.log("account " + account.passwordResult);
      
      var password2 = account.passwordResult;
      var password=[];
      password = caesarCipher(password2,-3);
      console.log("account " + password+" "+password2);
      
      accounts.push({ id: id, descp: account.accountDescp, password: password, open: false })  //解密显示
    }
    this.setData({ accounts: accounts }) //setData 函数用于将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值。
  }
})
