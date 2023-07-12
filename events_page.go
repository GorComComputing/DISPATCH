package main

import (
	"fmt"
	"html/template"
	"net/http"
)

// Page fields
type EventsPage struct {
	Message  string
	UserName string
	BackLink string
	CurPage  int
	PrevPage int
	NextPage int
	Objects  []EventFromDB
}

// Events handler
func events(w http.ResponseWriter, r *http.Request) {
	// Pagination
	var rowPerPage int = 5
	page := r.URL.Query().Get("page")
	page_int, offset := pagination(rowPerPage, page)

	// open database
	db := openDB()
	defer db.Close() // close database

	// select query
	rows, err := db.Query(`SELECT * FROM events ORDER BY id ASC LIMIT $1 OFFSET $2`, rowPerPage, offset)
	CheckError(err)
	defer rows.Close()

	// Set page fields
	var bks EventsPage
	bks.Message = "Message"
	bks.UserName = check_cookies(w, r)
	bks.BackLink = "events"
	bks.CurPage = page_int
	bks.PrevPage = page_int - 1
	bks.NextPage = page_int + 1
	for rows.Next() {
		bk := EventFromDB{}
		rows.Scan(&bk.Id, &bk.Level, &bk.Obj_id, &bk.Source, &bk.Event, &bk.Body, &bk.Is_checked, &bk.Time)
		bks.Objects = append(bks.Objects, bk)
	}
	CheckError(err)

	// Response template
	tmpl, _ := template.ParseFiles("www/events.html")
	w.Header().Set("Content-Type", "text/html")
	tmpl.Execute(w, bks)
}

// Insert event handler
func insert_event(w http.ResponseWriter, r *http.Request) {
	// parameters from POST
	backLink := r.FormValue("backLink")

	//time := r.FormValue("time")
	object := r.FormValue("object")
	level := r.FormValue("level")
	source := r.FormValue("source")
	ident := r.FormValue("ident")
	body := r.FormValue("body")
	is_check := r.FormValue("is_check")

	// open database
	db := openDB()
	defer db.Close() // close database

	// insert hardcoded
	insertStmt := `insert into "events" ("lvl", "obj_id", "src", "evnt", "body", "is_checked") values($1, $2, $3, $4, $5, $6)`
	_, e := db.Exec(insertStmt, level, object, source, ident, body, is_check)
	CheckError(e)
	fmt.Println("Inserted")

	http.Redirect(w, r, backLink, http.StatusSeeOther)
}

// Delete event handler
func delete_event(w http.ResponseWriter, r *http.Request) {
	// parameters from POST
	id := r.FormValue("id")

	// open database
	db := openDB()
	defer db.Close() // close database

	// Delete
	deleteStmt := `delete from "events" where id=$1`
	_, e := db.Exec(deleteStmt, id)
	CheckError(e)
	fmt.Println("Deleted")

	http.Redirect(w, r, "/events", http.StatusSeeOther)
}

// Update event handler
func update_event(w http.ResponseWriter, r *http.Request) {
	// parameters from POST
	id := r.FormValue("id")
	//time := r.FormValue("time")
	object := r.FormValue("object")
	level := r.FormValue("level")
	source := r.FormValue("source")
	ident := r.FormValue("ident")
	body := r.FormValue("body")
	is_check := r.FormValue("is_check")

	// open database
	db := openDB()
	defer db.Close() // close database

	// update
	updateStmt := `update "events" set lvl=$1, obj_id=$2, src=$3, evnt=$4, body=$5, is_checked=$6  where id=$7`
	_, e := db.Exec(updateStmt, level, object, source, ident, body, is_check, id)
	CheckError(e)
	fmt.Println("Updated")

	http.Redirect(w, r, "/events", http.StatusSeeOther)
}
