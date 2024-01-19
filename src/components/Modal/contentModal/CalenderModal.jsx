import React, { useEffect, useState } from 'react';
import ExpenseListTab from '../ExpenseListTab/ExpenseListTab';
import ExpenseBoxTab from '../ExpenseBoxTab/ExpenseBoxTab';

import {
  postMoneyData,
  putMoneyDataById,
  deleteMoneyDataById,
  getMoneyDataListByDate,
} from '../../../API/TEST_API';

const PAGE_TYPE = {
  LIST: 'list',
  BOX: 'box',
};

const MODAL_TYPE = {
  NEW: {
    title: '수입/지출 입력하기',
  },
  DETAIL: {
    title: '내역 상세보기',
  },
};

const CalenderModal = ({ selectDate }) => {
  const [pageType, setPageType] = useState(PAGE_TYPE.LIST);

  const [clickedExpense, setClickedExpense] = useState({});

  const showExpenseBoxModal = data => {
    setModalType(data ? MODAL_TYPE.DETAIL : MODAL_TYPE.NEW);
    setClickedExpense(data);
    setPageType(PAGE_TYPE.BOX);
  };

  const [modalType, setModalType] = useState(MODAL_TYPE.NEW);

  const requestSaveData = data => {
    if (modalType === MODAL_TYPE.NEW) {
      // 새로운 데이터를 업로드합니다.
      postMoneyData(data).then(data => {
        data.status === 200 && alert('저장되었습니다.');
      });
    } else {
      // 기존 데이터를 업데이트합니다.
      putMoneyDataById(data.id, data).then(data => {
        data.status === 200 && alert('수정되었습니다.');
      });
    }
  };

  const deleteExpenseData = id => {
    deleteMoneyDataById(id);
  };

  const [expenseList, setExpenseList] = useState([]);

  useEffect(() => {
    getMoneyDataListByDate(
      `${selectDate.year}-${selectDate.month}-${selectDate.day}`,
    ).then(res => {
      setExpenseList(res.data);
    });
  }, []);

  return (
    <section className="flex flex-col">
      {pageType === PAGE_TYPE.LIST ? (
        <ExpenseListTab
          selectDate={selectDate}
          expenseList={expenseList}
          showExpenseBoxModal={showExpenseBoxModal}
        />
      ) : (
        <ExpenseBoxTab
          expenseData={clickedExpense}
          saveInputExpenseData={requestSaveData}
          closeTab={() => console.log('closeTab')}
          cancel={() => setPageType(PAGE_TYPE.LIST)}
          removeExpenseData={
            modalType === MODAL_TYPE.NEW
              ? null
              : () => {
                  deleteExpenseData(clickedExpense.id);
                }
          }
        />
      )}
    </section>
  );
};

export default CalenderModal;
