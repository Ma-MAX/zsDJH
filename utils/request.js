var app = getApp();

var serviceUrl = [
  'http://122.51.181.152:8765',
];

var host = serviceUrl[0];

/**
 * POST请求，
 * URL：接口
 * postData：参数，json类型
 * doSuccess：成功的回调函数
 * doFail：失败的回调函数
 */
function request(url, postData, doSuccess, doFail) {
  wx.request({
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8"
    },
    data: postData,
    method: 'POST',
    success: function(res) {
      if (res.code == '200') {
        doSuccess(res.data);
      } else {
        wx.showModal({
          title: '错误',
          content: res.message || '请求失败',
          showCancel:false,
          confirmText: "确定",
          success: function (res) {
            console.log(res);
            if (res.confirm) {
              console.log('错误');
            }
          }
        });
      }
    },
    fail: function() {
      doFail();
    },
  })
}

//GET请求
function getData(url, doSuccess, doFail) {
  wx.request({
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8"
    },
    method: 'GET',
    success: function(res) {
      doSuccess(res.data);
    },
    fail: function() {
      doFail();
    },
  })
}

module.exports.request = request;
module.exports.getData = getData;