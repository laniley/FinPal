import { useAppSelector, useAppDispatch } from './../../../../hooks'

import * as dividendsFilterReducer from './../../../../store/dividendsFilter/dividendsFilter.reducer';

import AssetFilter from './../../../../components/AssetFilter/AssetFilter'
import DividendCreation from './DividendCreation';
import DividendListItem from './DividendListItem';
import Table from '../../../../components/Table/Table';
import TableCell from '../../../../components/Table/TableCell/TableCell';

export default function DividendList() {

	const dividends = useAppSelector(state => state.dividends)
	const filerForAssets = useAppSelector(state => state.dividendsFilter.assets)

	return (
		<div id="DividendList">
      <Table>
        <thead>
          <tr>
            <TableCell>#</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Asset 
              <AssetFilter filter={filerForAssets} reducer={dividendsFilterReducer} />
            </TableCell>
            <TableCell>Income</TableCell>
          </tr>
        </thead>
        <tbody>
          <DividendCreation/>
          {dividends.filter((dividend) => {
            if(filerForAssets.length > 0) {
              if(filerForAssets.includes(dividend.asset_ID)) {
                return dividend
              }
            }
            else {
              return dividend
            }
          }).map((dividend, i) => {
            return (<DividendListItem key={"dividend-" + dividend.ID} i={i+1} dividend={dividend} />)
          })}
        </tbody>
      </Table>
    </div>
	);
}