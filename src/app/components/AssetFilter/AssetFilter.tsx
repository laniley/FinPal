import { useAppSelector, useAppDispatch } from './../../hooks'

import {
	Button,
	Intent,
	Popover
} from '@blueprintjs/core';

export default function AssetFilter(props: {filter:string[], reducer:any}) {

  function AssetFilterOptions() {

    const dispatch = useAppDispatch();
    const assets = useAppSelector(state => state.assets.assets)
  
    return (
      <div>
        {assets.map((asset, i) => {
          return (
            <div key={"assetsFilter_" + asset.ID}>
              <input id={"assetsFilter_" + asset.ID} type="checkbox" checked={props.filter.includes(asset.name)} onChange={(e) => dispatch(props.reducer.toggleAsset(asset.name))} />
              <label htmlFor={"assetsFilter_" + asset.ID}>{asset.name}</label>
            </div>
          )
        })}
      </div>
    )
  }

  return(
    <Popover content={AssetFilterOptions()}>
      <Button intent={Intent.PRIMARY} icon="filter" tabIndex={0} />
    </Popover>
  )
}

