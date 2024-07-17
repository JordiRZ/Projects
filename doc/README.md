# InnoSpine

## Intro

 For surgical distribution companies specializing in advanced lumbar and cervical prosthetics for medical professionals... Moreover, giving them the possibility to borrow surgical equipment for their surgeries. 

![](https://media.giphy.com/media/3orieN5HWXAMzfZtok/giphy.gif?cid=790b7611xzh22yep0d3drgtxvdfbh98kzvbz9l8g2xrda5yg&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Functional

### Use Cases

- list surgeries (by date) 
- create surgery (choose products, set date, put a note...)
- edit surgery (request more implants, change instruments, change a note...)
- delete surgery
- list products


v0.1
- request new products
- request operations rooms for surgery (map)
- request operations rooms for surgery (hospitals list)
- rate requests list (surgeries list)
- put a date/type/name filter for surgeries
- put a calendar with colors depending the doctor and their specialitzation

[Figma](https://www.figma.com/file/88AvUHJLWYzQPLgDU4Vx6p/Innospine?type=design&node-id=0-1&mode=design&t=7sc17eAsrLbyLGuO-0)

## Technical Description


### Modules

- api (server logic)
- app (client interface)
- com (common utils, tools, ...)


### Technologies

- TypeScript
- React
- Express
- Node
- Sass
- Tailwind
- Mongo
- Moment js
- Mocha - Chai

### Data Model

#### User

- id (required) 
- name (string, required)
- email (string, required)
- password (string, required)

#### Product

- id (required)
- name (string, required)
- type (string, required)
- surgeryType (string, required)
- image (string, required)
- description (string, required)
- price (number, required)


#### Surgery

- id (required) 
- author (author.id, required; string, required)
- date (Date, required)
- creation date (Date, required)
- name (string, required)
- products ([Product.id]) 
- type (string, required)
- hospital (string, required)





