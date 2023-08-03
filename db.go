package main

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq" // driver postgres
)

// DB connect parameters
const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "postgres"
	dbname   = "tst_db"
)

// User from DB
type UserFromDB struct {
	Id       int
	UserName string
	Login    string
	Pswd     string
	UserRole int
}

// Object from DB
type ObjectFromDB struct {
	Version string
	Name   	string
	IPaddr 	string
	Id     	int
	GNSS	 string
	PTP	 string
	PZG_VZG string
}

// Event from DB
type EventFromDB struct {
	Id         int
	Level      string
	Obj_id     int
	Source     string
	Event      string
	Body       string
	Is_checked bool
	Time       string
}

// Open database
func openDB() *sql.DB {
	psqlconn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	db, err := sql.Open("postgres", psqlconn)
	CheckError(err)

	// check db
	err = db.Ping()
	CheckError(err)
	fmt.Println("PostgreSQL connected OK")
	return db
}
