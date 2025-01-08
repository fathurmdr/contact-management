package db

import (
	"fmt"
	"log"

	"github.com/fathurmdr/backend/go/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Init() {
	cfg := config.LoadConfig()

	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		cfg.DBHost, cfg.DBPort, cfg.DBUser, cfg.DBPassword, cfg.DBName)

	var err error
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Error opening database: %v", err)
	}

	sqlDB, err := DB.DB()
	if err != nil {
		log.Fatalf("Error getting SQL DB: %v", err)
	}
	err = sqlDB.Ping()
	if err != nil {
		log.Fatalf("Error connecting to the database: %v", err)
	}

	log.Println("Successfully connected to the database")
}

func Close() {
	sqlDB, err := DB.DB()
	if err != nil {
		log.Fatalf("Error getting SQL DB: %v", err)
	}

	err = sqlDB.Close()
	if err != nil {
		log.Fatalf("Error closing database: %v", err)
	}
	log.Println("Database connection closed")
}
