const BACS_URl = 'https://test-zs.dscio.com'

function getRes(url, token) {
  return new Promise((resolve,reject) => {
    wx.request({
      url: `${BACS_URl}${url}`,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'Authorization': token
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

function postRes (url, data, token) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BACS_URl}${url}`,
      data,
      method: 'POST',
      header: {
        'content-type': 'application/json',
        'Authorization': token
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

module.exports.getRes = getRes;
module.exports.postRes = postRes;