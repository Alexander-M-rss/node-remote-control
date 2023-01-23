# RSSchool NodeJS websocket task
> Static http server works on the 8181 port. 
> By default WebSocket client tries to connect to the 8080 port. 
> WebSocket server works on the 8080 port.

`Only two commands (mouse_position and prnt_scrn)` require an answer according to **the task assigments** and `only they` are visible in the history on front-end application. `All commands` logged in back-end console. If the screenshot crosses the screen border, then the screenshot region is set from this border to avoid nutjs library error `Given width exceeds display dimensions / Given heigth exceeds display dimensions`. Such behavior does not violate the **the task assigments**.

`Только две команды (mouse_position b prnt_scrn)` требуют ответа в соответствии с **ТЗ** и `только они` видны в истории во фронт-енд приложении. `Все команды` логируются в консоли бэк-енд приложения. Если скриншот пересекает границу экрана, то область скриншота устанавливается от этой границы, чтобы избежать ошибки библиотеки nutjs `Given width exceeds display dimensions / Given heigth exceeds display dimensions`. Такое поведение не протеворечит **ТЗ**.

## Installation
1. Clone/download repo
2. `npm install`

## Usage
**Development**

`npm run start:dev`

* App served @ `http://localhost:8181` with nodemon

**Production**

`npm run start`

* App served @ `http://localhost:8181` without nodemon

---

**All commands**

Command | Description
--- | ---
`npm run start:dev` | App served @ `http://localhost:8181` with nodemon
`npm run start` | App served @ `http://localhost:8181` without nodemon

**Note**: replace `npm` with `yarn` in `package.json` if you use yarn.
