import { useAppSelector } from './../../../hooks'

import TransactionCreation from './components/TransactionCreation';
import TransactionListItem from './components/TransactionListItem';
import AssetFilter from './../../../components/AssetFilter/AssetFilter'
import * as transactionFilterReducer from './../../../store/transactionFilter/transactionFilter.reducer';

export default function TransactionsRoute() {

	const theme = useAppSelector(state => state.appState.theme)
	const filerForAssets = useAppSelector(state => state.transactionFilter.assets)
	const transactions = useAppSelector(state => state.transactions.transactions)

	return (
		<div
			id="TransactionsRoute"
			data-testid="TransactionsRoute"
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
									<AssetFilter filter={filerForAssets} reducer={transactionFilterReducer} />
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
									if(filerForAssets.includes(transaction.asset_ID)) {
										return transaction
									}
								}
								else {
									return transaction
								}
							}).map((transaction, i) => {
								return (<TransactionListItem key={"transaction-" + transaction.ID} i={i+1} transaction={transaction}/>)
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}