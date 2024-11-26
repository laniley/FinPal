const sql = `
CREATE VIEW IF NOT EXISTS assets_v AS
  SELECT
    assets.ID as ID,
    assets.name as name,
    assets.symbol as symbol,
    assets.isin as isin,
    kgv,
    AVG(transactions.price_per_share) AS avg_price_paid,
    SUM(CASE WHEN type = 'Buy' THEN amount * price_per_share ELSE 0 END) AS invested,
    SUM(CASE WHEN type = 'Sell' THEN amount * price_per_share ELSE 0 END) AS profit,
    SUM(fee) AS fees,
    SUM(CASE WHEN type = 'Buy' THEN amount ELSE amount * -1 END) AS current_shares,
    SUM(in_out) AS current_sum_in_out,
    (SELECT SUM(income) FROM dividends WHERE dividends.asset_ID = assets.ID) AS dividends_earned
FROM assets
  LEFT JOIN transactions_v as transactions ON transactions.asset_ID = assets.ID
GROUP BY assets.ID, kgv
`

export default sql