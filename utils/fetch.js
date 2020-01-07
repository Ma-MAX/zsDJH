const BACS_URl = 'http://122.51.181.152:8765'

export default fetch = (url, data, method="GET") => {
  return new Promise((resolve,reject) => {
    wx.request({
      url: `${BACS_URl}${url}`,
      data,     
      method,
      header: {
        'content-type': 'application/json',
        'Authorization': wx.getStorage('token')
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