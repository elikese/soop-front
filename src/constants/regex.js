
export const REGEX = {
  username: {
      regexr: /^[A-Za-z0-9]{5,10}$/,
      text: "영문자, 숫자 5 ~ 10자리 형식이어야 합니다"
  },
  // 한글, 영문자, 숫자, 특수문자 중 2에서 8글자로 이루어진 문자열
  nickname: {
      regexr: /^(?=.*[가-힣a-zA-Z])[가-힣a-zA-Z!@#$%^&*()?_0-9]{2,6}$/,
      text: "최소한 한 글자 이상의 한글, 영문자가 반드시 포함되고 2에서 6자리 형식이어야 합니다"
  },
  password: {
      regexr: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,128}$/,
      text: "하나의 영문자, 숫자, 특수문자를 포함한 5 ~ 128자리 형식이어야 합니다"
  },
  name: {
      regexr: /^[가-힇]{2,}$/,
      text: "한글문자 형식이어야 합니다"
  },
  email: {
      regexr: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
      text: "이메일 형식이어야 합니다"
  },
  newPassword: {
    regexr: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,128}$/,
    text: "하나의 영문자, 숫자, 특수문자를 포함한 8 ~ 128자리 형식이어야 합니다"
  },
  oldPassword: {
    regexr: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,128}$/,
    text: "하나의 영문자, 숫자, 특수문자를 포함한 8 ~ 128자리 형식이어야 합니다"
  },
  quilContent: {
    regexr:/^(<p><br><\/p>)+$|^<p><br><\/p>(?!<p><br><\/p>).+<p><br><\/p>$/,
    text: "글 내용을 입력하세요"
  }

};
