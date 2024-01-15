import { use } from 'echarts';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Join = () => {
  /**유저의 가입에 필요한 값들을 useState를 정의합니다.*/
  const [userJoinInfo, setUserJoinInfo] = useState({
    email: '',
    CertificationNum: '',
    id: '',
    password: '',
    verifyPassword: '',
  });
  console.log(userJoinInfo);

  /**아이디 에러케이스를 저장하는 useState를 정의합니다.*/
  const [errorCase, setErrorCase] = useState('');

  /**
   * 1.onChange 이벤트가 발생할때마다 실행되는 함수입니다.
   * 2.input onChange event를 인자로 받습니다.
   * 3.name , value 구조분해 할당을 합니다.
   * 4.setUserLoginInfo( userLoginInfo 값을 스프레드 오퍼레이터(연산자)로 복사하여)
   * 이벤트에 발생한 input name과 일치하는 키에 input에서 발생한 이벤트에 value 값을
   * setUserLoginInfo() 실행시켜 값을 변경해줍니다.
   */
  const saveUserJoinInfo = event => {
    const { name, value } = event.target;
    setUserJoinInfo({ ...userJoinInfo, [name]: value });
  };

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
              />

              <div className="h-[44px] w-52 sm:h-[35px] sm:w-40 ">
                <Button
                  size="md"
                  text="인증번호발송"
                  className="h-full"
                  type="button"
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
                errorMsg="인증번호를 확인해주세요."
                onChange={saveUserJoinInfo}
              />

              <div className="h-[44px] w-52 sm:h-[35px] sm:w-40 ">
                <Button
                  size="md"
                  text="인증확인"
                  className="h-full"
                  type="button"
                ></Button>
              </div>
            </div>

            <Input
              label="아이디"
              size="md"
              placeholder="아이디를 입력해주세요."
              name="id"
              type="text"
              errorMsg="아이디를 확인해주세요."
              onChange={saveUserJoinInfo}
            />

            <Input
              label="비밀번호"
              size="md"
              placeholder="비밀번호를 입력해주세요."
              name="password"
              errorMsg="비밀번호를 확인해주세요."
              onChange={saveUserJoinInfo}
            />

            <Input
              label="비밀번호 확인"
              size="md"
              placeholder="비밀번호 확인을 입력해주세요."
              name="verifyPassword"
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
