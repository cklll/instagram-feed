## Web application
This is the web application part of the project that display the crawled data.

#### Develop
```bash
docker-compose up --build --force-recreate
```
For Docker for Mac, check the following service is running,
* `kibana` at http://localhost:5601/
* `elasticsearch` at http://localhost:9200/
* `web app` at http://localhost:3000/

If http://localhost:3000/ is not responding, it is probably elasticsearch takes some time to start and the server is not able to connect it during start up. Current workaround is to to open `server.js` or other `.js` file and save it again to trigger nodemon to reload the server

#### Load seed data
Copy the crawled data
```bash
cp ../crawler/data/processed/data.json elasticsearch/seed/
# this will remove the existing post index and import the seed data
docker-compose run web_spa_nextjs node elasticsearch/seed/import.js

#### Test
```bash
docker-compose run web_spa_nextjs sh -c "yarn --production=false && npm run lint"
```

#### Hot Ranking System reference
* https://www.reddit.com/r/explainlikeimfive/comments/1u0q4s/eli5_difference_between_best_hot_and_top_on_reddit/
* https://github.com/reddit-archive/reddit/blob/753b17407e9a9dca09558526805922de24133d53/r2/r2/lib/db/_sorts.pyx#L47


#### TODO
* UI (e.g. sticky header, album)
* Production build, currently `yarn install` is using development config and `next build` is not used to optimized
* Use css in js or sass, include normalize.css, bootstrap, etc
* Create a config file (e.g. Instagram url prefix)
* Caption \n is not replaced with <br>
* Use Nginx or CDN to serve static file (e.g. images and videos)
* Redis to cache result
* Change `web-spa-nextjs` to something simpler e.g. `web-app`, `spa` since I think it is already sufficient to understand
