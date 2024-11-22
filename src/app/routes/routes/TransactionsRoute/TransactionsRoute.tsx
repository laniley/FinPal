import { useAppSelector } from './../../../hooks'

import TransactionCreation from './components/TransactionCreation';
import TransactionListItem from './components/TransactionListItem';
import AssetFilter from './../../../components/AssetFilter/AssetFilter'
import * as transactionFilterReducer from './../../../store/transactionFilter/transactionFilter.reducer';
import Table from '../../../components/Table/Table';

export default function TransactionsRoute() {

	const filerForAssets = useAppSelector(state => state.transactionFilter.assets)
	const transactions = useAppSelector(state => state.transactions)

	return (
		<div
			id="TransactionsRoute"
			data-testid="TransactionsRoute">
			<div id="Main" className="flex p-3 overflow-auto">
				<div className="flex grow justify-center align-center">
					<Table>
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
					</Table>
				</div>
			</div>
		</div>
	);
}