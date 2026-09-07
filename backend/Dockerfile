FROM golang:1.22-alpine AS build
WORKDIR /app
COPY . .
RUN go build -o server ./cmd/server

FROM alpine:latest
RUN adduser -D -g '' appuser
COPY --from=build /app/server /server
USER appuser
EXPOSE 8080
ENTRYPOINT ["/server"]