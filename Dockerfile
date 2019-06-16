FROM aws/codebuild/standard:2.0-1.10.0

ENV PORT=80

EXPOSE $PORT

COPY app.js /app/

CMD ["node", "/app/app.js"]
