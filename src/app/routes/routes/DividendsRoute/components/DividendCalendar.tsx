import Table from '../../../../components/Table/Table';
import TableCell from '../../../../components/Table/TableCell/TableCell';
import TableHeaderCell from '../../../../components/Table/TableHeaderCell/TableHeaderCell';
import { useAppSelector } from './../../../../hooks'

export default function DividendCalendar() {

	const dividends = useAppSelector(state => state.dividends)
  const years = [...new Set(dividends.map(dividend => new Date(dividend.date).getFullYear()))]

	return (
		<div id="DividendCalendar">
      <div>
        <div className="flex flex-row">
          {years.map((year, i) => {
            return(
              <DividendsInYear key={i} year={year} dividends={dividends} />
            )
          })}
        </div>
      </div>
    </div>
	);
}

export function DividendsInYear(props:{year:number, dividends:Dividend[]}) {
  
  const dividends_in_year = props.dividends.filter((dividend, i) => new Date(dividend.date).getFullYear() == props.year)

  let sum = 0
  dividends_in_year.forEach(dividend => sum += dividend.income)

  const monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  const months: any[] = []

  for(let month = 0; month < 12; month++) {
    months[month] = 0
  }
  
  for(let month = 0; month < 12; month++) {
    const dividends_in_month = dividends_in_year.filter((dividend, i) => new Date(dividend.date).getMonth() == month)
    dividends_in_month.forEach(dividend => months[month] += dividend.income)
  }

  return(
    <Table>
      <thead>
        <tr>
          <TableHeaderCell>{props.year}</TableHeaderCell>
          <TableHeaderCell>{sum} €</TableHeaderCell>
        </tr>
      </thead>
      <tbody>
        {months.map((month, i) => {
          return(
            <tr key={props.year + '-' + i}>
              <TableCell>{monthNames[i]}</TableCell>
              <TableCell id={props.year + "-" + i} additionalClassNames={"text-right " + (month <= 0 ? "text-slate-500" : "inherit")}>{(Math.round(month * 100) / 100).toFixed(2)} €</TableCell>
            </tr>   
          )
        })}
      </tbody>
    </Table>
  )
}