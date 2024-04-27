import { useAppSelector, useAppDispatch } from './../../../hooks'

import * as transactionCreationReducer from './../../../../../src/app/store/transactionCreation/transactionCreation.reducer';
import TransactionListItem from './components/TransactionListItem';

export default function TransactionsRoute() {

	const dispatch = useAppDispatch();
	const theme = useAppSelector(state => state.appState.theme)
	const dateInput = useAppSelector(state => state.transactionCreation.dateInput)
	const typeInput = useAppSelector(state => state.transactionCreation.typeInput)
	const assetInput = useAppSelector(state => state.transactionCreation.assetInput)
	const amountInput = useAppSelector(state => state.transactionCreation.amountInput)
	const priceInput = useAppSelector(state => state.transactionCreation.priceInput)
	const feeInput = useAppSelector(state => state.transactionCreation.feeInput)
	const solidaritySurchargeInput = useAppSelector(state => state.transactionCreation.solidaritySurchargeInput)
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
							<tr>
								<td></td>
								<td><input id="dateInput" type="date" value={dateInput} onChange={(e) => dispatch(transactionCreationReducer.setDateInput(e.target.value))} onBlur={() => { dispatch(transactionCreationReducer.handleDateInputGotTouched()) }} /></td>
								<td>
									<select id="typeInput" name="typeInput" value={typeInput} onChange={(e) => dispatch(transactionCreationReducer.setTypeInput(e.target.value))} onBlur={() => { dispatch(transactionCreationReducer.handleTypeInputGotTouched()) }}>
										<option value="Buy">Buy</option>
										<option value="Sell">Sell</option>
									</select>
								</td>
								<td><input id="assetInput" type="text" value={assetInput} onChange={(e) => dispatch(transactionCreationReducer.setAssetInput(e.target.value))} onBlur={() => { dispatch(transactionCreationReducer.handleAssetInputGotTouched()) }} /></td>
								<td><input id="amountInput" type="text" value={amountInput} onChange={(e) => dispatch(transactionCreationReducer.setAmountInput(e.target.value))} onBlur={() => { dispatch(transactionCreationReducer.handleAmountInputGotTouched()) }} /></td>
								<td><input id="priceInput" type="text" value={priceInput} onChange={(e) => dispatch(transactionCreationReducer.setPriceInput(e.target.value))} onBlur={() => { dispatch(transactionCreationReducer.handlePriceInputGotTouched()) }} /></td>
								<td><input id="feeInput" type="text" value={feeInput} onChange={(e) => dispatch(transactionCreationReducer.setFeeInput(e.target.value))} onBlur={() => { dispatch(transactionCreationReducer.handleFeeInputGotTouched()) }} /></td>
								<td><input id="solidaritySurchargeInput" type="text" value={solidaritySurchargeInput} onChange={(e) => dispatch(transactionCreationReducer.setSolidaritySurchargeInput(e.target.value))} onBlur={() => { dispatch(transactionCreationReducer.handleSolidaritySurchargeInputGotTouched()) }} /></td>
							</tr>
							{transactions.map((transaction, i) => {
								return (<TransactionListItem key={"transaction-" + i} i={i+1} transaction={transaction} />)
							})}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}