import { useAppSelector, useAppDispatch } from './../../../../hooks'

import * as dividendsFilterReducer from './../../../../store/dividendsFilter/dividendsFilter.reducer';

import AssetFilter from './../../../../components/AssetFilter/AssetFilter'
import DividendCreation from './DividendCreation';
import DividendListItem from './DividendListItem';
import Table from '../../../../components/Table/Table';
import TableHeaderRow from '../../../../components/Table/TableHeaderRow/TableHeaderRow';

export default function DividendList() {

	const dividends = useAppSelector(state => state.dividends)
	const filerForAssets = useAppSelector(state => state.dividendsFilter.assets)

  const columns = [
		{
			header: {
				content: '#'
			}
		},
    {
			header: {
				content: 'Date'
			}
		},
    {
			header: {
				content: <div>{'Asset '}<AssetFilter filter={filerForAssets} reducer={dividendsFilterReducer} /></div>
			}
		},
    {
			header: {
				content: 'Income'
			}
		},
  ]

	return (
		<div id="DividendList">
      <Table>
        <TableHeaderRow columns={columns}/>
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