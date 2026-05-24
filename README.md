# CryptoUMG — Simulador de Compra y Venta de Criptomonedas

Proyecto final de la **Facultad de Ingeniería en Sistemas — Universidad Mariano Gálvez de Guatemala**.

Prototipo web (frontend) de un exchange de criptomonedas que simula compra, venta y portfolio del usuario. Los precios se obtienen en vivo desde la API pública de [CoinGecko](https://www.coingecko.com/api). La persistencia del wallet, usuarios y transacciones se hace en `localStorage` detrás de una capa de servicios diseñada para reemplazarse por un backend real en la Fase 2.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** con tema dark estilo Binance/Coinbase Pro
- **Zustand** para estado global
- **Recharts** para gráficos
- **Zod** para validación de formularios
- **CoinGecko API** para precios reales

## Arquitectura

Los componentes nunca tocan `localStorage` directamente — siempre van por la capa de servicios (`src/lib/services/`). En Fase 2 (próximo curso) basta con reemplazar las implementaciones `*.local.ts` por `*.http.ts` que peguen al backend real.

```
src/
├── app/                # rutas (App Router)
├── components/         # UI
├── lib/
│   ├── domain/         # modelos puros
│   ├── services/       # interfaces + implementaciones (localStorage / CoinGecko)
│   ├── hooks/          # hooks de React (useWallet, usePrices, etc.)
│   └── utils.ts        # formatters y helpers
```

## Desarrollo

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Fases del proyecto

- **Fase 1 (entrega 31-may-2026):** prototipo frontend con precios en vivo y persistencia en `localStorage`.
- **Fase 2 (próximo curso):** backend con BD, auth real, transacciones persistidas.
