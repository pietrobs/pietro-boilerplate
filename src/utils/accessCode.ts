// 6 digitos
function generateAccessCode(digits = 6) {
  let code = "";

  for (let i = 0; i < digits; i += 1) {
    code += `${Math.random().toString().substring(2, 3)}`;
  }

  return code;
}

export default generateAccessCode;
