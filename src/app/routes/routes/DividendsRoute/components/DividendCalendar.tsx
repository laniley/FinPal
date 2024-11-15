import TableCell from '../../../../components/TableCell/TableCell';
import TableHeaderCell from '../../../../components/TableHeaderCell/TableHeaderCell';
import { selectAssetsSortedByDividendPayDate } from '../../../../store/assets/assets.selectors';
import { useAppSelector, useAppDispatch } from './../../../../hooks'

interface Year {
  year: number,
  sum: number
}

export default function DividendList() {

	const assets = useAppSelector(state => state.assets.assets)
  const filtered_assets = assets.filter((asset) => asset.current_shares > 0 && asset.next_estimated_dividend_per_share > 0 && new Date(asset.payDividendDate) >= new Date())
  const sorted_assets = selectAssetsSortedByDividendPayDate(filtered_assets, 'asc')

  const dividends = useAppSelector(state => state.dividends.dividends)
  const years = [...new Set(dividends.map(dividend => new Date(dividend.date).getFullYear()))]

	return (
		<div id="DividendCalendar">
      <div>
        <div>Per Year</div>
        <table>
          <tbody>
            {years.map((year, i) => {
              const dividends_in_year = dividends.filter((dividend, i) => new Date(dividend.date).getFullYear() == year)
              let sum = 0
              dividends_in_year.forEach(dividend => sum += dividend.income)
              return(
                <tr key={i}>
                  <TableCell>{year}</TableCell>
                  <TableCell additionalClassNames={"text-right"}>{sum} €</TableCell>
                </tr>
              )
            })} 
          </tbody>
        </table>
      </div>
      <div>
        <div>Per Month</div>
        <table>
          <tbody>
            {years.map((year, i) => {
              return(
                <DividendsInYear year={year} dividends={dividends} />
              )
            })}
          </tbody>
        </table>
      </div>
      <h1>Upcoming</h1>
      <table>
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
                <TableCell>{new Date(asset.payDividendDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(asset.exDividendDate).toLocaleDateString()}</TableCell>
                <TableCell>{asset.name}</TableCell>
                <TableCell>{asset.next_estimated_dividend_per_share ? asset.next_estimated_dividend_per_share * asset.current_shares : 0}</TableCell>
              </tr>
            )
          })} 
        </tbody>
      </table>
    </div>
	);
}

export function DividendsInYear(props:{year:number, dividends:Dividend[]}) {
  
  const dividends_in_year = props.dividends.filter((dividend, i) => new Date(dividend.date).getFullYear() == props.year)

  const months: any[] = []

  for(let month = 1; month <= 12; month++) {
    months[month] = 0
  }
  
  for(let month = 1; month <= 12; month++) {
    const dividends_in_month = dividends_in_year.filter((dividend, i) => new Date(dividend.date).getMonth() == month)
    dividends_in_month.forEach(dividend => months[month] += dividend.income)
  }

  return(
    months.map((month, i) => {
      return(
        <tr key={props.year + '-' + i}>
          <TableCell>{props.year}</TableCell>
          <TableCell>{i}</TableCell>
          <TableCell additionalClassNames={"text-right"}>{month} €</TableCell>
        </tr>
      )
    }
  ))
}