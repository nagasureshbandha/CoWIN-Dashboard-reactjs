import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGenderDetails} = props

  return (
    <div className="vaccination-by-age-container">
      <h1 className="vaccination-by-age-heading">Vaccination by gender</h1>
      <ResponsiveContainer width={1000} height={400}>
        <PieChart>
          <Pie
            data={vaccinationByGenderDetails}
            cx="50%"
            cy="60%"
            outerRadius="60%"
            dataKey="count"
            startAngle={0}
            endAngle={180}
            innerRadius="30%"
          >
            <Cell name="Male" fill="#f54394" />
            <Cell name="FeMale" fill="#5a8dee" />
            <Cell name="Others" fill="#2cc6c6" />
          </Pie>

          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{fontSize: 12, fontFamily: 'Roboto'}}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByGender
