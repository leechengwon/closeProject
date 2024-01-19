// 원형차트 그래프  지출 차트데이터
export const CHART_INCOME_DATA = {
  tooltip: {
    trigger: 'item',
    formatter: function (params) {
      return `${params.name}: ${params.value.toLocaleString()}원`;
    },
    textStyle: {
      fontFamily: 'Tenada', // 툴팁에 폰트 체를 적용합니다.
      fontSize: 14, // 툴팁에 폰트사이즈를 적용합니다.
      fontWeight: 'bold', // 툴팁에 폰트 굵기를 적용합니다.
    },
  },
  legend: {
    orient: 'horizontal', // 버티컬 호리젠탈 가로세로 변경가능
    top: '0', // 탑 바텀 라이트 레프트 다양
    center: 'center', // 라이트 레프트 센터등 정렬
  },
  series: [
    {
      name: '지출 내역',
      type: 'pie', //차트타입
      radius: '80%', // 차트에 크기
      top: '100',
      data: [
        { value: 1481, name: '월급' },
        { value: 735, name: '부수입' },
        { value: 580, name: '용돈' },
        { value: 484, name: '상여' },
        { value: 300, name: '금융소득' },
        { value: 300, name: '기타' },
      ].map(item => ({
        ...item,
        formattedValue: item.value.toLocaleString(),
      })),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(145, 44, 44, 0.5)',
        },
      },
      //라벨이 emphasis 빠져나오면 계속 보여줄수있다
      label: {
        show: true,
        formatter: function (params) {
          return `${params.name}: ${params.data.formattedValue}원`;
        },
        fontFamily: 'Tenada', // 라벨에 폰트 체를 적용합니다.
        fontSize: 12, // 라벨에 폰트사이즈를 적용합니다.
        fontWeight: 'bold', // 라벨에 폰트 굵기를 적용합니다.
      },
    },
  ],
};
// 원형차트 그래프 지출 차트데이터
export const CHART_EXPENDITURE_DATA = {
  tooltip: {
    trigger: 'item',
    formatter: function (params) {
      return `${params.name}: ${params.value.toLocaleString()}원`;
    },
    textStyle: {
      fontFamily: 'Tenada', // 툴팁에 폰트 체를 적용합니다.
      fontSize: 14, // 툴팁에 폰트사이즈를 적용합니다.
      fontWeight: 'bold', // 툴팁에 폰트 굵기를 적용합니다.
    },
  },
  legend: {
    orient: 'horizontal',
    top: '0',
    center: 'center',
  },
  series: [
    {
      name: '지출 내역',
      type: 'pie',
      radius: '80%',
      top: '100',
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(145, 44, 44, 0.5)',
        },
      },
      //위에
      //라벨이 emphasis 빠져나오면 계속 보여줄수있다
      label: {
        show: true,
        formatter: function (params) {
          return `${params.name}: ${params.data.formattedValue}원`;
        },
        fontFamily: 'Tenada', // 라벨에 폰트 체를 적용합니다.
        fontSize: 12, // 라벨에 폰트사이즈를 적용합니다.
        fontWeight: 'bold', // 라벨에 폰트 굵기를 적용합니다.
      },
    },
  ],
};
// 바 , 그래프 수입 차트데이터
export const CHART_BAR_INCOME_DATA = [
  {
    //마우스 호버스 보여지는 툴팁
    tooltip: {
      trigger: 'axis',
    },

    legend: {
      data: ['저번달', '이번달'],
      top: '0', // 탑 바텀 라이트 레프트 다양
      center: 'center', // 라이트 레프트 센터등 정렬
    },
    toolbox: {
      show: true,
      feature: {
        // dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        // restore: { show: true }, 새로고침을 기능 유무
        // saveAsImage: { show: true }, 그래프를 캡쳐나 저장할수있는 기능 유무
      },
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        data: [
          '1월',
          '2월',
          '3월',
          '4월',
          '5월',
          '6월',
          '7월',
          '8월',
          '9월',
          '10월',
          '11월',
          '12월',
        ],
      },
    ],
    yAxis: [
      {
        type: 'value',
        width: 'auto',
      },
    ],
    series: [
      {
        name: '이번달',
        type: 'bar',
        data: [
          1800020, 1300020, 2800022, 1233020, 1500340, 1870000, 2002022,
          1800020, 1800020, 800020, 3850020, 2400500,
        ],
        //마크업 유무
        // markPoint: {
        //   data: [
        //     { type: 'max', name: 'Max' },
        //     { type: 'min', name: 'Min' },
        //   ],
        // },
        // markLine: {
        //   data: [{ type: 'average', name: 'Avg' }],
        // },
      },
      {
        name: '저번달',
        type: 'bar',
        data: [
          2800020, 300020, 2400022, 1533020, 1100340, 2370000, 3002022, 2400020,
          1556020, 1800020, 3150020, 2200500,
        ],
        //마크업 유무
        // markPoint: {
        //   data: [
        //     { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
        //     { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 },
        //   ],
        // },
        // markLine: {
        //   data: [{ type: 'average', name: 'Avg' }],
        // },
      },
    ],
  },
];
// 바 , 그래프 지출 차트데이터
export const CHART_BAR_EXPENDITURE_DATA = [
  {
    //마우스 호버스 보여지는 툴팁
    tooltip: {
      trigger: 'axis',
    },

    legend: {
      data: ['저번달', '이번달'],
      top: '0', // 탑 바텀 라이트 레프트 다양
      center: 'center', // 라이트 레프트 센터등 정렬
    },
    toolbox: {
      show: true,
      feature: {
        // dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        // restore: { show: true }, 새로고침을 기능 유무
        // saveAsImage: { show: true }, 그래프를 캡쳐나 저장할수있는 기능 유무
      },
    },
    calculable: true,
    xAxis: [
      {
        type: 'category',
        data: [
          '1월',
          '2월',
          '3월',
          '4월',
          '5월',
          '6월',
          '7월',
          '8월',
          '9월',
          '10월',
          '11월',
          '12월',
        ],
      },
    ],
    yAxis: [
      {
        type: 'value',
        width: 'auto',
      },
    ],
    series: [
      {
        name: '이번달',
        type: 'bar',
        data: [
          1800020, 1300020, 2800022, 1233020, 1500340, 1870000, 2002022,
          1800020, 1800020, 800020, 3850020, 2400500,
        ],
        //마크업 유무
        // markPoint: {
        //   data: [
        //     { type: 'max', name: 'Max' },
        //     { type: 'min', name: 'Min' },
        //   ],
        // },
        // markLine: {
        //   data: [{ type: 'average', name: 'Avg' }],
        // },
      },
      {
        name: '저번달',
        type: 'bar',
        data: [
          2800020, 300020, 2400022, 1533020, 1100340, 2370000, 3002022, 2400020,
          1556020, 1800020, 3150020, 2200500,
        ],
        //마크업 유무
        // markPoint: {
        //   data: [
        //     { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
        //     { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 },
        //   ],
        // },
        // markLine: {
        //   data: [{ type: 'average', name: 'Avg' }],
        // },
      },
    ],
  },
];
