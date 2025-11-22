package main

import (
	"log"

	"catfoodstore_backend/configs"
	"catfoodstore_backend/internal/database"
	"catfoodstore_backend/internal/router"
)

func main() {
	cfg := configs.LoadConfig()

	db, err := database.NewPostgresDB(cfg)
	if err != nil {
		log.Fatal("db error:", err)
	}
	defer db.Close()

	r := router.New(db)

	addr := ":" + cfg.AppPort
	log.Println("🚀 Backend running at", addr)

	if err := r.Run(addr); err != nil {
		log.Fatal("server error:", err)
	}
}
