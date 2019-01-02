# instagram-feed

## Web application
```bash
docker-compose up -d --build
```
For Docker for Mac, it should be serving at http://localhost:3000/

## Test
```bash
docker-compose run web_spa_nextjs sh -c "yarn --production=false && npm run lint"
```

## Api Server
TODO

## Crawler
Refer to https://github.com/cklll/instagram-feed/tree/master/crawler

## TODO
CI for testing
