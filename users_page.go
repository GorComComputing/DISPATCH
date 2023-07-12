package main

import (
	"fmt"
	"html/template"
	"net/http"
)

// Page fields
type UsersPage struct {
	Message  string
	UserName string
	BackLink string
	CurPage  int
	PrevPage int
	NextPage int
	Objects  []UserFromDB
}

// Users handler
func users(w http.ResponseWriter, r *http.Request) {
	// Pagination
	var rowPerPage int = 5
	page := r.URL.Query().Get("page")
	page_int, offset := pagination(rowPerPage, page)

	// open database
	db := openDB()
	defer db.Close() // close database

	// select query
	rows, err := db.Query(`SELECT * FROM users ORDER BY id ASC LIMIT $1 OFFSET $2`, rowPerPage, offset)
	CheckError(err)
	defer rows.Close()

	// Set page fields
	var bks UsersPage
	bks.Message = "Message"
	bks.UserName = check_cookies(w, r)
	bks.BackLink = "users"
	bks.CurPage = page_int
	bks.PrevPage = page_int - 1
	bks.NextPage = page_int + 1
	for rows.Next() {
		bk := UserFromDB{}
		rows.Scan(&bk.Id, &bk.UserName, &bk.Login, &bk.Pswd, &bk.UserRole)
		bks.Objects = append(bks.Objects, bk)
	}
	CheckError(err)

	// Response template
	tmpl, _ := template.ParseFiles("www/users.html")
	w.Header().Set("Content-Type", "text/html")
	tmpl.Execute(w, bks)
}

// Insert user handler
func insert_user(w http.ResponseWriter, r *http.Request) {
	// parameters from POST
	backLink := r.FormValue("backLink")

	name := r.FormValue("name")
	log := r.FormValue("login")
	password := r.FormValue("password")
	role := r.FormValue("role")

	// open database
	db := openDB()
	defer db.Close() // close database

	// insert hardcoded
	insertStmt := `insert into "users" ("username", "login", "pswd", "userrole") values($1, $2, $3, $4)`
	_, e := db.Exec(insertStmt, name, log, password, role)
	CheckError(e)
	fmt.Println("Inserted")

	http.Redirect(w, r, backLink, http.StatusSeeOther)
}

// Delete user handler
func delete_user(w http.ResponseWriter, r *http.Request) {
	// parameters from POST
	id := r.FormValue("id")

	// open database
	db := openDB()
	defer db.Close() // close database

	// Delete
	deleteStmt := `delete from "users" where id=$1`
	_, e := db.Exec(deleteStmt, id)
	CheckError(e)
	fmt.Println("Deleted")

	http.Redirect(w, r, "/users", http.StatusSeeOther)
}

// Update user handler
func update_user(w http.ResponseWriter, r *http.Request) {
	// parameters from POST
	id := r.FormValue("id")
	name := r.FormValue("name")
	log := r.FormValue("login")
	password := r.FormValue("password")
	role := r.FormValue("role")

	// open database
	db := openDB()
	defer db.Close() // close database

	// update
	updateStmt := `update "users" set username=$1, login=$2, pswd=$3, userrole=$4  where id=$5`
	_, e := db.Exec(updateStmt, name, log, password, role, id)
	CheckError(e)
	fmt.Println("Updated")

	http.Redirect(w, r, "/users", http.StatusSeeOther)
}
