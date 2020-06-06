export default function removeDuplicate(arr ) {
  var newArr = [];
  for(let i of arr ) {
    if(newArr.indexOf(i) === -1) {
      newArr.push(i)
    }
  }
  return newArr
}