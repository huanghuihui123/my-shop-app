import {
  UPLOAD_URL
} from "@/common/config.js"

export function chooseImageAndUpload(num) {
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count: num || 9,
      sourceType: ['album', 'camera'],
      success: res => {
        console.log('chooseImage', res)
        const tempFilePaths = res.tempFilePaths;
        let fileArr = []
        for (let i = 0; i < tempFilePaths.length; i++) {
          uni.getImageInfo({
            src: res.tempFilePaths[i],
            success: image => {
              console.log(image)
              uni.showLoading({
                title: '图片上传中',
                mask: true
              })
              const token = uni.getStorageSync('token')
              uni.uploadFile({
                url: UPLOAD_URL,
                file: image, // 要上传的文件对象, 仅h5支持
                filePath: image.path, // 要上传文件资源的路径
                header: {
                  Authorization: token
                },
                name: 'files',
                success: res => {
                  // 登录状态已失效
                  const result = JSON.parse(res.data)
                  if (result.code === 200) {
                    fileArr.push(result.data)
                    if (fileArr.length === tempFilePaths.length) {
                      resolve(fileArr)
                    }
                  } else if (result.code === 401) {
                    uni.showToast({
                      title: result.msg,
                      icon: 'none',
                      duration: 2000,
                    })
                    uni.navigateTo({
                      url: '/pages/login/index'
                    })
                  } else {
                    uni.showToast({
                      title: '上传图片失败',
                      icon: 'none',
                      duration: 2000,
                    })
                  }
                },
                fail: err => {
                  uni.showToast({
                    title: '上传图片失败',
                    icon: 'none',
                    duration: 2000,
                  })
                },
                complete: res => {
                  console.log('complete', res)
                  uni.hideLoading()
                },
              })
            },
            fail: err => {
              uni.showToast({
                title: '获取图片信息失败',
                icon: 'none',
                duration: 2000,
              })
            },
          })
        }
      }
    })
  })
}

export function chooseVideoAndUpload() {
  return new Promise((resolve, reject) => {
    uni.chooseVideo({
      sourceType: ['album', 'camera'],
      success: res => {
        console.log('chooseVideo', res)
        const tempFilePaths = res.tempFilePath;
        uni.getVideoInfo({
          src: tempFilePaths,
          success: video => {
            console.log(video)
            uni.showLoading({
              title: '视频上传中',
              mask: true
            })
            if (video.size > (1024 * 1024 * 50)) {
              uni.showLoading({
                title: '视频大小最多50M',
              })
              return
            }
            const token = uni.getStorageSync('token')
            uni.uploadFile({
              url: UPLOAD_URL,
              file: tempFilePaths, // 要上传的文件对象, 仅h5支持
              filePath: tempFilePaths, // 要上传文件资源的路径
              header: {
                Authorization: token
              },
              name: 'files',
              success: res => {
                const result = JSON.parse(res.data)
                if (result.code === 200) {
                  uni.showToast({
                    title: '上传成功',
                    icon: 'none',
                    duration: 1000,
                  })
                  resolve(result.data)
                } else if (result.code === 401) {
                  // 登录状态已失效
                  uni.showToast({
                    title: result.msg,
                    icon: 'none',
                    duration: 2000,
                  })
                  uni.navigateTo({
                    url: '/pages/login/index'
                  })
                } else {
                  uni.showToast({
                    title: '上传视频失败',
                    icon: 'none',
                    duration: 2000,
                  })
                }
              },
              fail: err => {
                uni.showToast({
                  title: '上传图片失败',
                  icon: 'none',
                  duration: 2000,
                })
              },
              complete: res => {
                console.log('complete', res)
                uni.hideLoading()
              },
            })
          },
          fail: err => {
            uni.showToast({
              title: '获取视频信息失败',
              icon: 'none',
              duration: 2000,
            })
          },
          complete: () => {
            uni.hideLoading()
          }
        })
        // }
      }
    })
  })
}
