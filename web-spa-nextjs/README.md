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

#### Hot Ranking System reference
* https://www.reddit.com/r/explainlikeimfive/comments/1u0q4s/eli5_difference_between_best_hot_and_top_on_reddit/
* https://github.com/reddit-archive/reddit/blob/753b17407e9a9dca09558526805922de24133d53/r2/r2/lib/db/_sorts.pyx#L47


#### TODO
* Change `web-spa-nextjs` to something simpler e.g. `web-app`, `spa` since I think it is already sufficient to understand
* UI
