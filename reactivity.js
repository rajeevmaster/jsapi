// let price = 5;
// let quantity = 2;
// let total = 0;
// let target = null;
// let storage = [];

// target = () => {
//   total = price * quantity;
// };

// first solution
// function record(){storage.push(target)}
// function replay(){storage.forEach(fn=>fn())}
// record()
// target()

//2nd solution
// class Dep {
//   constructor() {
//     this.subscribers = [];
//   }
//   depend() {
//     if (target && !this.subscribers.includes(target)) {
//       this.subscribers.push(target);
//     }
//   }
//   notify() {
//     this.subscribers.forEach(sub => sub());
//   }
// }

// const dep = new Dep();

// dep.depend();
// target();

// function watecher(myfunc) {
//   target = myfunc;
//   dep.depend();
//   target();
//   target = null;
// }

// watecher(() => (total = price * quantity));

//final approach
let data = { price: 5, quantity: 2 };
let target, total, salePrice;
class Dep {
  constructor() {
    this.subscribers = [];
  }
  depend() {
    if (target && !this.subscribers.includes(target)) {
      this.subscribers.push(target);
    }
  }
  notify() {
    this.subscribers.forEach(sub => sub());
  }
}

Object.keys(data).forEach(key=>{
    let interValue=data[key]
    const dep= new Dep()
    Object.defineProperty(data,key,{
        get(){
            dep.depend()
            return interValue
        }
        set(newVal){
            interValue=newVal
            dep.notify()
        }
    })
})

function watcher(myFunc){
    target=myFunc
    target()
    target=null
}

watcher(()=>{total=data.price*data.quantity})
watcher(()=>{salePrice=data.price*0.9})