import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Data
function createData(country, score) {
  return { country, score };
}

const data = [
  createData('DE', 79),
  createData('UK', 63),
  createData('FR', 76),
  createData('ES', 68),
  createData('NL', 90),
  createData('IT', 55),
  createData('AU', undefined),
];

export default function Chart() {
  return (
    <React.Fragment>
      <Title>Score statistics</Title>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="country" />
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
