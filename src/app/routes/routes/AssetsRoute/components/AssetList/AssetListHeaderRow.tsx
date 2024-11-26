import TableHeaderCell from '../../../../../components/Table/TableHeaderCell/TableHeaderCell';
import RefreshButton from './../../components/RefreshButton';

export default function AnalysisRoute() {

	return (
    <thead>
      <tr>
        <TableHeaderCell><RefreshButton /></TableHeaderCell>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Shares</TableHeaderCell>
        <TableHeaderCell>Current Price per Share</TableHeaderCell>
        <TableHeaderCell></TableHeaderCell>
        <TableHeaderCell>Avg Price Paid</TableHeaderCell>
        <TableHeaderCell>Current Invest</TableHeaderCell>
        <TableHeaderCell>Current Value</TableHeaderCell>
        <TableHeaderCell>Current Profit/Loss</TableHeaderCell>
        <TableHeaderCell>Ex Date</TableHeaderCell>
        <TableHeaderCell>Pay Date</TableHeaderCell>
        <TableHeaderCell>Dividends</TableHeaderCell>
        <TableHeaderCell>In-/Outcome</TableHeaderCell>
      </tr>
    </thead>
	);
}