import { useAppSelector, useAppDispatch } from './../../../../hooks'

import {
	Colors,
} from '@blueprintjs/core';

import * as dividendsFilterReducer from './../../../../store/dividendsFilter/dividendsFilter.reducer';

import AssetFilter from './../../../../components/AssetFilter/AssetFilter'
import DividendCreation from './DividendCreation';
import DividendListItem from './DividendListItem';

export default function DividendList() {

	const dividends = useAppSelector(state => state.dividends.dividends)
	const filerForAssets = useAppSelector(state => state.dividendsFilter.assets)
	const theme = useAppSelector(state => state.appState.theme)

  const initialState = {
  }

	const border = `1px solid ${theme == 'bp3-dark' ? Colors.DARK_GRAY1 : Colors.LIGHT_GRAY1}`

	return (
		<div id="DividendList">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Asset 
              <AssetFilter filter={filerForAssets} reducer={dividendsFilterReducer} />
            </th>
            <th>Income</th>
          </tr>
        </thead>
        <tbody>
          <DividendCreation/>
          {dividends.filter((dividend) => {
            if(filerForAssets.length > 0) {
              if(filerForAssets.includes(dividend.asset)) {
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
      </table>
    </div>
	);
}