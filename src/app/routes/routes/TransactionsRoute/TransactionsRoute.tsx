import { useAppSelector, useAppDispatch } from './../../../hooks'
import sendAsync from './../../../../renderer';

import {
	Colors,
} from '@blueprintjs/core';

import { getBgColor } from '../../../store/appState/appState.selectors';
import { useEffect, useState } from 'react';
import * as appStateReducer from './../../../../../src/app/store/appState/appState.reducer';
import TransactionListItem from './components/TransactionListItem';

export default function TransactionsRoute() {

	const dispatch = useAppDispatch();
	const theme = useAppSelector(state => state.appState.theme)
	const transactions = useAppSelector(state => state.appState.transactions)
	const transactionsSorted = transactions.slice().sort((a, b) => sortBy(a, b, 'date', 'desc'))
	const [dateInput, setDateInput] = useState('');
	const [typeInput, setTypeInput] = useState('');
	const [assetInput, setAssetInput] = useState('');
	const [amountInput, setAmountInput] = useState('');
	const [priceInput, setPriceInput] = useState('');

	const border = `1px solid ${theme == 'bp3-dark' ? Colors.DARK_GRAY1 : Colors.LIGHT_GRAY1}`

	return (
		<div
			id="TransactionsRoute"
			className={'absolute top-[0px] bottom-0 flex flex-col w-full ' + theme}>
			<div id="Main" className="flex p-3 overflow-auto">
				<div className="flex grow justify-center align-center">
				<table>
					<thead>
						<tr>
							<th>Date</th>
							<th>Type</th>
							<th>Asset</th>
							<th>Amount</th>
							<th>Price per share</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><input id="dateInput" type="date" value={dateInput} onChange={(e) => setDateInput(e.target.value)} onBlur={(e) => validateAndSave()} /></td>
							<td><input id="typeInput" type="text" value={typeInput} onChange={(e) => setTypeInput(e.target.value)} onBlur={(e) => validateAndSave()} /></td>
							<td><input id="assetInput" type="text" value={assetInput} onChange={(e) => setAssetInput(e.target.value)} onBlur={(e) => validateAndSave()} /></td>
							<td><input id="amountInput" type="text" value={amountInput} onChange={(e) => setAmountInput(e.target.value)} onBlur={(e) => validateAndSave()} /></td>
							<td><input id="priceInput" type="text" value={priceInput} onChange={(e) => setPriceInput(e.target.value)} onBlur={(e) => validateAndSave()} /></td>
						</tr>
						{transactionsSorted.map((transaction, i) => {
							return (<TransactionListItem key={"transaction-" + i} transaction={transaction} />)
						})}
					</tbody>
				</table>
				</div>
			</div>
		</div>
	);

	function sortBy(a:Transaction, b:Transaction, property:string, direction:'asc'|'desc') {
		if(property == 'date') {
			if(direction == 'asc')
				return a.date.localeCompare(b.date)
			else
				return b.date.localeCompare(a.date)
		}
		else if(property == 'asset') {
			if(direction == 'asc')
				return a.asset.localeCompare(b.asset)
			else
				return b.asset.localeCompare(a.asset)
		}
	}

	function validateAndSave() {
		console.log('validate')
		if(dateInput && typeInput && assetInput && amountInput && priceInput) {
			let sql  = 'INSERT INTO transactions (date, type, asset, amount, price_per_share) '
					sql += 'VALUES (\'' + dateInput + '\',\'' + typeInput + '\',\'' + assetInput + '\',\'' + amountInput + '\',\'' + priceInput + '\')'
					console.log(sql)
			setDateInput('')
			setTypeInput('')
			setAssetInput('')
			setAmountInput('')
			setPriceInput('')
			sendAsync(sql).then((result) => {
				console.log(result)
				sendAsync('SELECT * FROM transactions').then((result:Transaction[]) => {
					console.log(result)
					dispatch(appStateReducer.setTransactions(result))
					document.getElementById("dateInput").focus();
				});
			});
		}	
	}

}
