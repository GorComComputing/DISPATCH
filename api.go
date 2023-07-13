package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	
	"strings"
)



// /api handler
func http_pars(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)	// enable CORS
	
	// parameters from POST or GET
        r.ParseForm()
	words := []string{}

	for param, values := range r.Form {   	  // range over map
  		for _, value := range values {    // range over []string
     			if param == "cmd" {
				words = strings.Fields(value)
			} else {
				words = append(words, string(param) + "=" + string(value))
			}
  		}
	}
	out := interpretator(words)
	if len(out) > 0 {
		fmt.Fprintf(w, out)
	}
}


// Enable CORS
func enableCors(w *http.ResponseWriter) {
        (*w).Header().Set("Access-Control-Allow-Origin", "*")
}



// Event from JSON
type EventFromJSON struct {
	Msg    string // "event"
	Level  string // "info", "warning", "alarm_on", "alarm_off"
	Id     string // 1234
	IP     string // "10.1.10.17"
	Name   string // "Poveleck"
	Source string // "system"
	Event  string // "ref_corr"
	Body   string // "qqqqqq"
}

// Event handler
func add_event(w http.ResponseWriter, r *http.Request) {

	// Parsing JSON
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	fmt.Println(string(body))
	var evnt EventFromJSON
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

	// open database
	db := openDB()
	defer db.Close() // close database

	// insert hardcoded
	insertStmt := `insert into "events"("lvl", "obj_id", "src", "evnt", "body") values($1, $2, $3, $4, $5)`
	_, e := db.Exec(insertStmt, evnt.Level, evnt.Id, evnt.Source, evnt.Event, evnt.Body)
	CheckError(e)
	fmt.Println("Inserted Event")
}
