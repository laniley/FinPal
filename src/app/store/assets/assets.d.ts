interface Asset {
  ID: number,
  name: string,
  symbol: string,
  isin: string,
  kgv?: string,
  current_shares?: float,
  current_shares_before_ex_date?: float;
  current_invest?: float,
  current_sum_in_out?: float,
  price?: float,
  avg_price_paid?: float,
  currencySymbol?: string,
  current_profit_loss?: float,
  current_profit_loss_percentage?: float,
  current_profit_loss_percentage_formatted?: string,
  dividends?: [],
  dividends_earned?: float,
  exDividendDate?: string,
  payDividendDate?: string,
  dividendFrequency?: string,
  dividendYield?: float,
  next_estimated_dividend_per_share?: float
}