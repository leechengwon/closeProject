import React, { useEffect, useMemo, useState } from 'react';
import ECharts from 'echarts-for-react';
import {
  getAllIncomeByMonth,
  getAllExpenditureByMonth,
} from '../../../../API/TEST_API';
// 화면 크기를 가져와 주는 라이브러리
import { useWindowSize } from '@uidotdev/usehooks';

/**
 * Bar Chart의 기본 설정을 저장합니다.
 */
const BAR_CHART_CONFIG = {
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['수입', '지출'],
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
      data: Array(12)
        .fill()
        .map((_, i) => i + 1 + '월'), // 1월부터 12월까지 배열로 만들어줌
    },
  ],
};

const { tooltip, legend, toolbox, calculable, xAxis } = BAR_CHART_CONFIG;

const BarChart = () => {
  const [incomeChartData, setIncomeChartData] = useState(null);
  const [expenditureChartData, setExpenditureChartData] = useState(null);

  /**
   * 화면 크기를 가져온다.
   * { width, height } 값을 받을 수 있습니다.
   * 여기서는 너비만 필요합니다.
   */
  const { width } = useWindowSize();

  /**
   * 차트의 y축인 yAxis값을 화면 크기에 따라서 변경합니다.
   * 화면의 너비가 768 초과면 전체 금액을 보여줍니다. (예시. 150,000원)
   * 화면의 너비가 768 이하 ~ 480 초과면 만원단위로 금액을 보여줍니다 (예시 15만원, 0.3만원)
   * 화면 너비가 480이하면 y축에 아무것도 보여주지 않습니다.
   */
  const yAxis = useMemo(() => {
    if (width > 768) {
      return {
        show: true,
        type: 'value',
        axisLabel: {
          formatter: function (value) {
            return value.toLocaleString() + '원';
          },
        },
      };
    } else if (width > 480) {
      return {
        show: true,
        type: 'value',
        axisLabel: {
          formatter: function (value) {
            return value / 10000 + '만원';
          },
        },
      };
    } else {
      return {
        show: false,
      };
    }
  }, [width]);

  useEffect(() => {
    getAllIncomeByMonth().then(res => {
      setIncomeChartData(Object.values(res.data));
    });

    getAllExpenditureByMonth().then(res => {
      setExpenditureChartData(Object.values(res.data));
    });
  }, []);

  return (
    <div className="mb-20 w-full">
      <div className="my-14 flex w-full justify-center">
        <h2 className="text-30px">수입내역</h2>
      </div>

      <ECharts
        option={{
          tooltip,
          legend,
          toolbox,
          calculable,
          xAxis,
          yAxis: yAxis,
          series: [
            {
              name: '수입',
              type: 'bar',
              data: incomeChartData,
            },
            {
              name: '지출',
              type: 'bar',
              data: expenditureChartData,
            },
          ],
        }}
        opts={{ width: 'auto', height: 'auto' }}
        className="text-sm md:text-[6px] lg:text-[4px]"
      />
    </div>
  );
};

export default BarChart;
