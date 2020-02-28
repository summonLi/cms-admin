import wtUtil from '@/utils/wtUtil'
import { Message } from 'element-ui'

const wtValidator = {
  ValidatorNotBlank: (rule, value, callback) => {
    if (wtUtil.isBlank(value)) {
      callback(new Error(''))
    } else {
      callback()
    }
  },
  ValidatorWtUpload: (rule, value, callback) => {
    if (!value || value.length <= 0) {
      const text = rule.name ? `请上传${rule.name}` : '请上传文件'
      return callback(new Error(text))
    }
    if (rule && value.length > rule.limit) {
      return callback(new Error(`最多上传${rule.limit}个文件`))
    }
    return callback()
  },
  ValidatorWtEditor: (rule, value, callback) => {
    if (wtUtil.isBlank(value)) {
      callback(new Error(''))
    } else {
      callback()
    }
  },
  ValidatorEmail: (rule, value, callback) => {
    const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    if (value) {
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    // if (!value) {
    //   return callback(new Error('邮箱不能为空'))
    // }
  },
  /* 验证手机号 */
  ValidatorPhone: (rule, value, callback) => {
    const phoneReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/ /* 手机格式 */
    const isMob = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/ /* 座机格式 */
    if (value) {
      if (phoneReg.test(value) || isMob.test(value)) {
        callback()
      } else {
        callback(new Error('电话号码格式不正确'))
      }
    }
  },
  /* 验证只能填数字 */
  ValidatorNum: (rule, value, callback) => {
    const numReg = /^[0-9]*[0-9][0-9]*$/
    if (numReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入数值'))
    }
  },
  /* 验证只可输入大小写字母和数字 */
  ValidatorAaZz: (rule, value, callback) => {
    if (value) {
      const AaZzReg = /^[A-Za-z0-9]+$/
      if (AaZzReg.test(value)) {
        callback()
      } else {
        callback(new Error('只可输入大小写字母和数字'))
      }
    }
  },
  /* 验证价格 */
  ValidatorPrice: (rule, value, callback) => {
    const priceReg = /(^[\d]|^[1-9][\d]*)($|[\.][\d]{0,2}$)/
    if (priceReg.test(value)) {
      callback()
    } else {
      callback(new Error('请填写正确的金额,保留两位小数'))
    }
  },
  /* 验证小数 */
  ValidatorPricebfs: (rule, value, callback) => {
    const priceReg = /(^[\d]|^[1-9][\d]*)($|[\.][\d]{0,6}$)/
    if (priceReg.test(value)) {
      callback()
    } else {
      callback(new Error('请按要求填写'))
    }
  },
  /* 验证邮编 */
  ValidatorPostcode: (rule, value, callback) => {
    if (value) {
      const postcode = /^[1-9][0-9]{5}$/
      if (postcode.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的邮编'))
      }
    }
  },
  /* 验证传真 */
  ValidatorFax: (rule, value, callback) => {
    if (value) {
      const checkFax = /^(\d{3,4}-)?\d{7,8}$/
      if (checkFax.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的传真格式'))
      }
    }
  },
  /* 验证QQ/^([1-9]{1})(\d{15}|\d{18})$/ */
  ValidatorQQ: (rule, value, callback) => {
    if (value) {
      const checkQQ = /^[1-9][0-9]{4,14}$/
      if (checkQQ.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的QQ'))
      }
    }
  },
  /* 验证银行卡 */
  ValidatorBank: (rule, value, callback) => {
    if (value) {
      const checkBank = /^([1-9]{1})(\d{15}|\d{18})$/
      if (checkBank.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的16-19位银行号'))
      }
    }
  },
  /* 保留两位小数，0不足，补 */
  VelifyKeepTwoDecimalFull: (value) => {
    let result = parseFloat(value)
    if (isNaN(result)) {
      Message({
        message: '传递参数错误，请检查！',
        type: 'error',
        duration: 1000
      })
      return false
    }
    result = Math.round(value * 100) / 100
    let s_x = result.toString()
    let pos_decimal = s_x.indexOf('.')
    if (pos_decimal < 0) {
      pos_decimal = s_x.length
      s_x += '.'
    }
    while (s_x.length <= pos_decimal + 2) {
      s_x += '0'
    }
    return s_x
  }
}

export default wtValidator
