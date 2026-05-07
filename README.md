# 🎬 Netflix Wrapped

Descubre tus estadísticas de visionado de Netflix al estilo Spotify Wrapped. Sube tu historial en CSV y obtén un resumen animado de tu año en pantalla.

## ¿Cómo funciona?

1. Ve a [netflix.com/viewingactivity](https://www.netflix.com/viewingactivity)
2. Descarga tu historial como CSV (`NetflixViewingHistory.csv`)
3. Súbelo a la app y disfruta tu resumen

## Qué incluye

- **Serie favorita** — la que más episodios has visto
- **Top 6 series** — ranking con barras animadas
- **Mayor maratón** — tu récord de episodios en un solo día
- **Racha más larga** — días consecutivos con Netflix
- **Actividad mensual** — gráfico de barras por mes
- **Perfil de visionado** — tu personalidad como espectador

## Instalación y uso local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173` en el navegador.

## Comandos

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build de producción |
| `npm run preview` | Vista previa del build |
| `npm run lint` | Linter ESLint |

## Tecnologías

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Framer Motion](https://www.framer.com/motion/) — animaciones
- [Recharts](https://recharts.org/) — gráficos
- [PapaParse](https://www.papaparse.com/) — parseo de CSV
- [Tailwind CSS](https://tailwindcss.com/)

## Privacidad

Todo el procesamiento ocurre en tu navegador. Ningún dato se envía a ningún servidor.
