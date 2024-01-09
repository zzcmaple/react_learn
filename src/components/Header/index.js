import { useRef, useEffect, useState } from "react";

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayName () {
    console.log(this.name);
  }
}
class Son extends Person {
  constructor(name, age) {
    super(name, age);
  }
}

const son = new Son('小明', 18);
son.sayName();

const Header = (props) => {
  const refDiv = useRef(null);
  const [ count, setCount ] = useState(0);
  useEffect(() => {
    console.log("我在更新执行", count)
  }, [count])
  const handleClick = () => {
    console.log(refDiv.current)
  }
  return <div ref={refDiv} onClick={handleClick}>
    {props.title}
    <button onClick={() => setCount(count + 1)}>点击</button>
  </div>
}


export default Header;