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

// Object from DB
type Object struct {
	Name   string
	IPaddr string
	Id     int
}
type Devices struct {
	Message  string
	UserName string
	BackLink string
	Objects  []Object
}

// Devices handler
func devices(w http.ResponseWriter, r *http.Request) {
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
	rows, err := db.Query(`SELECT * FROM objects ORDER BY id ASC`)
	CheckError(err)
	defer rows.Close()

	//bks := []Object{}
	var bks Devices
	bks.Message = "Message"
	bks.UserName = log
	bks.BackLink = "devices"
	for rows.Next() {
		bk := Object{}
		rows.Scan(&bk.Id, &bk.Name, &bk.IPaddr)
		bks.Objects = append(bks.Objects, bk)
	}
	CheckError(err)

	// response template
	tmpl, _ := template.ParseFiles("templates/devices.html")
	w.Header().Set("Content-Type", "text/html")
	tmpl.Execute(w, bks)
}

// Insert device handler
func insert_device(w http.ResponseWriter, r *http.Request) {
	// parameters from POST
	backLink := r.FormValue("backLink")

	name := r.FormValue("name")
	address := r.FormValue("ipaddr")
	fmt.Printf("Name = %s\n", name)
	fmt.Printf("Address = %s\n", address)
	//fmt.Fprintf(w, "Name = %s\n", name)
	//fmt.Fprintf(w, "Address = %s\n", address)

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
	insertStmt := `insert into "objects"("objectname", "ipaddress") values($1, $2)`
	_, e := db.Exec(insertStmt, name, address)
	CheckError(e)
	fmt.Println("Inserted")
	//fmt.Fprintf(w, "Inserted")

	http.Redirect(w, r, backLink, http.StatusSeeOther)
}

// Delete device handler
func delete_device(w http.ResponseWriter, r *http.Request) {
	// parameters from POST
	id := r.FormValue("id")

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
	//fmt.Println(id)

	// Delete
	deleteStmt := `delete from "objects" where id=$1`
	_, e := db.Exec(deleteStmt, id)
	CheckError(e)
	fmt.Println("Deleted")

	http.Redirect(w, r, "/devices", http.StatusSeeOther)
}

// Update device handler
func update_device(w http.ResponseWriter, r *http.Request) {
	// parameters from POST
	id := r.FormValue("id")
	name := r.FormValue("name")
	ipaddr := r.FormValue("ipaddr")

	//fmt.Println(id)
	//fmt.Println(name)
	//fmt.Println(ipaddr)

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
	//fmt.Println(id)

	// update
	updateStmt := `update "objects" set ipaddress=$1, objectname=$2  where id=$3`
	_, e := db.Exec(updateStmt, ipaddr, name, id)
	CheckError(e)
	fmt.Println("Updated")

	http.Redirect(w, r, "/devices", http.StatusSeeOther)
}
