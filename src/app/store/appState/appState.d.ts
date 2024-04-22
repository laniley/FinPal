interface AppState {
  selectedTab: "analisysTab" | "databaseTab" | "dividendsTab",
  theme: string,
  database: string,
  transactions: Transaction[]
}

interface Transaction {
	date: string,
	type: string,
	asset: string,
	amount: string,
	price: string
}