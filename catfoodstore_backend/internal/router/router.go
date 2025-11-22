package router

import (
	"database/sql"
	"net/http"

	"catfoodstore_backend/internal/handler"
	"catfoodstore_backend/internal/middleware"
	"catfoodstore_backend/internal/repository"
	"catfoodstore_backend/internal/service"

	"github.com/gin-gonic/gin"
)

func New(db *sql.DB) *gin.Engine {
	r := gin.New()

	r.Use(middleware.Logger())
	r.Use(middleware.Recover())

	r.GET("/health", func(c *gin.Context) {
		if err := db.Ping(); err != nil {
			c.JSON(http.StatusServiceUnavailable, gin.H{"status": "unhealthy"})
			return
		}
		c.JSON(200, gin.H{"status": "ok"})
	})

	repo := repository.NewProductRepository(db)
	svc := service.NewProductService(repo)
	h := handler.NewProductHandler(svc)
	h.RegisterRoutes(r)

	return r
}