import fs from "node:fs";

const data = JSON.parse(fs.readFileSync("raw-assets.json", "utf8"));

const newData = {
  chain_to_assets_map: {},
};

Object.entries(data.chain_to_assets_map).forEach(([key, value]) => {
  newData.chain_to_assets_map[key] = {
    assets: value.assets.map((asset) => ({
      chain_id: asset.chain_id,
      denom: asset.denom,
      id: `${asset.chain_id}-${asset.denom}`,
      logo_uri: asset.logo_uri,
      name: asset.name,
      symbol: asset.symbol,
    })),
  };
});

fs.writeFileSync("public/assets.json", JSON.stringify(newData));
