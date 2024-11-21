// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Vite
// plugin that tells the Electron app where to look for the Vite-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

interface State {
  appState?: AppState,
  transactions?: Transactions,
  transactionCreation?: TransactionCreation,
  transactionFilter?: TransactionFilter,
  assets?: Asset[],
  assetCreation?: AssetCreation,
  dividends?: Dividends,
  dividendCreation?: DividendCreation,
  dividendsFilter?: DividendsFilter
}