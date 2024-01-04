/** IconButton 컴포넌트 입니다.
 *
 * className의 경우 props가 없을 경우에는 빈 문자열을 사용합니다.
 * @property {string} className - 버튼의 클래스 이름을 정의합니다. 기존의 속성이 아닌 다른 속성을 적용시켜야 할 때 사용합니다.
 * @property {string} type - 버튼의 타입을 정의합니다. 기본값은 button입니다.
 * @property {string} shape - 버튼의 모양을 정의합니다. kakao, add, nav, back, reading, instagram, facebook, youtube, top를 사용할 수 있습니다.
 * @property {function} onClick - 버튼의 클릭 이벤트를 정의합니다.
 * @property {function} onChange - 버튼의 변경 이벤트를 정의합니다.
 * @returns
 */
const IconButton = ({
  className,
  type = 'button',
  shape,
  onClick,
  onChange,
  ...props
}) => {
  return (
    <div className="flex items-center justify-center">
      <button
        className={`${className ? className : ''} ${SHAPE[shape]} `}
        type={type}
        shape={shape}
        onClick={onClick}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default IconButton;

const SHAPE = {
  kakao:
    "h-16 w-16 rounded-full bg-[url('../money-protector/images/IconButton/kakao_button.png')] bg-center bg-no-repeat",
  add: "h-16 w-16 rounded-full bg-secondaryColor bg-[url('../money-protector/svg/IconButton/add_button.svg')] bg-auto bg-center bg-no-repeat",
  nav: "h-8 w-8 rotate-2 bg-[url('../money-protector/images/IconButton/nav_button.png')] bg-center bg-no-repeat transition-all duration-500 hover:bg-[url('../money-protector/images/IconButton/nav_close_button.png')] hover:bg-center hover:bg-no-repeat",
  back: "h-8 w-8 bg-[url('../money-protector/images/IconButton/back_button.png')] bg-center bg-no-repeat",
  reading:
    "h-8 w-8 bg-[url('../money-protector/svg/IconButton/header_reading_glasses.svg')] bg-center bg-no-repeat",
  instagram:
    "h-8 w-8 bg-[url('../money-protector/svg/IconButton/footer_instagram.svg')] bg-center bg-no-repeat",
  facebook:
    "h-8 w-8 bg-[url('../money-protector/svg/IconButton/footer_facebook.svg')] bg-center bg-no-repeat",
  youtube:
    "h-8 w-8 bg-[url('../money-protector/svg/IconButton/footer_youtube.svg')] bg-center bg-no-repeat",
  top: "h-12 w-12 bg-[url('../money-protector/svg/IconButton/up_arrow_button.svg')] bg-center bg-no-repeat bg-secondaryColor rounded-full",
};
