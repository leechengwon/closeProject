import Button from '../../components/Button/Button';
import Checkbox from '../../components/Checkbox/Checkbox';
import Input from '../../components/Input/Input';
import IconButton from '../../components/IconButton/IconButton';
import { Link } from 'react-router-dom';

const Join = () => {
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
              />

              <div className="h-[44px] w-52 sm:h-[35px] sm:w-40 ">
                <Button
                  size="md"
                  text="인증하기"
                  className="h-full"
                  type="button"
                ></Button>
              </div>
            </div>

            <Input
              label="닉네임"
              size="md"
              placeholder="닉네임을 입력해주세요."
              name="nickname"
              type="text"
              errorMsg="닉네임을 확인해주세요."
            />

            <Input
              label="비밀번호"
              size="md"
              placeholder="비밀번호를 입력해주세요."
              name="password"
              errorMsg="비밀번호를 확인해주세요."
            />

            <Input
              label="비밀번호 확인"
              size="md"
              placeholder="비밀번호 확인을 입력해주세요."
              name="verifyPassword"
              errorMsg="비밀번호를 확인해주세요."
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
