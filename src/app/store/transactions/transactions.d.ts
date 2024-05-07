interface Transaction {
	ID: number,
	date: string,
	type: string,
	asset: string,
	amount: float,
	shares_cumulated: float,
	price_per_share: float,
	fee: float,
	solidarity_surcharge: float,
	in_out: float
}