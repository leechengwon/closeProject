/** IconButton 컴포넌트 입니다.
 *
 * className의 경우 props가 없을 경우에는 빈 문자열을 사용합니다.
 * @property {string} className         - 버튼의 클래스 이름을 정의합니다. 기존의 속성이 아닌 다른 속성을 적용시켜야 할 때 사용합니다.
 * @property {string} type              - 버튼의 타입을 정의합니다. 기본값은 button입니다.
 * @property {string} shape             - 버튼의 모양을 정의합니다. kakao, add, nav, back, reading, instagram, facebook, youtube, top ,eye ,eyeSlash 를 사용할 수 있습니다.
 * @property {function} onClick         - 버튼의 클릭 이벤트를 정의합니다.
 * @property {function} onChange        - 버튼의 변경 이벤트를 정의합니다.
 * @property {string} position          - 버튼의 포지션을 정의합니다.
 * @returns
 */
const IconButton = ({
  className,
  position,
  type = 'button',
  shape,
  onClick,
  onChange,
  ...props
}) => {
  return (
    <div
      className={`${position ? position : ''} flex items-center justify-center`}
    >
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
    "h-16 w-16 rounded-full bg-[url('../money-protector/images/IconButton/kakao_button.png')] back-center",
  add: "h-16 w-16 rounded-full bg-secondaryColor bg-[url('../money-protector/svg/IconButton/add_button.svg')] bg-auto back-center",
  nav: "h-8 w-8 rotate-2 bg-[url('../money-protector/images/IconButton/nav_button.png')] back-center",
  back: "h-8 w-8 bg-[url('../money-protector/images/IconButton/back_button.png')] back-center",
  reading:
    "h-8 w-8 bg-[url('../money-protector/svg/IconButton/header_reading_glasses.svg')] back-center",
  instagram:
    "h-8 w-8 bg-[url('../money-protector/svg/IconButton/footer_instagram.svg')] back-center",
  facebook:
    "h-8 w-8 bg-[url('../money-protector/svg/IconButton/footer_facebook.svg')] back-center",
  youtube:
    "h-8 w-8 bg-[url('../money-protector/svg/IconButton/footer_youtube.svg')] back-center",
  top: "h-12 w-12 bg-[url('../money-protector/svg/IconButton/up_arrow_button.svg')] back-center bg-secondaryColor rounded-full",
  close:
    "h-8 w-8 bg-[url('../money-protector/images/IconButton/nav_close_button.png')] back-center",
  eye: "h-8 w-8 bg-[url('../money-protector/svg/IconButton/loginPwEye.svg')] back-center",
  eyeSlash:
    "h-8 w-8 bg-[url('../money-protector/svg/IconButton/loginPwEyeSlash.svg')] back-center",
  left: "h-6 w-6 bg-[url('../money-protector/images/IconButton/cale_left.png')] back-center",
  right:
    "h-6 w-6 bg-[url('../money-protector/images/IconButton/cale_right.png')] back-center",
};
