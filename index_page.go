package main

import (
	//"fmt"
	"html/template"
	"net/http"
	//"strings"
)

// Page fields
type DevicesPage struct {
	//Message  string
	UserName string
	BackLink string
	CurPage  int
	PrevPage int
	NextPage int
	Objects  []ObjectFromDB
}

// Index Page handler
func index_page(w http.ResponseWriter, r *http.Request) {
	// Set page fields
	var bks DevicesPage
	bks.UserName = check_cookies(w, r)
	bks.BackLink = "/"

	// Response template
	tmpl, _ := template.ParseFiles("www/index.html")
	w.Header().Set("Content-Type", "text/html")
	tmpl.Execute(w, bks)
	
	//messages <- "{\"msg\": \"Start\"}"
}

