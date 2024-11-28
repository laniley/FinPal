export const get_current_profit_loss = (asset:Asset) => (asset.current_shares * asset.price) + asset.current_invest
export const get_current_profit_loss_percentage = (asset:Asset) => (asset.current_invest != 0 ? -1 * get_current_profit_loss(asset)/asset.current_invest * 100 : 0)
export const get_current_profit_loss_bgColor = (asset:Asset) => (get_current_profit_loss(asset) > 0 ? "bg-teal-600" : (get_current_profit_loss(asset) == 0 ? "transparent" : "bg-custom-red"))
export const get_current_profit_loss_textColor = (asset:Asset) => (get_current_profit_loss(asset) == 0 ? "text-slate-500" : "inherit")
export const get_current_sum_in_out_bgColor = (asset:Asset) => (asset.current_sum_in_out > 0 ? "bg-teal-600" : (asset.current_sum_in_out < 0 ? "bg-custom-red" : "inherit"))
export const get_ex_dividend_date_textColor = (asset:Asset) => (new Date(asset.exDividendDate) < new Date() ? "text-slate-500" : "inherit")
export const get_pay_dividend_date_textColor = (asset:Asset) => (new Date(asset.payDividendDate) < new Date() ? "text-slate-500" : "inherit")
export const get_upcoming_dividends = (asset:Asset) => (asset.next_estimated_dividend_per_share ? asset.next_estimated_dividend_per_share * asset.current_shares_before_ex_date: 0)
export const get_upcoming_dividends_textColor = (asset:Asset) => (get_upcoming_dividends(asset) <= 0 ? "text-slate-500" : "inherit")
export const get_dividends_earned_textColor = (asset:Asset) => (asset.dividends_earned <= 0 ? "text-slate-500" : "inherit")

export function selectAssetsSortedByProfitLoss(state: Asset[], direction:'asc'|'desc') {
  const active = state.filter((asset:Asset) => asset.current_shares != 0 && asset.current_shares != null)
	const inactive = state.filter((asset:Asset) => asset.current_shares == 0 || asset.current_shares == null)
	const sorted = active.slice().sort((a:Asset, b:Asset) => sortBy(a, b, 'current_profit_loss_percentage', direction))
	const all = sorted.concat(inactive)
  return all
}

export function selectAssetsSortedByName(state: Asset[], direction:'asc'|'desc') {
  return state != undefined ? state.slice().sort((a:Asset, b:Asset) => sortBy(a, b, 'name', direction)) : []
}

export function selectAssetsSortedByDividendPayDate(state: Asset[], direction:'asc'|'desc') {
  return state != undefined ? state.slice().sort((a:Asset, b:Asset) => sortBy(a, b, 'dividendPayDate', direction)) : []
}

export function sortBy(a:Asset, b:Asset, property:string, direction:'asc'|'desc') {
	if(property == 'name') {
		if(direction == 'asc')
			return a.name.localeCompare(b.name)
		else
			return b.name.localeCompare(a.name)
	}
	else if(property == 'dividendPayDate') {
		if(direction == 'asc')
			return a.payDividendDate.localeCompare(b.payDividendDate)
		else
			return b.payDividendDate.localeCompare(a.payDividendDate)
	}
	else if(property == 'current_profit_loss_percentage') {
		if(direction == 'asc')
			if(get_current_profit_loss_percentage(a) < get_current_profit_loss_percentage(b))
				return -1
			else return 1
		else
			if(get_current_profit_loss_percentage(b) < get_current_profit_loss_percentage(a))
				return -1
			else return 1
	}
}