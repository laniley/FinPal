const sql = `
CREATE TABLE IF NOT EXISTS assets (
  ID INTEGER PRIMARY KEY,
  name UNIQUE VARCHAR NOT NULL,
  symbol UNIQUE VARCHAR NOT NULL,
  isin UNIQUE VARCHAR NOT NULL,
  kgv,
  PRIMARY KEY("ID" AUTOINCREMENT)
);

CREATE UNIQUE INDEX asset_name_unique_index ON assets(name);
`

export default sql