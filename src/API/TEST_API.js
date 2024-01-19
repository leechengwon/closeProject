/**
 * 테스트용 api 입니다.
 * 1.인자로 status 값을 받습니다.
 * 2.status 인자값이 200 이라면  resolve 를 반환합니다.
 * 3.그외의 값은 reject 로 반환합니다. 예시 => 400 401 402
 * 4.테스트 하고자하는 파일에서 예를들어 testAxios(200)인자로 200을 넣으면
 *   200에관련된 실행은 확인할수있습니다. 200 이외값은 reject에 담겨 반홥됩니다.
 * ---------------------------------------------------------------------
 * 설명
 * Promise 객체는 비동기 작업이 맞이할 미래의 완료 또는 실패와 그 결과 값을 나타냅니다. // 성공에 대한 처리를 합니다.
 * resolve는 성공에 대한 값이고 reject 실패했을때에 대한 값을 반환합니다. // 에러에 대한 처리를 합니다.
 */
export const basic_test = status => {
  const token = 'token:가상의 토큰값을 줍니다.';
  return new Promise((resolve, reject) => {
    if (status === 200) {
      resolve({
        status,
        token,
      });
    } else {
      reject({
        status,
      });
    }
  });
};

/**
 * 가상의 인증번호를 만드는 테스트 axios입니다.
 * 1.Math.random() 랜덤한 숫자를 만들어줍니다. 예시값=>0.6493526741005418
 * 2.랜덤한 숫자는 소수점으로 나오기때문에 내가필요한 자릿수만큼 * 해줍니다. 저는 6자리가 필요하기때문에
 *  1000000을 곱하기해줍니다. 결과값은 =>649352.6741005418 나옵니다.
 * 3.Math.ceil()을 사용하여 소수점을 올림을 해줍니다.  Math.ceil(Math.random() * 1000000) 사용하면 결과값=> 649353 나옵니다.
 * 4.사용된 메서드를  number 변수에 담아줍니다.
 * 5.status인자값이 200 이라면 number,status 반환해줍니다.
 */
export const cert_test = status => {
  const number = Math.ceil(Math.random() * 1000000);
  return new Promise((resolve, reject) => {
    if (status === 200) {
      resolve({
        status: 200,
        number,
      });
    } else {
      reject({
        status: 500,
      });
    }
  });
};

/**
 * 가짜 API 를 위한 가짜 데이터베이스 입니다.
 * 배포를 할 때 서버를 이용할 수 없어서, 임시로 만들어 놓은 데이터 입니다.
 */
const ALL_DATA = [
  {
    id: 1,
    activeTab: '수입',
    incomePrice: 123,
    expenditurePrice: 0,
    date: '2024-01-04',
    hour: 18,
    minute: 44,
    daysOfWeek: '목',
    amPm: '오후',
    classification: '이자',
    classificationSrc: '../money-protector/images/Chip/side.png',
    asset: '은행',
    assetSrc: '../money-protector/images/Chip/bank.png',
    memo: '은행가자~',
  },
  {
    id: 2,
    activeTab: '수입',
    incomePrice: 10000,
    expenditurePrice: 0,
    date: '2024-01-10',
    hour: 18,
    minute: 44,
    daysOfWeek: '수',
    amPm: '오후',
    classification: '금융소득',
    classificationSrc: '../money-protector/images/Chip/finance.png',
    asset: '은행',
    assetSrc: '../money-protector/images/Chip/bank.png',
    memo: '은행가서 입금해요',
  },
  {
    id: 3,
    activeTab: '지출',
    incomePrice: 0,
    expenditurePrice: 1500,
    date: '2024-01-10',
    hour: 18,
    minute: 55,
    daysOfWeek: '수',
    amPm: '오후',
    classification: '식비',
    classificationSrc: '../money-protector/images/Chip/food.png',
    asset: '카드',
    assetSrc: '../money-protector/images/Chip/credit_card.png',
    memo: '핫도그',
  },
  {
    id: 4,
    activeTab: '지출',
    incomePrice: 0,
    expenditurePrice: 20000,
    date: '2024-01-19',
    hour: 18,
    minute: 55,
    daysOfWeek: '금',
    amPm: '오후',
    classification: '식비',
    classificationSrc: '../money-protector/images/Chip/food.png',
    asset: '카드',
    assetSrc: '../money-protector/images/Chip/credit_card.png',
    memo: '카페왔어요',
  },
];

/**
 * 전체 수입/지출 데이터를 가져옵니다.
 * @returns {Promise}
 */
export const getAllMoneyData = () => {
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
      data: ALL_DATA,
    });
  });
};

/**
 * id값으로 수입/지출 데이터의 detail 내용을 가져옵니다.
 * @param {int} id
 * @returns
 */
export const getMoneyDetailDataById = id => {
  const detailData = ALL_DATA.find(item => item.id === id);
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
      data: detailData,
    });
  });
};

/**
 * 수입/지출 데이터를 (가짜 데이터베이스에) 추가합니다.
 * @param {*} data
 * @returns
 */
export const postMoneyData = data => {
  data.id = ALL_DATA.length + 1;
  ALL_DATA.push(data);
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
    });
  });
};

/**
 * 수입 - 지출 을 뺀 금액을 가져옵니다.
 * 데이터에서 incomePrice가 있으면 더하고
 * expenditurePrice가 있으면 빼서
 * 전체 금액을 구합니다.
 */
export const getTotalMoney = () => {
  let totalIncome = 0;
  let totalExpenditure = 0;
  ALL_DATA.forEach(item => {
    if (item.activeTab == '수입' && item.incomePrice)
      totalIncome += Number(item.incomePrice);
    if (item.activeTab == '지출' && item.expenditurePrice)
      totalExpenditure += Number(item.expenditurePrice);
  });
  const totalMoney = totalIncome - totalExpenditure;
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
      data: totalMoney,
    });
  });
};

/**
 * 전체 수입 금액만 구합니다.
 * @returns
 */
export const getIncomeTotalMoney = () => {
  let totalIncome = 0;
  ALL_DATA.forEach(item => {
    if (item.activeTab == '수입' && item.incomePrice)
      totalIncome += Number(item.incomePrice);
  });
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
      data: totalIncome,
    });
  });
};

/**
 * 전체 지출 금액만 구합니다.
 * @returns
 */
export const getExpenditureTotalMoney = () => {
  let totalExpenditure = 0;
  ALL_DATA.forEach(item => {
    if (item.activeTab == '지출' && item.expenditurePrice)
      totalExpenditure += Number(item.expenditurePrice);
  });
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
      data: totalExpenditure,
    });
  });
};

/**
 * id값으로 수입/지출 데이터를 삭제합니다.
 */
export const deleteMoneyDataById = id => {
  const index = ALL_DATA.findIndex(item => item.id === id);
  ALL_DATA.splice(index, 1);
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
    });
  });
};

/**
 * id값으로 수입/지출 데이터를 찾고, 수정합니다.
 */
export const putMoneyDataById = (id, inputData) => {
  const index = ALL_DATA.findIndex(item => item.id === id);
  ALL_DATA[index] = inputData;
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
    });
  });
};

/**
 * 날짜로 내역을 검색합니다.
 * param ex '2024-10-01'
 */
export const getMoneyDataListByDate = dateStr => {
  const allData = ALL_DATA.filter(item => {
    const itemDate = new Date(item.date);
    const date = new Date(dateStr);
    if (
      itemDate.getFullYear() === date.getFullYear() &&
      itemDate.getMonth() === date.getMonth() &&
      itemDate.getDate() === date.getDate()
    ) {
      return item;
    }
  });

  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
      data: allData,
    });
  });
};

/**
 * 모든 classification별 지출을 리턴합니다.
 */
export const getAllExpenditureByClassification = () => {
  const classificationList = [];
  ALL_DATA.forEach(item => {
    if (item.activeTab === '지출') {
      const index = classificationList.findIndex(
        classificationItem =>
          classificationItem.classification === item.classification,
      );
      if (index === -1) {
        classificationList.push({
          classification: item.classification,
          price: item.expenditurePrice,
        });
      } else {
        classificationList[index].price += item.expenditurePrice;
      }
    }
  });
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
      data: classificationList,
    });
  });
};

/**
 * 모든 classification별 수입을 리턴합니다.
 */
export const getAllIncomeByClassification = () => {
  const classificationList = [];
  ALL_DATA.forEach(item => {
    if (item.activeTab === '수입') {
      const index = classificationList.findIndex(
        classificationItem =>
          classificationItem.classification === item.classification,
      );
      if (index === -1) {
        classificationList.push({
          classification: item.classification,
          price: item.incomePrice,
        });
      } else {
        classificationList[index].price += item.incomePrice;
      }
    }
  });
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
      data: classificationList,
    });
  });
};
