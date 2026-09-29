import type { EChartsOption } from 'echarts'
import type { DashboardSource } from './dashboard'

export function createTrendChartOptions(
  labels: string[],
  values: number[],
  legend: string,
): EChartsOption {
  return {
    animationDuration: 500,
    grid: { top: 30, right: 18, bottom: 18, left: 8, containLabel: true },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#172033',
      borderWidth: 0,
      padding: [8, 12],
      textStyle: { color: '#ffffff', fontSize: 12 },
      axisPointer: { type: 'line', lineStyle: { color: '#94a3b8', type: 'dashed' } },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: labels,
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisTick: { show: false },
      axisLabel: { color: '#94a3b8', fontSize: 11, margin: 12 },
    },
    yAxis: {
      type: 'value',
      splitNumber: 4,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#94a3b8', fontSize: 11 },
      splitLine: { lineStyle: { color: '#eef2f7', type: 'dashed' } },
    },
    series: [
      {
        name: legend,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        showSymbol: false,
        data: values,
        lineStyle: { width: 3, color: '#2563eb' },
        itemStyle: { color: '#2563eb', borderColor: '#ffffff', borderWidth: 2 },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(37, 99, 235, 0.28)' },
              { offset: 1, color: 'rgba(37, 99, 235, 0.01)' },
            ],
          },
        },
        emphasis: { focus: 'series', scale: true },
      },
    ],
  }
}

export function createSourceChartOptions(sources: DashboardSource[]): EChartsOption {
  return {
    animationDuration: 500,
    tooltip: { show: false },
    series: [
      {
        type: 'pie',
        radius: ['70%', '91%'],
        center: ['50%', '50%'],
        silent: true,
        label: { show: false },
        itemStyle: { borderColor: '#ffffff', borderWidth: 3, borderRadius: 4 },
        data: sources.map((item) => ({
          value: item.value,
          name: item.name,
          itemStyle: { color: item.color },
        })),
      },
    ],
  }
}
