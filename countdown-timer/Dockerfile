FROM python:3.12-slim

RUN mkdir /app
WORKDIR /app

COPY requirements.txt .
COPY src/ .

RUN pip install -r requirements.txt


CMD [ "flask", "--app", "app", "--debug", "run", "--host=0.0.0.0" ]