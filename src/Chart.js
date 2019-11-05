import React from 'react';
import { BarChart, Tooltip, Bar, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Data
function createData(dataMap, type) {
  const data = []
  for (var [key, value] of dataMap) {
    data.push({[type]: key, score: value.average});
  }
  return data;
}



export default function Chart({type, dataMap}) {
  const dataProcessed = createData(dataMap, type);
  return (
    <React.Fragment>
      <Title>Score statistics</Title>
      <ResponsiveContainer>
        <BarChart
          data={dataProcessed}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
          <XAxis dataKey={type} />
          <YAxis>
            <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
              Average score
            </Label>
          </YAxis>
          <Bar type="monotone" dataKey="score" fill="#556CD6" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
