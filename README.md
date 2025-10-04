# Canchita Expo <Æ

Una aplicación móvil para gestionar torneos de fútbol amateur entre amigos, desarrollada con React Native y Expo.

## <¯ Concepto

Canchita es una app diseñada para grupos de amigos que juegan fútbol regularmente y quieren llevar un registro competitivo de sus partidos. La app organiza automáticamente torneos tipo copa con fases de grupos y eliminación directa.

## <Å Características Principales

### Competitividad y Pique
- **Logros y medallas**: Desbloquea insignias por hitos como "Invicto en grupos" o "3 copas seguidas"
- **Ranking global y semanal**: Tabla general de copas ganadas y tabla semanal de mejor rendimiento
- **Rachas activas**: Muestra cuántos partidos seguidos ha ganado (o perdido) un jugador
- **Recompensas simbólicas**: Íconos como "corona del campeón" para quien esté primero en el ranking semanal

### Social e Interacción
- **Perfil de jugador personalizado**: Cada jugador puede tener foto, apodo, posición favorita y pie dominante
- **Comparativa entre jugadores (VS)**: Historial directo entre dos jugadores: quién ha ganado más, etc.
- **Feed de actividad**: Muro con eventos recientes: copas ganadas, eliminaciones, rachas

### Gamificación Interna
- **Draft de equipos inteligente**: Sugiere equipos balanceados basados en estadísticas de rendimiento
- **Sistema de apuestas simbólicas**: Apuesta puntos de prestigio con amigos antes de los partidos (sin dinero real)
- **Temporadas**: Cada mes inicia una nueva temporada con su propio ranking y trofeos

### Datos y Motivación Personal
- **Estadísticas detalladas**: Evolución de rendimiento, winrate, historial por jugador, etc.
- **Resumen mensual personalizado**: Informe visual con partidos jugados, mejoras, y posición en ranking

### Notificaciones Inteligentes
- **Push motivacionales**: Recordatorios personalizados: "Estás a 1 partido de ganar una copa"
- **Recomendaciones de revancha**: Sugerencias como: "Perdiste 3 veces contra X. ¿Hora de la revancha?"

## =€ Roadmap de Desarrollo

###  Fase 1  MVP Funcional (Esencial)
- Crear usuarios
- Crear grupos de jugadores
- Asignar equipos por partido
- Registrar resultado del partido
- Formato de Copa Individual
- Historial básico de cada jugador

### < Fase 2  Social & Engagement
- Feed de actividad
- Perfil de jugador personalizado
- Comparativa entre jugadores (VS)
- Ranking global y semanal

### >é Fase 3  Gamificación
- Logros y medallas
- Rachas activas
- Recompensas simbólicas
- Sistema de apuestas simbólicas
- Temporadas

### =È Fase 4  Datos & Retención
- Estadísticas detalladas
- Resumen mensual personalizado

### = Fase 5  Notificaciones Inteligentes
- Push motivacionales
- Recomendaciones de revancha

## <× Arquitectura

### Modelo de Datos
- **Usuarios**: Perfiles de jugadores con estadísticas
- **Grupos**: Colecciones de jugadores que compiten entre sí
- **Copas**: Torneos con fase de grupos y eliminación directa
- **Partidos**: Registros individuales de cada encuentro
- **Temporadas**: Períodos de competencia con rankings independientes

### Lógica de Copa
1. **Creación de grupos**: Asignación de members y creación de profiles
2. **Fase de grupos**: Todos contra todos
3. **Eliminación directa**: Los mejores avanzan al playoff
4. **Actualización automática**: Las estadísticas se actualizan tras cada partido

## =à Tecnologías

- **React Native**: Framework principal
- **Expo**: Plataforma de desarrollo
- **TypeScript**: Tipado estático
- **Base de datos**: TBD (SQLite/Firebase)

## =ñ Instalación

```bash
# Clonar repositorio
git clone https://github.com/usuario/canchita-expo.git

# Instalar dependencias
cd canchita-expo
npm install

# Iniciar en desarrollo
expo start
```

## <® Uso

1. Crea un grupo con tus amigos
2. Registra los resultados de cada partido
3. La app automáticamente organiza las copas
4. Compite por el ranking y desbloquea logros
5. Revisa tu progreso en estadísticas detalladas

---

*Desarrollado para hacer más divertidos los partidos entre amigos* ½