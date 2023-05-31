package main

import (
	"database/sql"
	"fmt"
	_ "html/template"
	"net/http"

	"encoding/json"
	"io/ioutil"

	//"io"
	_ "log"

	//"os"

	_ "github.com/lib/pq"

	_ "encoding/gob"

	//"strings"

	_ "github.com/gorilla/sessions"
)

// Event handler
func add_event(w http.ResponseWriter, r *http.Request) {

	// Parsing JSON
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	fmt.Println(string(body))
	var evnt Event
	err = json.Unmarshal(body, &evnt)
	if err != nil {
		panic(err)
	}
	fmt.Println(evnt.Msg)
	fmt.Println(evnt.Level)
	fmt.Println(evnt.Id)
	fmt.Println(evnt.IP)
	fmt.Println(evnt.Name)
	fmt.Println(evnt.Source)
	fmt.Println(evnt.Event)
	fmt.Println(evnt.Body)

	// connection string
	psqlconn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	// open database
	db, err := sql.Open("postgres", psqlconn)
	CheckError(err)
	defer db.Close() // close database

	// check db
	err = db.Ping()
	CheckError(err)
	fmt.Println("PostgreSQL connected OK")

	// insert hardcoded
	insertStmt := `insert into "events"("lvl", "obj_id", "src", "evnt", "body") values($1, $2, $3, $4, $5)`
	_, e := db.Exec(insertStmt, evnt.Level, evnt.Id, evnt.Source, evnt.Event, evnt.Body)
	CheckError(e)
	fmt.Println("Inserted Event")

}
