# Dashboard

Dashboard is a web-app, showing multiple widgets, which are automatically refreshed.
It is composed of a React js client, a Koajs RESTful api and a postgres database.

# Installation

You need docker installed on your machine

# Deployment

Server
```sh
docker-compose up --build server postgres
```
Client
```sh
docker-compose up --build client
```

# Services offered

- Clock
- Google (gmail) integration
- Animal pictures
- Jokes (taken from a big jokes database)
- Dishes pictures
- Rss reader
- World data

# Widgets

- Clock: A clock that can show the time of the day, live, for any timezone. It also offers different designs.
- Gmail: Connect to google and get your emails, updated. You can personnalize the number of emails you want, and the labels on the emails.
- Animal pictures: Get new pictures of animals every 30 second. Choose wether you want pictures of cats, dogs or foxes.
- Jokes: Get jokes, updated every minute.Jokes about programming, knock-knock jokes, and a lot of other great jokes.
- Dishes: Get pictures of dishes you love, like pizzas, and customize it to only get the ones you like, or get surprised.
- Rss reader: Put in any rss feed url and it will show you the feed, regularly updated. and you can cutomize the amount of aticles you want.
- World data: Get up-to-date data on a country, including income level, region and others

# Tech

  - Docker, Docker-compose
  - React js
  - Semantic UI 
  - Axios
  - Node js
  - Koa js

# Try the api

You can try our api by deploying it and running it in postman:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.postman.co/run-collection/bf2f34a2ef4640e9dd86)

# Online documentation

[View Diagrams on LucidChart !](https://lucid.app/lucidchart/invitations/accept/71348083-b28e-43b9-8b21-e0a9c3b1370c)
