package main

import (
	_ "database/sql"
	"fmt"
	_ "html/template"
	"net/http"

	_ "encoding/json"
	_ "io/ioutil"

	//"io"
	"log"

	//"os"

	_ "github.com/lib/pq"

	"encoding/gob"

	//"strings"

	_ "github.com/gorilla/sessions"
)

// DB parameters
const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "postgres"
	dbname   = "tst_db"
)

// Main
func main() {
	gob.Register(sesKey(0))

	fmt.Println("WebServer started OK")
	fmt.Println("localhost:8080")

	http.HandleFunc("/", events)
	http.HandleFunc("/insert_event", insert_event)
	http.HandleFunc("/delete_event", delete_event)
	http.HandleFunc("/update_event", update_event)

	http.HandleFunc("/devices", devices)
	http.HandleFunc("/insert_device", insert_device)
	http.HandleFunc("/delete_device", delete_device)
	http.HandleFunc("/update_device", update_device)

	http.HandleFunc("/users", users)
	http.HandleFunc("/insert_user", insert_user)
	http.HandleFunc("/delete_user", delete_user)
	http.HandleFunc("/update_user", update_user)

	http.HandleFunc("/event", add_event)

	http.HandleFunc("/login", login)
	http.HandleFunc("/logout", logout)

	//путь к папке со внешними файлами: html, js, css, изображения и т.д.
	fileServer := http.FileServer(http.Dir("scripts/"))
	http.Handle("/scripts/", http.StripPrefix("/scripts", fileServer))

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

// Errors handler
func CheckError(err error) {
	if err != nil {
		panic(err)
	}
}
