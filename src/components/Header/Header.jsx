import IconButton from '../IconButton/IconButton';
import Input from '../Input/Input';
const Header = () => {
  return (
    <header className="mx-auto my-0 flex h-[100px] w-full max-w-[1200px] items-center justify-between px-5 ">
      <div className="flex items-center justify-between gap-5 md:w-[400px] lg:w-[400px] ">
        <h1 className="h-[80px] w-[140px]  ">
          <img
            src="../../money-protector/images/mainLogo.png"
            alt="메인로고 이미지"
          />
        </h1>

        <ul className="text-20px flex gap-10 sm:hidden">
          <li>
            <button>가계부</button>
          </li>

          <li>
            <button>캘린더</button>
          </li>

          <li>
            <button>통계</button>
          </li>
        </ul>
      </div>

      <div className="relative w-[300px] sm:hidden md:hidden">
        <Input placeholder="검색어를 입력하세요." />
        <IconButton shape="reading" className="absolute right-0 top-1" />
      </div>

      <div className="flex items-center gap-6">
        <span className="">로그아웃</span>
        <IconButton shape="nav" />
      </div>
    </header>
  );
};

export default Header;
