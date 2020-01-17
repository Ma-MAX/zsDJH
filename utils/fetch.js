const BACS_URl = 'https://test-zs.dscio.com'
var tokenKey = "token";
// 登录地址, 根据这个地址来设置token
var logInUrl = "/api/auth/login";
/** 
 * @param url:String  require(必需) 请求地址相对路径
 * @param data:Object   可选  请求数据
 */
function getRes(url, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BACS_URl}${url}`,
      data:data,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync(tokenKey)
      },
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

/** 
 * @param url:String  require(必需) 请求地址相对路径
 * @param data:Object   可选  请求数据
 */
function postRes(url, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BACS_URl}${url}`,
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorageSync(tokenKey)
      },
      success: res => {
        if (url === logInUrl) {
          wx.setStorage({
            key: 'token',
            data: res.data.data
          })
        }
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  });
}

// function getRes(url, token) {
//   return new Promise((resolve, reject) => {
//     wx.request({
//       url: `${BACS_URl}${url}`,
//       method: 'GET',
//       header: {
//         'content-type': 'application/json',
//         'Authorization': token
//       },
//       success: res => {
//         resolve(res)
//       },
//       fail: err => {
//         reject(err)
//       }
//     })
//   })
// }

// function postRes(url, data, token) {
//   return new Promise((resolve, reject) => {
//     wx.request({
//       url: `${BACS_URl}${url}`,
//       data,
//       method: 'POST',
//       header: {
//         'content-type': 'application/json',
//         'Authorization': token
//       },
//       success: res => {
//         resolve(res)
//       },
//       fail: err => {
//         reject(err)
//       }
//     })
//   })
// }

module.exports.BACS_URl = BACS_URl;
module.exports.getRes = getRes;
module.exports.postRes = postRes;