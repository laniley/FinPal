import { useAppSelector, useAppDispatch } from './../../../hooks'

import TransactionCreation from './components/TransactionCreation';
import TransactionListItem from './components/TransactionListItem';

export default function TransactionsRoute() {

	const theme = useAppSelector(state => state.appState.theme)
	const transactions = useAppSelector(state => state.transactions.transactions)

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
								<th>Asset</th>
								<th>Amount</th>
								<th>Price per share</th>
								<th>Fee</th>
								<th>Solidarity Surcharge</th>
							</tr>
						</thead>
						<tbody>
							<TransactionCreation/>
							{transactions.map((transaction, i) => {
								return (<TransactionListItem key={"transaction-" + transaction.ID} i={i+1} transaction={transaction} />)
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}