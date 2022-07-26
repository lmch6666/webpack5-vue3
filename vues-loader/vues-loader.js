let checkoutTemplate = /(?<=(\<template\>))(.*?)(?=(\<\/template\>))/
let checkoutScript = /(?<=\<script\>)(.*?)(?=\<\/script\>)/
let excuteRN = /[\r\n]/g
let replacekuohao = /default \{/
let quchuimport = /import\s+\{.*?\}\s+from\s+'(.*?)'/g
module.exports = function (file) {
  file = file.replace(excuteRN, '')
  file = file.replace(quchuimport, '')
  let template = file.match(checkoutTemplate)[0]
  let script = file.match(checkoutScript)[0]
  script = script.replace(replacekuohao, 'default { template: ' + JSON.stringify(template) + ',')
  console.log(script);
  return script
}