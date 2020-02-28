'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://shop.miare-china.com/dh"',
  BASE_API:'"http://c.lwhale.cn:82"'
})
