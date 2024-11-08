export const get_current_profit_loss = (asset:Asset) => (asset.current_shares * asset.price) + asset.current_invest
export const get_current_profit_loss_percentage = (asset:Asset) => (asset.current_invest != 0 ? -1 * get_current_profit_loss(asset)/asset.current_invest * 100 : 0)

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

export function sortBy(a:Asset, b:Asset, property:string, direction:'asc'|'desc') {
	if(property == 'name') {
		if(direction == 'asc')
			return a.name.localeCompare(b.name)
		else
			return b.name.localeCompare(a.name)
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