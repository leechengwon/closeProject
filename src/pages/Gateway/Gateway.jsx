import React from 'react';
import Button from '../../components/Button/Button';

const Gateway = () => {
  return (
    <section className="flex h-screen w-screen items-center justify-center bg-[#fbf5f0]">
      <div className='absolute inset-0 mt-[100px] aspect-video h-full w-full bg-cover bg-no-repeat sm:bg-[url("../money-protector/images/gateway/gate_main_sm.jpg")] md:bg-[url("../money-protector/images/gateway/gate_main_md.jpg")] lg:bg-[url("../money-protector/images/gateway/gate_main_lg.jpg")] lg:bg-right' />

      <main className="relative flex h-full w-full flex-col items-center">
        <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg bg-opacity-50 ">
          <div className="flex flex-col">
            <h2 className="flex h-full w-full justify-center">
              <img
                src="../money-protector/images/mainLogo.png"
                alt="logo"
                className="aspect-auto h-auto w-3/5"
              />
            </h2>

            <span className="align-center pt-10 text-center sm:text-16px md:text-20px md:text-grayscaleA lg:text-30px">
              당신의 지갑은 안녕하신가요? 👋
            </span>

            <span className="text-gray-800 align-center w-full text-center sm:pt-2 sm:text-14px md:pt-3 md:text-16px md:text-grayscaleA lg:pt-5 lg:text-20px">
              저희 『지갑지켜!』 에서 당신의 지갑을 지켜드립니다.
            </span>
          </div>

          <div className="shadow-drop mt-20 flex w-52 items-center justify-center rounded shadow-grayscaleD hover:shadow-primaryColor">
            <Button className="hover:bg-grayscaleD" size="lg" text="바로가기" />
          </div>
        </div>
      </main>
    </section>
  );
};

export default Gateway;
