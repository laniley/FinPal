import Table from '../../../../components/Table/Table';
import TableCell from '../../../../components/Table/TableCell/TableCell';
import TableHeaderCell from '../../../../components/Table/TableHeaderCell/TableHeaderCell';
import { selectAssetsSortedByDividendPayDate } from '../../../../store/assets/assets.selectors';
import { useAppSelector, useAppDispatch } from './../../../../hooks'

interface Year {
  year: number,
  sum: number
}

export default function DividendCalendar() {

	const assets = useAppSelector(state => state.assets.assets)
  const filtered_assets = assets.filter((asset) => asset.current_shares > 0 && asset.next_estimated_dividend_per_share > 0 && new Date(asset.payDividendDate) >= new Date())
  const sorted_assets = selectAssetsSortedByDividendPayDate(filtered_assets, 'asc')

  const dividends = useAppSelector(state => state.dividends.dividends)
  const years = [...new Set(dividends.map(dividend => new Date(dividend.date).getFullYear()))]

  const options = { day: '2-digit', month: '2-digit', year: 'numeric' } as Intl.DateTimeFormatOptions;

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
      <h1>Upcoming</h1>
      <Table>
        <thead>
          <tr>
            <TableHeaderCell>#</TableHeaderCell>
            <TableHeaderCell>Pay Date</TableHeaderCell>
            <TableHeaderCell>Ex Date</TableHeaderCell>
            <TableHeaderCell>Asset</TableHeaderCell>
            <TableHeaderCell>Dividend</TableHeaderCell>
          </tr>
        </thead>
        <tbody>
          {sorted_assets.map((asset, i) => {
            return(
              <tr key={i}>
                <TableCell>{i+1}</TableCell>
                <TableCell>{new Date(asset.payDividendDate).toLocaleDateString("de-DE", options)}</TableCell>
                <TableCell>{new Date(asset.exDividendDate).toLocaleDateString("de-DE", options)}</TableCell>
                <TableCell>{asset.name}</TableCell>
                <TableCell>{asset.next_estimated_dividend_per_share ? asset.next_estimated_dividend_per_share * asset.current_shares : 0}</TableCell>
              </tr>
            )
          })} 
        </tbody>
      </Table>
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
              <TableCell additionalClassNames={"text-right"}>{(Math.round(month * 100) / 100).toFixed(2)} €</TableCell>
            </tr>   
          )
        })}
      </tbody>
    </Table>
  )
}