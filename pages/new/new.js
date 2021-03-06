// pages/new/new.js

Page({
  data: {
    accountDescp: "iloveyou@163.com",
    passwordId: "",
    passwordLength: 8,
    passwordStrength: [
      { name: "lowerCase", value: "a-z", checked: false },
      { name: "upperCase", value: "A-Z", checked: false },
      { name: "number", value: "0-9", checked: false },
      { name: "symbol", value: "!@#$%", checked: false }
    ],
    passwordCombination: ["lowerCase", "number"],
    passwordResult: "123456",
    passwordResult2: "123456"
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    if (options.hasOwnProperty("id")) {
      var passwordId = options.id
      var account = wx.getStorageSync(passwordId)
      var password2 = account.passwordResult
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
      var password = [];
      password = caesarCipher(password2, -3);

      this.setData({
        passwordId: passwordId,
        accountDescp: account.accountDescp,
        passwordLenght: account.passwordLength,
        passwordCombination: account.passwordCombination,
        passwordResult: password,
        passwordResult2: password2
        
      })
    }
    var passwordStrength = this.data.passwordStrength
    var passwordCombination = this.data.passwordCombination
    for (var i = 0; i < passwordCombination.length; i++) {
      for (var j = 0; j < passwordStrength.length; j++) {
        if (passwordCombination[i] == passwordStrength[j].name) {
          passwordStrength[j].checked = true;
        }
      }
    }

    this.setData({ passwordStrength: passwordStrength })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  checkboxChange: function (e) {
    var passwordCombination = e.detail.value
    this.setData({ passwordCombination: passwordCombination })
  },
  passwordLengthInput: function (e) {
    var length = parseInt(e.detail.value)
    if (isNaN(length)) {
      length = 8
    }
    this.setData({ passwordLength: length })
  },
  accountDescpInput: function (e) {
    var accountDescp = e.detail.value
    this.setData({ accountDescp: accountDescp })
  },
  passwordResultInput: function (e) {
    var passwordResult = e.detail.value
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
    var password2 = [];
    password2 = caesarCipher(passwordResult, 3);

    this.setData({ passwordResult: passwordResult, passwordResult2: password2 })
    //this.setData({ passwordResult: passwordResult })

  },
  copyToClipboard: function () {
    var passwordResult = this.data.passwordResult
    wx.setClipboardData({
      data: passwordResult,
      success: function (res) {
        wx.showToast({ title: "密码已成功复制到剪切板", icon: "success" })
      }
    })
  },
  generatePassword: function () {
    function randPassword(length, specials) {
      var text = []
      for (var i = 0; i < specials.length; i++) {
        switch (specials[i]) {
          case "number":
            text.push('1234567890')
            break;
          case "lowerCase":
            text.push('abcdefghijklmnopqrstuvwxyz')
            break;
          case "upperCase":
            text.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
            break;
          case "symbol":
            text.push('~!@#$%^&*()_+";",./?<>')
            break;
        }
      }

      var rand = function (min, max) { return Math.floor(Math.max(min, Math.random() * (max + 1))); }
      var pw = '';
      for (var i = 0; i < length; ++i) {
        var strpos = rand(0, text.length - 1);
        pw += text[strpos].charAt(rand(0, text[strpos].length));
      }
      return pw;
    }
    var length = this.data.passwordLength
    var specials = this.data.passwordCombination
    var password = randPassword(length, specials)  //生成密码
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
    var password2=[];
    password2 = caesarCipher(password,3);
    
    this.setData({ passwordResult: password, passwordResult2: password2 })
  },
  submit: function () {

    var passwordId = this.data.passwordId
    var accountDescp = this.data.accountDescp
    if(accountDescp == ""){
       return wx.showToast({ title: "账号描述不能为空", icon: "warn" })
    }
    var passwordLength = this.data.passwordLength
    var passwordCombination = this.data.passwordCombination
    var passwordResult = this.data.passwordResult
    var passwordResult2 = this.data.passwordResult2
    if (passwordResult == "") {
      return wx.showToast({ title: "密码不能为空", icon: "warn" })
    }

    if (passwordId == "") {
      var res = wx.getStorageInfoSync()
      for (var i = 0; i < res.keys.length; i++) {
        var id = res.keys[i];
        var account = wx.getStorageSync(id)
        if (accountDescp == account.accountDescp) {
          return wx.showToast({ title: "此账号密码已被管理", icon: "warn" })
        }
      }
      var uuidv1 = require('../../libs/we-uuidv1')
      passwordId = uuidv1()
    }
    

    wx.showModal({
      title: "提交",
      content: "请确定此账号密码：" + passwordResult,
      success: function (res) {
        if (res.confirm) {
          wx.setStorage({  //直接存储了，明文存储了。
            key: passwordId,
            data: {
              passwordId: passwordId,
              accountDescp: accountDescp,
              passwordLength: passwordLength,
              passwordCombination: passwordCombination,
              //passwordResult: passwordResult //存储明文
              passwordResult: passwordResult2 //存储密文
            },
          })
          wx.redirectTo({
            url: '/pages/index/index',
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
        }
      }
    })
  }
})