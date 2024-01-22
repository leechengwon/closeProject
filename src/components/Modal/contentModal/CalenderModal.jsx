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
  NEW: 'new',
  DETAIL: 'detail',
};

const CalenderModal = ({ selectDate, updateData }) => {
  /**
   * 현재 페이지의 타입을 저장합니다.
   * LIST: 목록 페이지
   * BOX: 추가/수정을 위한 박스 페이지
   */
  const [pageType, setPageType] = useState(PAGE_TYPE.LIST);

  const [clickedExpense, setClickedExpense] = useState({});

  const showExpenseBoxModal = data => {
    setModalType(data ? MODAL_TYPE.DETAIL : MODAL_TYPE.NEW);
    setClickedExpense(data);
    setPageType(PAGE_TYPE.BOX);
  };

  const [modalType, setModalType] = useState(MODAL_TYPE.NEW);

  const [expenseList, setExpenseList] = useState([]);
  
  /**
   * 선택된 날짜에 해당하는 데이터를 가져와서
   * state에 저장합니다.
   */
  const getMoneyDataList = () => {
    getMoneyDataListByDate(
      `${selectDate.year}-${selectDate.month}-${selectDate.day}`,
    ).then(res => {
      setExpenseList(res.data);
    });
  }

  useEffect(() => {
    getMoneyDataList();
  }, []);

  const requestSaveData = data => {
    if (modalType === MODAL_TYPE.NEW) {
      // 새로운 데이터를 업로드합니다.
      postMoneyData(data).then(res => {
        res.status === 200 && alert('저장되었습니다.');
        getMoneyDataList();
      });
    } else {
      // 기존 데이터를 업데이트합니다.
      putMoneyDataById(data.id, data).then(res => {
        res.status === 200 && alert('수정되었습니다.');
        getMoneyDataList();
      });
    }
    updateData();

  };

  const deleteExpenseData = id => {
    deleteMoneyDataById(id).then(data => {
      data.status === 200 && alert('삭제되었습니다.');
      setExpenseList(expenseList.filter(item => item.id !== id));
      updateData();
    });
  };



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
          selectDate={selectDate}
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
