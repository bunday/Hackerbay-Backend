# HackerBay.io Backend Interview

Solution to HackerBay.io Backend Test.

## Local Setup

After cloning, run the following commands:

```bash
npm install
cp .env.example .env
npm run dev
```
This will install the necessary packages and start the application will start at <http://localhost:4000.>

For Test and Test Coverage, run the following commands:
```bash
npm test
npm run test-coverage
```
Docker Image can be built with:
```bash
docker-compose build
docker-compose up
```

Available API Endpoints:
```bash
/api/login body: (username,password)
/api/patch body: (content,operation)
/api/thumbnail body: (link)
```


## LICENSE

[MIT](LICENSE)