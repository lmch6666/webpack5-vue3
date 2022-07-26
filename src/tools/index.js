// @ts-nocheck
import reactive from './reactive.js'
let vm;
export function createApp(component) {
  let { template, data, methods } = component
  vm = {};
  vm.template = template;
  vm.methods = methods;
  reactive(vm, data)
  vm.methods = methods;
  vm.update = function () {
    let str = parsetemplate(vm, template)
    mountElement(vm, vm.el, str)
  }
  vm.mount = (el) => {
    vm.el = el
    mountElement(vm, el, template)
  }
  return vm;
}

function mountElement(vm, el, template) {
  let ele = document.querySelector(el)
  ele.innerHTML = parsetemplate(vm, template)
  parseMethods(vm, ele)
}
function parsetemplate(vm, template) {
  let reg = /\{\{(.*?)\}\}/g
  template = template.replace(reg, (item) => {
    let str = item.replace(/\{\{|\}\}/g, '')
      .trim()
      .replace(/\w+/g, (item) => {
        if (vm[item]) {
          return vm[item]
        } else {
          return item
        }
      })
    let value = eval(str)
    return value
  })
  return template
}

function parseMethods(vm, ele) {
  let children = ele.children[0].children
  let methods = vm.methods
  Array.from(children).forEach((item) => {
    let value = item.getAttribute('@click')
    if (value) {
      item.addEventListener('click', methods[value].bind(vm))
    }
  })
}