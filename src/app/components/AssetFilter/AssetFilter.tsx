import { sortBy } from '../../store/assets/assets.selectors';
import { useAppSelector, useAppDispatch } from './../../hooks'

import {
	Button,
	Intent,
	Popover
} from '@blueprintjs/core';

export default function AssetFilter(props: {filter:string[], reducer:any}) {

  function AssetFilterOptions() {

    const dispatch = useAppDispatch();
    const assets = useAppSelector(state => state.assets.assets).slice().sort((a:Asset, b:Asset) => sortBy(a, b, 'name', 'asc'))

    return (
      <div id="AssetFilterPopupContent" data-testid="AssetFilterPopupContent">
        {assets.map((asset, i) => {
          return (
            <div key={"assetsFilter_" + asset.ID}>
              <input data-testid={"assetsFilter_" + asset.ID} type="checkbox" checked={props.filter.includes(asset.name)} onChange={(e) => dispatch(props.reducer.toggleAsset(asset.name))} />
              <label htmlFor={"assetsFilter_" + asset.ID}>{asset.name}</label>
            </div>
          )
        })}
      </div>
    )
  }

  return(
    <Popover content={AssetFilterOptions()}>
      <Button id="AssetFilterButton" data-testid="AssetFilterButton" intent={Intent.PRIMARY} icon="filter" tabIndex={0} />
    </Popover>
  )
}

