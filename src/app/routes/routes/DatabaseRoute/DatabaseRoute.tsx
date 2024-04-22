import { useAppSelector, useAppDispatch } from './../../../hooks'
import sendAsync from './../../../../renderer';

import {
	Colors,
} from '@blueprintjs/core';

import { getBgColor } from '../../../store/appState/appState.selectors';
import { useEffect, useState } from 'react';

export default function DatabaseRoute() {

	const dispatch = useAppDispatch();
	const theme = useAppSelector(state => state.appState.theme)
	const transactions = useAppSelector(state => state.appState.transactions)
	const [dateInput, setDateInput] = useState('');
	const [typeInput, setTypeInput] = useState('');
	const [assetInput, setAssetInput] = useState('');
	const [amountInput, setAmountInput] = useState('');
	const [priceInput, setPriceInput] = useState('');

	const border = `1px solid ${theme == 'bp3-dark' ? Colors.DARK_GRAY1 : Colors.LIGHT_GRAY1}`

	function validate() {
		console.log('validate')
		if(dateInput && typeInput && assetInput) {
			let sql  = 'INSERT OR REPLACE INTO transactions (date, type, asset, amount, price_per_share) '
					sql += 'VALUES (\'' + dateInput + '\',\'' + typeInput + '\',\'' + assetInput + '\',\'' + amountInput + '\',\'' + priceInput + '\')'
					console.log(sql)
			sendAsync(sql).then((result) => console.log(result));
		}	
	}

	return (
		<div
			id="DatabaseRoute"
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
							<td><input id="dateInput" type="date" onChange={(e) => setDateInput(e.target.value)} onBlur={(e) => validate()} /></td>
							<td><input id="typeInput" type="text" onChange={(e) => setTypeInput(e.target.value)} onBlur={(e) => validate()} /></td>
							<td><input id="assetInput" type="text" onChange={(e) => setAssetInput(e.target.value)} onBlur={(e) => validate()} /></td>
							<td><input id="amountInput" type="text" onChange={(e) => setAmountInput(e.target.value)} onBlur={(e) => validate()} /></td>
							<td><input id="priceInput" type="text" onChange={(e) => setPriceInput(e.target.value)} onBlur={(e) => validate()} /></td>
						</tr>
						{transactions.map((transaction, i) => {
							console.log(transaction.date)
							return (
								<tr key={"transaction-" + i}>
									<td>{transaction.date}</td>
									<td>{transaction.type}</td>
									<td>{transaction.asset}</td>
									<td>{transaction.amount}</td>
									<td>{transaction.price}</td>
								</tr>
							)
						})}
					</tbody>
				</table>
				</div>
			</div>
		</div>
	);

}
