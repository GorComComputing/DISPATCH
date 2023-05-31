package main

import (
	"database/sql"
	"fmt"
	"html/template"
	"net/http"

	_ "encoding/json"
	_ "io/ioutil"

	//"io"
	_ "log"

	//"os"

	_ "github.com/lib/pq"

	_ "encoding/gob"

	//"strings"

	_ "github.com/gorilla/sessions"
)

// User from DB
type UserFromDB struct {
	Id       int
	UserName string
	Login    string
	Pswd     string
	UserRole int
}
type Users struct {
	Message  string
	UserName string
	BackLink string
	Objects  []UserFromDB
}

// Users handler
func users(w http.ResponseWriter, r *http.Request) {
	// cookie
	ses, err := cookieStore.Get(r, cookieName)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	log, ok := ses.Values[sesKeyLogin].(string)
	if !ok {
		log = ""
	}

	// open database
	psqlconn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	db, err := sql.Open("postgres", psqlconn)
	CheckError(err)
	defer db.Close() // close database

	// check db
	err = db.Ping()
	CheckError(err)
	fmt.Println("PostgreSQL connected OK")

	// select query
	rows, err := db.Query(`SELECT * FROM users ORDER BY id ASC`)
	CheckError(err)
	defer rows.Close()

	var bks Users
	bks.Message = "Message"
	bks.UserName = log
	bks.BackLink = "users"
	for rows.Next() {
		bk := UserFromDB{}
		rows.Scan(&bk.Id, &bk.UserName, &bk.Login, &bk.Pswd, &bk.UserRole)
		bks.Objects = append(bks.Objects, bk)
	}
	CheckError(err)

	// response template
	tmpl, _ := template.ParseFiles("templates/users.html")
	w.Header().Set("Content-Type", "text/html")
	tmpl.Execute(w, bks)
}

// Insert user handler
func insert_user(w http.ResponseWriter, r *http.Request) {

}

// Delete user handler
func delete_user(w http.ResponseWriter, r *http.Request) {

}

// Update user handler
func update_user(w http.ResponseWriter, r *http.Request) {

}
