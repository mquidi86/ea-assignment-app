FROM node:10

ENV PORT=8000

EXPOSE 7000

EXPOSE 8000

COPY . /app/

WORKDIR /app

RUN npm install

CMD ["npm", "start"]
