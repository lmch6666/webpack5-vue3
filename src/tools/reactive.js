let map =  {};

export default function (vm, target) {
  vm.data = target();
  for (const i in vm.data) {
    Object.defineProperty(vm, i,{
      get() {
        map[i] = [vm]
        return vm.data[i];
      },
      set(val) {
        vm.data[i] = val;
        update(i)
      }
    })
  }
}


function update(key){
  let list = map[key];
  list.forEach(item => {
    item.update();
  })
}