## Web application
This is the front end web application part of the project.

#### Develop
```bash
docker-compose up -d --build
```
For Docker for Mac, it should be serving at http://localhost:3000/

#### Test
```bash
docker-compose run web_spa_nextjs sh -c "yarn --production=false && npm run lint"
```

#### TODO
* Change `web-spa-nextjs` to something simpler e.g. `web-app`, `spa` since I think it is already sufficient to understand
* UI
