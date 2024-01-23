import React, { useEffect, useState } from 'react';
import ECharts from 'echarts-for-react';
import {
  getAllIncomeByClassification,
  getAllExpenditureByClassification,
} from '../../../../API/TEST_API';

/**
 * Lip Chart의 기본 설정을 저장합니다.
 */

const today = new Date();

const LIP_CHART_CONFIG = {
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
  label: {
    show: true,
    formatter: function (params) {
      return `${params.name}: ${params.data.formattedValue}원`;
    },
    fontFamily: 'Tenada', // 라벨에 폰트 체를 적용합니다.
    fontSize: 12, // 라벨에 폰트사이즈를 적용합니다.
    fontWeight: 'bold', // 라벨에 폰트 굵기를 적용합니다.
  },
};

const { tooltip, legend, label } = LIP_CHART_CONFIG;

const Chart = () => {
  const [incomeChartData, setIncomeChartData] = useState([]);
  const [expenditureChartData, setExpenditureChartData] = useState([]);

  useEffect(() => {
    getAllIncomeByClassification(
      today.getFullYear(),
      today.getMonth() + 1,
    ).then(res => {
      const data = res.data.map(item => ({
        value: item.price,
        name: item.classification,
        formattedValue: item.price.toLocaleString(),
      }));
      setIncomeChartData(data);
    });

    getAllExpenditureByClassification(
      today.getFullYear(),
      today.getMonth() + 1,
    ).then(res => {
      const data = res.data.map(item => ({
        value: item.price,
        name: item.classification,
        formattedValue: item.price.toLocaleString(),
      }));
      setExpenditureChartData(data);
    });
  }, []);

  return (
    <div className="mb-20 w-full">
      <div className="my-14 flex w-full justify-center">
        <h2 className="text-30px">이번 달 수입 내역</h2>
      </div>
      {incomeChartData.length > 0 ? (
        <ECharts
          option={{
            tooltip,
            legend,
            series: [
              {
                name: '소비 내역',
                type: 'pie',
                radius: '80%',
                top: '100',
                data: incomeChartData,
                label: label,
              },
            ],
          }}
          opts={{ width: 'auto', height: 'auto' }}
          className="text-sm md:text-[6px] lg:text-[4px]"
        />
      ) : (
        <div className="flex justify-center text-20px text-grayscaleD">
          <h3>표시할 차트 내용이 없습니다.</h3>
        </div>
      )}

      <div className="my-14 flex w-full justify-center">
        <h2 className="text-30px">이번 달 지출 내역</h2>
      </div>

      {expenditureChartData.length > 0 ? (
        <ECharts
          option={{
            tooltip,
            legend,
            series: [
              {
                name: '지출 내역',
                type: 'pie',
                radius: '80%',
                top: '100',
                data: expenditureChartData,
                label: label,
              },
            ],
          }}
          opts={{ width: 'auto', height: 'auto' }}
        />
      ) : (
        <div className="flex justify-center text-20px text-grayscaleD">
          <h3>표시할 차트 내용이 없습니다.</h3>
        </div>
      )}
    </div>
  );
};

export default Chart;
