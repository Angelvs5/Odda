# Odda

Registro de apuestas deportivas. Aplicación web, sin instalación,
que funciona igual en el móvil y en el ordenador.

**→ [angelvs5.github.io/Odda](https://angelvs5.github.io/Odda/)**

---

## Qué hace

Odda no acepta apuestas ni mueve dinero. Lleva el cuaderno: anotas lo
que juegas, y la app calcula el rendimiento real con las métricas que
importan — yield, acierto, rachas, caída máxima.

Tiene tres formas de usarse:

**Personal.** Tu bankroll privado. Apuntas, resuelves y ves cómo vas.

**Grupo.** Un bote común entre varios. Cada uno propone apuestas sobre
los encuentros, se votan, y las cuentas de quién ha puesto qué se
llevan solas. Incluye la apuesta loca por turnos.

**Canal.** Un pronosticador publica y su gente mira, reacciona y copia
lo que le convence a su propio bankroll.

## Por qué los canales son distintos

Cualquiera puede enseñar capturas de las apuestas que gana. Lo difícil
es demostrar que enseñas también las que pierdes.

En un canal de Odda:

- El encuentro es obligatorio, y solo se publica sobre partidos que no
  han empezado
- Al arrancar el encuentro la apuesta se cierra: no se edita ni se borra
- El resultado se marca una vez y es definitivo
- No se puede importar histórico
- La portada muestra las incidencias: pronósticos sin resolver, apuestas
  sin encuentro asociado, cuánto hace del último

La app garantiza **cuándo** se publicó cada pronóstico y que nadie lo
tocó después. Lo que no puede comprobar es si acertó — eso lo marca el
autor, y por eso las incidencias están a la vista de todos.

## Cómo está hecho

- Un solo archivo HTML con todo dentro: sin compilar, sin dependencias
- [Supabase](https://supabase.com) para datos y autenticación
- API de ESPN para los encuentros
- Service worker para funcionar sin cobertura y recibir notificaciones
- Notificaciones push vía VAPID, con Edge Functions de Supabase

## Estructura

```
index.html    La aplicación entera
sw.js         Service worker · caché y notificaciones
```

---

Apostar es solo para mayores de 18 años. Si crees que se te está yendo
de las manos, en España la línea de atención al jugador es el
**900 200 225**, gratuita y confidencial.
