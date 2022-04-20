## Start Frontend

```
cd frontend/
npm install
npm run start
```

## Start Backend on Docker

```
cd backend/
docker build . --tag django-chat
docker run -p 8000:8080 -d django-chat
```

## Stop Backend on Docker

```
docker ps
docker stop <ID>
```

## Rest API Docs

https://documenter.getpostman.com/view/3996315/UVyysCNK
