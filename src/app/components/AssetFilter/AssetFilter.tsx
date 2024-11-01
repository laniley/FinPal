import * as assetSelector from '../../store/assets/assets.selectors';
import { useAppSelector, useAppDispatch } from './../../hooks'

import {
	Button,
	Intent,
	Popover
} from '@blueprintjs/core';

export default function AssetFilter(props: {filter:number[], reducer:any}) {

  function AssetFilterOptions() {

    const dispatch = useAppDispatch();
    const assets = useAppSelector(state => state.assets.assets)
    const sorted_assets = assetSelector.selectAssetsSortedByName(assets, 'asc')

    return (
      <div id="AssetFilterPopupContent" data-testid="AssetFilterPopupContent">
        {sorted_assets.map((asset, i) => {
          return (
            <div key={"assetsFilter_" + asset.ID}>
              <input 
                data-testid={"assetsFilter_" + asset.ID} 
                type="checkbox" 
                checked={props.filter.includes(asset.ID)} 
                onChange={(e) => dispatch(props.reducer.toggleAsset(asset.ID))} />
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

