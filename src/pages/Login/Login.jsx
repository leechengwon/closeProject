import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/Checkbox/Checkbox';
import Input from '../../components/Input/Input';
import IconButton from '../../components/IconButton/IconButton';
import { useState } from 'react';

/** input에 있는 눈모양 아이콘버튼 이미지반전을 위한 useState값을 정의합니다. */
const Login = () => {
  const [eyeToggle, setEyeToggle] = useState(false);

  /** input에 있는 눈모양 아이콘버튼 이미지반전을 위한 토글함수를 정의합니다. */
  const eyeClickToggle = () => {
    setEyeToggle(!eyeToggle);
  };

  return (
    <main className="w-2xl flex min-w-80 max-w-2xl flex-col items-center sm:mb-8 sm:mt-8 md:mb-12 md:mt-12 lg:mb-24 lg:mt-24">
      <h2 className="text-30px sm:text-24px">로그인</h2>

      <form className="mt-14 flex w-full flex-col justify-center sm:w-80 md:w-96 lg:w-9/12">
        <fieldset className="w-full">
          <legend className="text-0px">회원로그인</legend>

          <Input
            label="아이디"
            size="md"
            placeholder="아이디를 입력해주세요."
            name="id"
            type="text"
            errorMsg="아이디를 확인해주세요."
          />

          <div className="relative">
            <Input
              label="비밀번호"
              size="md"
              placeholder="비밀번호를 입력해주세요."
              name="password"
              //패스워드를 보여줄지말지 토글합니다.
              type={eyeToggle === false ? 'password' : 'text'}
              errorMsg="비밀번호를 확인해주세요."
            />
            <IconButton
              //패스워드 이미지를 보여줄지 결정하는 반전 아이콘 버튼입니다.
              shape={eyeToggle === false ? 'eye' : 'eyeSlash'}
              position="absolute right-3 top-8 sm:right-2 sm:top-7"
              onClick={eyeClickToggle}
            />
          </div>

          <div className="mb-6 flex gap-2 sm:w-80 md:w-96 lg:w-9/12">
            <Checkbox label="아이디 저장" />
            <Checkbox label="자동 로그인" />
          </div>

          <Button text="로그인" size="md" type="submit" />
        </fieldset>
      </form>

      <div className="mt-10 flex items-center justify-center sm:w-80 md:w-96 lg:w-9/12">
        <Link className="relative px-5 font-bold text-grayscaleH after:absolute after:right-0 after:top-1 after:h-3 after:w-[1px] after:bg-grayscaleD after:opacity-50 after:content-[''] hover:text-primaryColor sm:text-12px">
          아이디 찾기
        </Link>

        <Link className="px-5 hover:text-primaryColor sm:text-12px">
          비밀번호 찾기
        </Link>
      </div>

      <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:w-80 md:w-96 lg:w-9/12">
        <span className="animate-bounce">아직 지갑지켜 회원이 아니신가요?</span>

        <Button
          text="회원가입 바로가기"
          size="md"
          type="button"
          color="black"
        />
      </div>
    </main>
  );
};

export default Login;
