import React, { useState } from 'react';
import Portal from '../Portal/Portal';
import Modal from './Modal';
import TestModalComponent from './TestModalComponent';

const TestModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="flex h-screen w-full items-center justify-center ">
      <button onClick={handleModalToggle} className=" h-16 w-16">
        Modal Open
      </button>
      <Portal>
        <Modal
          title="테스트"
          content={<TestModalComponent />}
          size="lg"
          isCloseBtn={true}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </Portal>
    </div>
  );
};

export default TestModal;
