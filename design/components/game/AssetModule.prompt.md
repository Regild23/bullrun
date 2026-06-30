The signature dashboard tile — one of the 6 asset classes. Clicking selects it; selected tiles glow with their accent color.

```jsx
<AssetModule name="Crypto" accent="var(--br-crypto)" value="€ 2.150"
  delta="+6.4%" allocation={18} selected icon={<CoinsIcon/>}
  onClick={() => setSel('crypto')} />
```
Use the asset tokens: `--br-cash`, `--br-bond`, `--br-etf`, `--br-stock`, `--br-crypto`, `--br-realestate`.
