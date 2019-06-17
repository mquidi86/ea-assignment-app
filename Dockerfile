FROM node:10

ENV PORT=8000

EXPOSE 7000

EXPOSE 8000

COPY * /app/

CMD ["npm", "install"]

CMD ["npm", "start"]
