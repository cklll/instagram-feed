FROM python:3.7.2

WORKDIR /usr/src/instagram-feed/crawler

COPY . .

RUN pip install -r requirements.txt

CMD [ "python", "./run.py" ]
