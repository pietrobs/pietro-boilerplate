// 6 digitos
function accessCode () {
  return Math.random().toString().substring(2, 3) + Math.random().toString().substring(2, 3) +
           Math.random().toString().substring(2, 3) + Math.random().toString().substring(2, 3) +
           Math.random().toString().substring(2, 3) + Math.random().toString().substring(2, 3)
}

export default accessCode
