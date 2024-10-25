import { useAppSelector, useAppDispatch } from '../../../../hooks'
import { useState } from 'react';
import TableCell from '../../../../components/TableCell/TableCell'
import { Alignment, Button } from '@blueprintjs/core';
import * as assetsSelector from '../../../../store/assets/assets.selectors';
import * as appStateReducer from '../../../../store/appState/appState.reducer';
import * as assetCreationReducer from '../../../../store/assetCreation/assetCreation.reducer';

export default function AssetListItem(props: {i: number, asset:Asset}) {

  const dispatch = useAppDispatch();

	const shares_formatted = (Math.round(props.asset.current_shares * 1000) / 1000).toFixed(3)
	const current_price = (Math.round(props.asset.price * 100) / 100).toFixed(2)
	const avg_price_paid_formatted = (Math.round(props.asset.avg_price_paid * 100) / 100).toFixed(2)
	const price_comparison = props.asset.price < props.asset.avg_price_paid ? "<" : props.asset.price > props.asset.avg_price_paid ? ">" : "="
	const current_invest = (Math.round(props.asset.current_invest * 100) / 100).toFixed(2)
	const current_value = (Math.round(props.asset.current_shares * props.asset.price * 100) / 100).toFixed(2)
	const current_profit_loss = assetsSelector.get_current_profit_loss(props.asset)
	const current_profit_loss_formatted = (Math.round(current_profit_loss * 100) / 100).toFixed(2)
	const current_profit_loss_percentage = assetsSelector.get_current_profit_loss_percentage(props.asset)
	const current_profit_loss_percentage_formatted = (current_profit_loss_percentage).toFixed(2)
	const dividends_formatted = (Math.round(props.asset.dividends * 100) / 100).toFixed(2)
	const current_sum_in_out = (Math.round((props.asset.current_sum_in_out + props.asset.dividends) * 100) / 100).toFixed(2)

	const bgColor_PriceComparison = price_comparison == "<" ? "bg-emerald-600" : (price_comparison == "=" ? "bg-slate-500" : "bg-custom-red")
	const bgColor_ProfitLoss = current_profit_loss > 0 ? "bg-emerald-600" : (props.asset.current_profit_loss == 0 ? "bg-slate-500" : "bg-custom-red")
	const bgColor_InOut = props.asset.current_sum_in_out > 0 ? "bg-emerald-600" : "bg-custom-red"

  return (
    <tr>
			<TableCell additionalClassNames="text-right">{props.i}</TableCell>
			<TableCell>{props.asset.ID}</TableCell>
      <TableCell>
				<Button text={props.asset.name} minimal fill alignText={Alignment.LEFT} onClick={(e) => openAssetOverlay()} />
			</TableCell>
			<TableCell additionalClassNames="text-right">{shares_formatted}</TableCell>
			<TableCell additionalClassNames="text-right">{current_price} {props.asset.currencySymbol}</TableCell>
			<TableCell additionalClassNames="text-right" bgColor={bgColor_PriceComparison}>{price_comparison}</TableCell>
			<TableCell additionalClassNames="text-right">{avg_price_paid_formatted} {props.asset.currencySymbol}</TableCell>
			<TableCell additionalClassNames="text-right">{current_invest} {props.asset.currencySymbol}</TableCell>
			<TableCell additionalClassNames="text-right">{current_value} {props.asset.currencySymbol}</TableCell>
			<TableCell additionalClassNames="text-right" bgColor={bgColor_ProfitLoss}>{current_profit_loss_formatted} {props.asset.currencySymbol} / {current_profit_loss_percentage_formatted} %</TableCell>
			<TableCell additionalClassNames="text-right">{props.asset.exDividendDate}</TableCell>
			<TableCell additionalClassNames="text-right">{props.asset.payDividendDate}</TableCell>
			<TableCell additionalClassNames="text-right">{dividends_formatted} {props.asset.currencySymbol}</TableCell>
			<TableCell additionalClassNames="text-right" bgColor={bgColor_InOut}>{current_sum_in_out} €</TableCell>
    </tr>
  );

	function openAssetOverlay() {
		dispatch(appStateReducer.setAssetOverlayType(appStateReducer.AssetOverlayType.EDIT))
		dispatch(assetCreationReducer.setID(props.asset.ID))
		dispatch(assetCreationReducer.setNameInput(props.asset.name))
		dispatch(assetCreationReducer.setSymbolInput(props.asset.symbol))
		dispatch(assetCreationReducer.setISINInput(props.asset.isin))
		dispatch(assetCreationReducer.setKGVInput(props.asset.kgv))
		dispatch(appStateReducer.setShowAssetOverlay(true))
	}
}