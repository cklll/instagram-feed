## Crawler
Main tool used: https://github.com/rarcega/instagram-scraper

Using docker is optional, you may use virtual environment or installing directly in the machine. Directly working in host machine will make moving the files easier.

#### Build docker image
```bash
docker build . -t instagram-crawler
```

#### Running the crawler
The step is not really automated but since we only need to get the posts once, so I will leave it like this for now
```bash
docker run -it instagram-crawler /bin/bash
instagram-scraper 9gag --login-user <USERNAME> --login-pass <PASSWORD> --maximum 100 --destination /usr/src/instagram-feed/crawler/data --media-types image video --media-metadata
# change 9gag to any other user you want to scrape

# open a new terminal in host machine
docker ps # get container id
docker cp <CONTAINER_ID>:/usr/src/instagram-feed/crawler/data/ ./

# In host machine
mv data/*.jpg ../web-spa-nextjs/public/resources/instagram/
mv data/*.mp4 ../web-spa-nextjs/public/resources/instagram/
```

#### Process crawled data
```bash
docker run -it instagram-crawler /bin/bash
python process.py "/resources/instagram/" "" # see below remarks

# open a new terminal in host machine
docker ps # get container id
docker cp <CONTAINER_ID>:/usr/src/instagram-feed/crawler/data/processed/data.json ./data/processed/
```

**Remarks**: first argument `"/resources/instagram/"` is the media url prefix and second argument is postfix.
* Run the above line can make local development works.
* If the file is stored somewhere else such as Firebase, use `python process.py "https://firebasestorage.googleapis.com/v0/b/instagra-feed.appspot.com/o/" "?alt=media"`


#### TODO
* Automate crawler
