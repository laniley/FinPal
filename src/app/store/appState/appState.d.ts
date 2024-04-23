interface AppState {
  selectedTab: "analisysTab" | "databaseTab" | "dividendsTab",
  theme: string,
  database: string,
  transactions: Transaction[]
}

interface Transaction {
	ID: number,
	date: string,
	type: string,
	asset: string,
	amount: string,
	price_per_share: string
}