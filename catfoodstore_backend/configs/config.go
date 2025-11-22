package configs

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type Config struct {
	AppPort     string
	DatabaseURL string
}

func LoadConfig() *Config {
	// โหลด .env ถ้ามี
	_ = godotenv.Load()

	cfg := &Config{
		AppPort:     getEnv("PORT", "8080"),
		DatabaseURL: getEnv("DATABASE_URL", ""),
	}

	log.Printf("config loaded: %+v\n", cfg)
	return cfg
}

func getEnv(key, def string) string {
	if v, ok := os.LookupEnv(key); ok && v != "" {
		return v
	}
	return def
}
