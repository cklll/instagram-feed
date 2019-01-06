## Api Server
```bash
docker-compose up -d --build
```

For Docker for Mac, check the following service is running,
* `kibana` at http://localhost:5601/
* `elasticsearch` at http://localhost:9200/
* `api` at http://localhost:3010/

#### Load seed data
Copy the crawled data
```bash
cp ../crawler/data/processed/data.json elasticsearch/seed/

# this will remove the existing post index and import the seed data
docker-compose run api node elasticsearch/seed/import.js
```

#### Test
TODO

#### TODO
* Eslint
* nodemon
* redis
