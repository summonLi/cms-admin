import SparkMD5 from 'spark-md5'
import request from '@/utils/request'
import dayjs from 'dayjs'
import downloadRequest from '@/utils/wtDownloadRequest'

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}
const wtUtil = {
  isBlank: (str) => {
    return str == null || /^\s*$/.test(str)
  },
  isNotBlank: (str) => {
    return !wtUtil.isBlank(str)
  },
  debounce: (func, delay) => {
    let timer
    return function(...args) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  },
  uuid: () => {
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
  },
  covertByteToString: (limit) => {
    let size = ''
    if (limit < 1 * 1024) {
      size = limit.toFixed(2) + 'B'
    } else if (limit < 1 * 1024 * 1024) {
      //  如果小于0.1MB转化成KB
      size = (limit / 1024).toFixed(2) + 'KB'
    } else if (limit < 1 * 1024 * 1024 * 1024) {
      // 如果小于0.1GB转化成MB
      size = (limit / (1024 * 1024)).toFixed(2) + 'MB'
    } else {
      // 其他转化成GB
      size = (limit / (1024 * 1024 * 1024)).toFixed(2) + 'GB'
    }
    var sizestr = size + ''
    var len = sizestr.indexOf('.')
    var dec = sizestr.substr(len + 1, 2)
    if (dec === '00') {
      //  当小数点后为00时 去掉小数部分
      return sizestr.substring(0, len) + sizestr.substr(len + 3, 2)
    }
    return sizestr
  },
  getFileMd5(file, callback) {
    const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
    const chunkSize = 2097152
    const chunks = Math.ceil(file.size / chunkSize)
    let currentChunk = 0
    const spark = new SparkMD5.ArrayBuffer()
    const fileReader = new FileReader()

    fileReader.onload = function(e) {
      spark.append(e.target.result)
      currentChunk++
      if (currentChunk < chunks) {
        loadNext()
      } else {
        const fileMd5 = spark.end()
        file.md5Code = 'SUCCESS'
        file.md5 = fileMd5
        callback(file)
      }
    }

    fileReader.onerror = function(err) {
      file.md5Code = 'FAIL'
      file.md5Error = err
      callback(file)
    }

    function loadNext() {
      const start = currentChunk * chunkSize
      const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize
      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
    }
    loadNext()
  },
  getFileListMd5(files) {
    const _this = this
    const md5PromiseArray = []
    for (let i = 0; i < files.length; i++) {
      md5PromiseArray.push(new Promise((resolve, reject) => {
        _this.getFileMd5(files[i], (resp) => {
          resolve(resp)
        })
      }))
    }
    return Promise.all(md5PromiseArray)
  },
  toFormData(form) {
    form.formData = {}
    form.formInputsData.forEach((item) => {
      form.formData[item.key] = item.value
    })
    return {
      formData: form.formData,
      pageData: form.pageData
    }
  },
  validateDetailForms(detailForm, ...names) {
    const detailRefs = detailForm.$refs
    if (detailRefs) {
      const allValidator = []
      Object.keys(detailRefs).forEach((key, index) => {
        if (detailRefs[key].$refs) {
          const validateForm = detailRefs[key].$refs['form']
          if (validateForm) {
            const promise = new Promise((resolve, reject) => {
              validateForm.validate((valid) => {
                resolve(valid)
              })
            }).then(result => result)
            allValidator.push(promise)
          }
        }
      })
      return new Promise((resolve, reject) => {
        let result = true
        Promise.all(allValidator).then((data) => {
          if (data && data.length > 0) {
            data.forEach((item) => {
              if (!item) {
                result = false
                return
              }
            })
          }
          resolve(result)
        }).catch(() => {
          result = false
          resolve(result)
        })
      })
    }
  },
  validateDetailFormsAndConfirm(detailForm, text, ...names) {
    console.log(detailForm)
    console.log(text)
    const that = this
    return new Promise((resolve, reject) => {
      that.validateDetailForms(detailForm, names).then((valid) => {
        console.log(valid)
        if (valid) {
          detailForm.$confirm(text, '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'info' }).then(() => {
            resolve()
          }).catch((e) => {
            reject(e)
          })
        }
      })
    })
  },
  postFormData({ url, data, isLoading }) {
    console.log({ url, data, isLoading }, '-------------------')
    return new Promise((resolve, reject) => {
      console.log(data)
      isLoading = true
      request({
        url: url,
        method: 'post',
        data: data
      }).then(response => {
        console.log(response)
        isLoading = false
        resolve(response)
      }).catch(error => {
        isLoading = false
        reject(error)
      })
    })
  },
  /**
   * 从数组中find key相同的item，不存在时返回null
   * @param array
   * @param key
   * @returns {*}
   */
  findByKey(array, key) {
    let result = null
    if (array) {
      array.forEach((item) => {
        if (item.key === key) {
          result = item
        }
      })
    }
    return result
  },
  getDate(value, unit) {
    value = value || 0
    unit = unit || 'day'
    const date = dayjs(new Date(new Date())).add(value, unit)
    return date.toDate()
  },
  downloadFile({ url, fileName, data }) {
    return new Promise((resolve, reject) => {
      downloadRequest({
        url: url,
        method: 'post',
        data: data,
        responseType: 'blob',
        contentType: 'application/json'
      }).then(response => {
        if (response.data.type === 'application/json') {
          reject(new Error('下载失败'))
          return
        }
        const blob = new Blob([response.data])
        if (!fileName) {
          fileName = Date.parse(new Date()) + ''
        }
        if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, fileName)
        } else {
          var link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = fileName
          link.click()
          window.URL.revokeObjectURL(link.href)
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default wtUtil

