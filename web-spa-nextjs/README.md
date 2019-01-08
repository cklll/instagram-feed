## Web application
This is the web application part of the project that display the crawled data.

#### Develop
```bash
docker-compose up -d --build
```
For Docker for Mac, check the following service is running,
* `kibana` at http://localhost:5601/
* `elasticsearch` at http://localhost:9200/
* `web app` at http://localhost:3000/

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
* Change `web-spa-nextjs` to something simpler e.g. `web-app`, `spa` since I think it is already sufficient to understand
* UI
* Create a config file (e.g. Instagram url prefix)
* Caption \n is not replaced with <br>
