package database

import (
    "database/sql"
    "fmt"
    "log"

    "catfoodstore_backend/configs"

    _ "github.com/lib/pq"
)

func NewPostgresDB(cfg *configs.Config) (*sql.DB, error) {

    if cfg.DatabaseURL == "" {
        return nil, fmt.Errorf("DATABASE_URL is empty")
    }

    db, err := sql.Open("postgres", cfg.DatabaseURL)
    if err != nil {
        return nil, fmt.Errorf("open db: %w", err)
    }

    if err := db.Ping(); err != nil {
        return nil, fmt.Errorf("ping db: %w", err)
    }

    log.Println("✅ Connected to PostgreSQL")
    return db, nil
}
