

let dsa =new Set();

dsa.add(JSON.stringify({name:"sakskasa",user:"skskaksa"}))
dsa.add(JSON.stringify({name:"sakskasa",user:"skskaksa"}))

dsa.forEach((ele)=>{
    const {name} = JSON.parse(ele);
    console.log(name)
})