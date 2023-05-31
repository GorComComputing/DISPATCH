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

// Event from JSON
type Event struct {
	Msg    string // "event"
	Level  string // "info", "warning", "alarm_on", "alarm_off"
	Id     string // 1234
	IP     string // "10.1.10.17"
	Name   string // "Poveleck"
	Source string // "system"
	Event  string // "ref_corr"
	Body   string // "qqqqqq"
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
type Events struct {
	Message  string
	UserName string
	BackLink string
	Objects  []EventFromDB
}

// Events handler
func events(w http.ResponseWriter, r *http.Request) {
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
	rows, err := db.Query(`SELECT * FROM events ORDER BY id ASC`)
	CheckError(err)
	defer rows.Close()

	var bks Events
	bks.Message = "Message"
	bks.UserName = log
	bks.BackLink = "events"
	for rows.Next() {
		bk := EventFromDB{}
		rows.Scan(&bk.Id, &bk.Level, &bk.Obj_id, &bk.Source, &bk.Event, &bk.Body, &bk.Is_checked, &bk.Time)
		bks.Objects = append(bks.Objects, bk)
	}
	CheckError(err)

	// response template
	tmpl, _ := template.ParseFiles("templates/events.html")
	w.Header().Set("Content-Type", "text/html")
	tmpl.Execute(w, bks)
}

// Insert event handler
func insert_event(w http.ResponseWriter, r *http.Request) {

}

// Delete event handler
func delete_event(w http.ResponseWriter, r *http.Request) {

}

// Update event handler
func update_event(w http.ResponseWriter, r *http.Request) {

}
