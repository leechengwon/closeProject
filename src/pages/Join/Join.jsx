import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { cert_test } from '../../API/TEST_API';

const Join = () => {
  //특수문자 포함했는지 확인하는 정규식 입니다.
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  //영어/숫자가 같이 조합되었는지 확인하는 정규식 입니다.
  const alphanumericRegexA = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/;
  //패스워드 영문 숫자 특수문자 포함 확인하는 정규식입니다.
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$/;

  // 예시
  // !alphanumericRegex.test(userJoinInfo.id)

  /**유저의 가입에 필요한 값들을 useState를 정의합니다.*/
  const [userJoinInfo, setUserJoinInfo] = useState({
    email: '',
    CertificationNum: null,
    CertificationCheck: false,
    id: '',
    password: '',
    verifyPassword: '',
  });

  /**아이디 에러케이스를 저장하는 useState를 정의합니다.*/
  const [errorCase, setErrorCase] = useState('');

  /**
   * 이메일에 보낸 인증번호를 저장하는 useState를 정의합니다.
   * 서버에서 보내주었다 가정하고 테스트를 하기위해 서버에서 보내준 인증번호와 같은지 비교하기위해
   * testCertificationNum(서버에서보내는 인증번호라고 가정한다.) 값에 정의합니다.
   */
  const [testCertificationNum, setTestCertificationNum] = useState(null);

  const certificationCheckBtn = () => {
    if (Number(userJoinInfo.CertificationNum) === testCertificationNum) {
      setUserJoinInfo({ ...userJoinInfo, CertificationCheck: true });
      alert('성공');
    } else {
      alert('인증번호가 틀립니다.');
    }
  };

  /**
   * 1.onChange 이벤트가 발생할때마다 실행되는 함수입니다.
   * 2.input onChange event를 인자로 받습니다.
   * 3.name , value 구조분해 할당을 합니다.
   * 4.setUserJoinInfo( userJoinInfo 값을 스프레드 오퍼레이터(연산자)로 복사하여)
   * 이벤트에 발생한 input name과 일치하는 키에 input에서 발생한 이벤트에 value 값을
   * setUserJoinInfo() 실행시켜 값을 변경해줍니다.
   */
  const saveUserJoinInfo = event => {
    const { name, value } = event.target;
    setUserJoinInfo({ ...userJoinInfo, [name]: value });
  };

  /** 테스트 통신 axios request를 정의합니다.
 
   */
  const CertificationNumRequest = () => {
    if (!userJoinInfo.email.length) {
      alert('이메일을 입력해주세요.');
    } else {
      setTestCertificationNum(res.number);
      cert_test(200) //프로미스를 활용한  api입니다. 인자로 원하는 상태값을 넘겨주면됩니다.
        .then(res => {
          setTestCertificationNum(res.number);
          //인증을 하고 인증번호발송 버튼을 또누르게되면 인증번호 체크유무를 유(true)에서 무(false)로 만들기 위해 추가한 로직입니다.
          setUserJoinInfo({ ...userJoinInfo, CertificationCheck: false });
        })
        .catch(error => {
          setErrorCase(error);
        });
    }
  };

  /** 실제 통신 axios request를 정의합니다.*/
  // const requestJoinPost = async () => {
  //   const params = userJoinInfo;
  //   try {
  //     const request = await customAxios.post(API.JOIN, param);
  //     if (res) {
  //     } else {
  //     }
  //   } catch (error) {}
  // };
  return (
    <main className="w-2xl flex min-w-80 max-w-2xl flex-col items-center sm:mb-8 sm:mt-8 md:mb-24 md:mt-12 lg:mb-24 lg:mt-24">
      <h2 className="text-30px sm:text-24px">회원가입</h2>

      <section className="flex w-full flex-col justify-center sm:w-80 md:w-96 lg:w-9/12">
        <form className="mt-14">
          <fieldset>
            <legend className="text-0px">회원가입</legend>

            <div className="flex items-center gap-1">
              <Input
                label="이메일"
                size="md"
                placeholder="이메일을 입력해주세요."
                name="email"
                type="email"
                errorMsg="이메일형식을 확인해주세요."
                onChange={saveUserJoinInfo}
                status={errorCase.status === 401 ? 'false' : true}
              />

              <div className="h-[44px] w-52 sm:h-[35px] sm:w-40 ">
                <Button
                  size="md"
                  text="인증번호발송"
                  className="h-full"
                  type="button"
                  onClick={CertificationNumRequest}
                ></Button>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Input
                label="인증번호"
                size="md"
                placeholder="인증번호을 입력해주세요."
                name="CertificationNum"
                type="Number"
                status={errorCase.status === 402 ? 'false' : true}
                errorMsg="인증번호를 확인해주세요."
                onChange={saveUserJoinInfo}
              />

              <div className="h-[44px] w-52 sm:h-[35px] sm:w-40 ">
                <Button
                  size="md"
                  text="인증확인"
                  className="h-full"
                  type="button"
                  onClick={certificationCheckBtn}
                ></Button>
              </div>
            </div>

            <Input
              label="아이디"
              size="md"
              placeholder="아이디를 입력해주세요."
              name="id"
              type="text"
              status={errorCase.status === 403 ? 'false' : true}
              errorMsg="아이디를 확인해주세요."
              onChange={saveUserJoinInfo}
            />

            <Input
              label="비밀번호"
              size="md"
              placeholder="비밀번호를 입력해주세요."
              name="password"
              status={errorCase.status === 404 ? 'false' : true}
              errorMsg="비밀번호를 확인해주세요."
              onChange={saveUserJoinInfo}
            />

            <Input
              label="비밀번호 확인"
              size="md"
              placeholder="비밀번호 확인을 입력해주세요."
              name="verifyPassword"
              status={errorCase.status === 404 ? 'false' : true}
              errorMsg="비밀번호를 확인해주세요."
              onChange={saveUserJoinInfo}
            />

            <Button text="가입하기" size="md" type="submit" className="mt-6" />
          </fieldset>
        </form>
      </section>

      <Link
        to="/login"
        className="mt-16 animate-bounce text-grayscaleD hover:text-grayscaleH"
      >
        지갑지켜 계정이 있으신가요?
      </Link>
    </main>
  );
};

export default Join;
