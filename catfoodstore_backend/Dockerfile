# ======================
# Build Stage
# ======================
FROM golang:1.25.4 AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o main ./cmd/main.go


# ======================
# Run Stage
# ======================
FROM alpine:latest

RUN apk --no-cache add ca-certificates curl

WORKDIR /root

COPY --from=builder /app/main .

EXPOSE 8080
CMD ["./main"]
