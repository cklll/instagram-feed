## How to get Instagram Post?
https://stackoverflow.com/a/33783840

## Set up
The link (https://www.instagram.com/9gag/?__a=1) requires you to have logged in first

##### Slution
* Log in the instagram account with your browser
* In developer console, copy the request cookie to the `run.py` in the relevant part

## Running the crawler
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
