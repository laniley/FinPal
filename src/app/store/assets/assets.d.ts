interface Asset {
  ID: number,
  name: string,
  symbol: string,
  kgv?: string,
  current_shares?: float,
  current_invest?: float,
  current_sum_in_out?: float,
  price?: float,
  currencySymbol?: string
}