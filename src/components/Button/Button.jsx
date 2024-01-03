/**
 * 버튼 컴포넌트 입니다.
 * 1. ln2~13 : 컴포넌트 생성 시 JSDoc 문법을 이용해 주석합니다.
 * 2. ln16~23 : 컴포넌트에 필요한 props를 정의합니다. 구조분해 할당을 위해 { }를 사용합니다.
 * 3. ln27~37 : props를 사용해 컴포넌트를 구성합니다. TailwindCSS를 사용하기 때문에 className을 사용해 스타일을 정의합니다.
 * 3-1. disabled가 true일 경우 버튼에 커서를 올려도 반응하지 않도록 cursor-not-allowed 클래스를 추가합니다.
 * 3-2. disabled가 true일 경우 버튼의 배경색을 grayscaleD로 변경합니다.
 * 3-3. 화면의 크기가 sm까지 줄어들 경우 모든 버튼의 사이즈를 sm 사이즈로 변경합니다.
 * 3-4. SIZE, COLOR 객체를 사용해 props로 전달받은 size, color를 사용해 스타일을 정의합니다. props가 없을 경우 기본값을 사용합니다.
 *
 * @property {string} className - 버튼의 클래스 이름을 정의합니다. 기존의 클래스와는 다른 클래스를 사용할 때 사용합니다.
 * @property {string} type - 버튼의 타입을 정의합니다. 기본값은 button입니다.
 * @property {string} text - 버튼의 텍스트를 정의합니다. 기본값은 button입니다.
 * @property {function} onClick - 버튼의 클릭 이벤트를 정의합니다.
 * @property {boolean} disabled - 버튼의 비활성화 여부를 정의합니다. 기본값은 false입니다.
 * @property {string} color - 버튼의 색상을 정의합니다. primary, secondary, tertiary, white, black, gray를 사용할 수 있습니다.
 * @property {string} size - 버튼의 크기를 정의합니다. sm, md, lg를 사용할 수 있습니다. 기본값은 md입니다.
 * @returns
 */
const Button = ({
  className,
  type = 'button',
  text = 'button',
  onClick,
  disabled = false,
  color,
  size,
  ...props
}) => {
  return (
    <button
      className={`${className} flex w-full items-center justify-center rounded border disabled:cursor-not-allowed disabled:bg-grayscaleD sm:px-4 sm:py-2 sm:text-12px ${
        SIZE[size] || SIZE.md
      } ${COLOR[color] || COLOR.primary}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;

const SIZE = {
  sm: 'py-2 px-4 text-12px',
  md: 'py-3 px-6 text-14px',
  lg: 'py-4 px-8 text-16px',
};

const COLOR = {
  primary: 'bg-primaryColor text-white border-primaryColor',
  secondary: 'bg-secondaryColor text-white border-secondaryColor',
  tertiary: 'bg-tertiaryColor text-white border-tertiaryColor',
  white: 'bg-grayscaleA text-black border-grayscaleH',
  black: 'bg-grayscaleH text-white border-grayscaleH',
  gray: 'bg-grayscaleC text-white border-grayscaleB',
};
