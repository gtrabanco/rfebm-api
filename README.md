# RFEBM API

```bash
bun install
bun run src/index.ts
```

This project requires [Bun](https://bun.sh)

## To Know

Coolify proxy add some useful data on the `request.headers`:

```js
{
  "host": "rfebm.7metros.es",
  "x-forwarded-for": "81.32.86.179",
  "x-forwarded-host": "rfebm.7metros.es",
  "x-forwarded-port": "443",
  "x-forwarded-proto": "https",
  "x-forwarded-server": "1584832f4835",
  "x-real-ip": "81.32.86.179"
}
```
