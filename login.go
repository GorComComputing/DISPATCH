package main

import (
	"database/sql"
	"fmt"
	_ "html/template"
	"net/http"

	_ "encoding/json"
	_ "io/ioutil"

	//"io"
	_ "log"

	//"os"

	_ "github.com/lib/pq"

	_ "encoding/gob"

	//"strings"

	"github.com/gorilla/sessions"
)

// For Login
var cookieStore = sessions.NewCookieStore([]byte("secret"))

const cookieName = "MyCookie"

type sesKey int

const (
	sesKeyLogin sesKey = iota
)

// Users handler
func login(w http.ResponseWriter, r *http.Request) {
	// parameters from POST
	backLink := r.FormValue("backLink")

	log := r.FormValue("login")
	pass := r.FormValue("password")

	fmt.Println(log)
	fmt.Println(pass)

	psqlconn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)

	// open database
	db, err := sql.Open("postgres", psqlconn)
	CheckError(err)
	defer db.Close() // close database

	// check db
	err = db.Ping()
	CheckError(err)
	fmt.Println("PostgreSQL connected OK")

	// select query
	rows, err := db.Query(`SELECT * FROM users`)
	CheckError(err)
	defer rows.Close()

	for rows.Next() {
		bk := UserFromDB{}
		rows.Scan(&bk.Id, &bk.UserName, &bk.Login, &bk.Pswd, &bk.UserRole)

		fmt.Println(bk.Login)
		fmt.Println(bk.Pswd)

		if string(bk.Login) == string(log) && bk.Pswd == pass {
			ses, err := cookieStore.Get(r, cookieName)
			if err != nil {
				http.Error(w, err.Error(), http.StatusBadRequest)
				return
			}

			ses.Values[sesKeyLogin] = log
			err = cookieStore.Save(r, w, ses)
			if err != nil {
				http.Error(w, err.Error(), http.StatusBadRequest)
				return
			}

			break
		}
	}
	CheckError(err)
	http.Redirect(w, r, backLink, http.StatusSeeOther)

}

// LogOut handler
func logout(w http.ResponseWriter, r *http.Request) {
	backLink := r.FormValue("backLink")

	for _, v := range r.Cookies() {
		c := http.Cookie{
			Name:   v.Name,
			MaxAge: -1}
		http.SetCookie(w, &c)
	}
	http.Redirect(w, r, backLink, http.StatusSeeOther)
}
