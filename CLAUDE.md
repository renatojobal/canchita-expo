# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Canchita Expo is a React Native mobile application built with Expo for managing amateur soccer tournaments among friends. The app organizes automatic cup-style tournaments with group phases and elimination rounds.

## Development Commands

### Core Development
- `npm start` - Start Expo development server
- `npm run android` - Start with Android emulator/device
- `npm run ios` - Start with iOS simulator/device  
- `npm run web` - Start web development server

### Project Structure
- `App.js` - Main application entry point (currently default Expo template)
- `assets/` - Application icons, splash screens, and static assets
- `app.json` - Expo configuration with app metadata, platform settings
- `package.json` - Dependencies and npm scripts

## Architecture Notes

This is a fresh Expo project currently containing only the default template code. The main application logic needs to be implemented according to the roadmap outlined in README.md.

### Planned Core Features (from README.md)
- User management and authentication
- Group creation and player management  
- Match recording and team assignment
- Cup tournament logic (group phase → elimination rounds)
- Statistics tracking and leaderboards
- Social features (profiles, activity feed, player comparisons)

### Technology Stack
- **React Native**: Core mobile framework
- **Expo**: Development platform and build tooling
- **React 19.1.0**: Latest React version
- **Expo SDK ~54.0.12**: Current Expo SDK version

## Development Context

The project is in initial setup phase with standard Expo configuration. The main App.js currently shows the default "Open up App.js to start working" message and needs to be replaced with the actual application implementation.

New Architecture is enabled (`newArchEnabled: true` in app.json) indicating this uses React Native's latest architecture improvements.