export default interface AppState {
  selectedTab: "analisysTab" | "assetsTab" | "transactionsTab" | "dividendsTab",
  theme: string,
  database: string,
  assetOverlayType: AssetOverlayType,
  showAssetOverlay: boolean
}
