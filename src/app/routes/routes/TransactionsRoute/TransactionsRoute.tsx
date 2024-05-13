import { Button, Icon, Intent, Popover } from '@blueprintjs/core';
import { useAppSelector, useAppDispatch } from './../../../hooks'

import TransactionCreation from './components/TransactionCreation';
import TransactionListItem from './components/TransactionListItem';
import * as transactionFilterReducer from './../../../store/transactionFilter/transactionFilter.reducer';

export default function TransactionsRoute() {

	const dispatch = useAppDispatch();
	const theme = useAppSelector(state => state.appState.theme)
	const assets = useAppSelector(state => state.assets.assets)
	const filerForAssets = useAppSelector(state => state.transactionFilter.assets)
	const transactions = useAppSelector(state => state.transactions.transactions)
	
	function AssetFilterOptions() {
		return (
			<div>
				{assets.map((asset, i) => {
					return (
						<div key={"assetsFilter_" + asset.ID}>
							<input id={"assetsFilter_" + asset.ID} type="checkbox" checked={filerForAssets.includes(asset.name)} onChange={(e) => dispatch(transactionFilterReducer.toggleAsset(asset.name))} />
							<label htmlFor={"assetsFilter_" + asset.ID}>{asset.name}</label>
						</div>
					)
				})}
			</div>
		)
	}

	return (
		<div
			id="TransactionsRoute"
			className={'absolute top-[0px] bottom-0 flex flex-col w-full ' + theme}>
			<div id="Main" className="flex p-3 overflow-auto">
				<div className="flex grow justify-center align-center">
					<table>
						<thead>
							<tr>
								<th>#</th>
								<th>Date</th>
								<th>Type</th>
								<th>Asset 
									<Popover content={AssetFilterOptions()}>
										<Button intent={Intent.PRIMARY} icon="filter" tabIndex={0} />
									</Popover>
								</th>
								<th>Shares</th>
								<th>Shares (cumulated)</th>
								<th>Price per share</th>
								<th>Fee</th>
								<th>Solidarity Surcharge</th>
								<th>Invest (cumulated)</th>
								<th>In-/Outcome</th>
							</tr>
						</thead>
						<tbody>
							<TransactionCreation/>
							{transactions.filter((transaction) => {
								if(filerForAssets.length > 0) {
									if(filerForAssets.includes(transaction.asset)) {
										return transaction
									}
								}
								else {
									return transaction
								}
							}).map((transaction, i) => {
								return (<TransactionListItem key={"transaction-" + transaction.ID} i={i+1} transaction={transaction} />)
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}