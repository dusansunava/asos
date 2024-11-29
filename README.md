# Project Repository: Fitness Application for ASOS


## Overview
Welcome to our repository for the ASOS (Architecture of software systems) lecture project. This repository serves as the central hub for our collaborative work on a Fitness application.


## Project Description
Our project is a fitness application designed to help users maintain a healthy lifestyle. The application includes features for tracking exercises, managing personal measurements, and discovering nutritious recipes. It aims to provide an engaging and user-friendly platform for fitness enthusiasts.


## Key Features
Exercises: Track your workouts and explore exercise plans designed to meet your fitness goals.

Profile with Measurements: Keep track of your personal fitness journey by logging body measurements, progress photos, and fitness goals.

Food & Recipes: Discover and manage healthy recipes that support your diet and nutritional needs.


## Getting Started With Project
Local development of backend: [guide](./backend/README.md)<br/>
Local development of frontend: [guide](./frontend/README.md)


## Production build
1. In the root of project create .env.production from .env.example

2. Run production build:
```
docker compose --env-file .env.production up -d --build  --remove-orphans
```


## License
Maybe MIT ?

