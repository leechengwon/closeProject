export const CHART_INCOME_DATA = [
  {
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
          { value: 148, name: '월급' },
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
  },
];

export const CHART_EXPENDITURE_DATA = [
  {
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
        data: [
          { value: 1048, name: '식비' },
          { value: 735, name: '교통비' },
          { value: 484, name: '문화생활' },
          { value: 300, name: '마트/편의점' },
          { value: 300, name: '패션/미용' },
          { value: 300, name: '생활용품' },
          { value: 300, name: '주거/통신' },
          { value: 300, name: '건강' },
          { value: 300, name: '교육' },
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
  },
];
