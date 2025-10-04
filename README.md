# Canchita Expo <�

Una aplicaci�n m�vil para gestionar torneos de f�tbol amateur entre amigos, desarrollada con React Native y Expo.

## <� Concepto

Canchita es una app dise�ada para grupos de amigos que juegan f�tbol regularmente y quieren llevar un registro competitivo de sus partidos. La app organiza autom�ticamente torneos tipo copa con fases de grupos y eliminaci�n directa.

## <� Caracter�sticas Principales

### Competitividad y Pique
- **Logros y medallas**: Desbloquea insignias por hitos como "Invicto en grupos" o "3 copas seguidas"
- **Ranking global y semanal**: Tabla general de copas ganadas y tabla semanal de mejor rendimiento
- **Rachas activas**: Muestra cu�ntos partidos seguidos ha ganado (o perdido) un jugador
- **Recompensas simb�licas**: �conos como "corona del campe�n" para quien est� primero en el ranking semanal

### Social e Interacci�n
- **Perfil de jugador personalizado**: Cada jugador puede tener foto, apodo, posici�n favorita y pie dominante
- **Comparativa entre jugadores (VS)**: Historial directo entre dos jugadores: qui�n ha ganado m�s, etc.
- **Feed de actividad**: Muro con eventos recientes: copas ganadas, eliminaciones, rachas

### Gamificaci�n Interna
- **Draft de equipos inteligente**: Sugiere equipos balanceados basados en estad�sticas de rendimiento
- **Sistema de apuestas simb�licas**: Apuesta puntos de prestigio con amigos antes de los partidos (sin dinero real)
- **Temporadas**: Cada mes inicia una nueva temporada con su propio ranking y trofeos

### Datos y Motivaci�n Personal
- **Estad�sticas detalladas**: Evoluci�n de rendimiento, winrate, historial por jugador, etc.
- **Resumen mensual personalizado**: Informe visual con partidos jugados, mejoras, y posici�n en ranking

### Notificaciones Inteligentes
- **Push motivacionales**: Recordatorios personalizados: "Est�s a 1 partido de ganar una copa"
- **Recomendaciones de revancha**: Sugerencias como: "Perdiste 3 veces contra X. �Hora de la revancha?"

## =� Roadmap de Desarrollo

###  Fase 1  MVP Funcional (Esencial)
- Crear usuarios
- Crear grupos de jugadores
- Asignar equipos por partido
- Registrar resultado del partido
- Formato de Copa Individual
- Historial b�sico de cada jugador

### < Fase 2  Social & Engagement
- Feed de actividad
- Perfil de jugador personalizado
- Comparativa entre jugadores (VS)
- Ranking global y semanal

### >� Fase 3  Gamificaci�n
- Logros y medallas
- Rachas activas
- Recompensas simb�licas
- Sistema de apuestas simb�licas
- Temporadas

### =� Fase 4  Datos & Retenci�n
- Estad�sticas detalladas
- Resumen mensual personalizado

### = Fase 5  Notificaciones Inteligentes
- Push motivacionales
- Recomendaciones de revancha

## <� Arquitectura

### Modelo de Datos
- **Usuarios**: Perfiles de jugadores con estad�sticas
- **Grupos**: Colecciones de jugadores que compiten entre s�
- **Copas**: Torneos con fase de grupos y eliminaci�n directa
- **Partidos**: Registros individuales de cada encuentro
- **Temporadas**: Per�odos de competencia con rankings independientes

### L�gica de Copa
1. **Creaci�n de grupos**: Asignaci�n de members y creaci�n de profiles
2. **Fase de grupos**: Todos contra todos
3. **Eliminaci�n directa**: Los mejores avanzan al playoff
4. **Actualizaci�n autom�tica**: Las estad�sticas se actualizan tras cada partido

## =� Tecnolog�as

- **React Native**: Framework principal
- **Expo**: Plataforma de desarrollo
- **TypeScript**: Tipado est�tico
- **Base de datos**: TBD (SQLite/Firebase)

## =� Instalaci�n

```bash
# Clonar repositorio
git clone https://github.com/usuario/canchita-expo.git

# Instalar dependencias
cd canchita-expo
npm install

# Iniciar en desarrollo
expo start
```

## <� Uso

1. Crea un grupo con tus amigos
2. Registra los resultados de cada partido
3. La app autom�ticamente organiza las copas
4. Compite por el ranking y desbloquea logros
5. Revisa tu progreso en estad�sticas detalladas

---

*Desarrollado para hacer m�s divertidos los partidos entre amigos* �