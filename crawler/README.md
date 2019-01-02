## Crawler
Main tool used: https://github.com/rarcega/instagram-scraper

#### Running the crawler
The step is not really automated but since we only need to get the posts once, so I will leave it like this for now
```bash
docker build -t instagram-crawler
instagram-scraper 9gag --login-user <USERNAME> --login-pass <PASSWORD> --maximum 100 --destination /usr/src/instagram-feed/crawler/data --media-types none --media-metadata
# change 9gag to any other user you want to scrape

docker build -t instagram-crawler
docker run -it instagram-crawler /bin/bash
docker ps # get container id
docker cp <CONTAINER_ID>:/usr/src/instagram-feed/crawler/data/9gag.json  ./data
# change 9gag to any other user you have scraped
```

#### TODO
* Automate crawler
