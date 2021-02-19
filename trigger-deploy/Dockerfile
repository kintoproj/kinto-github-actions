FROM kintohub/kinto-cli:latest
WORKDIR /app
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]
