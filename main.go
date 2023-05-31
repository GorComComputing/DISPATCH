package main

import (
	"encoding/gob"
	"fmt"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "ПриветW!")
	fmt.Printf("ПриветW!")
}

func main() {
	check_https_serts() // Check HTTPS serts

	gob.Register(sesKey(0))

	// Page routs
	http.HandleFunc("/", events)

	http.HandleFunc("/events", events)
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

	http.HandleFunc("/login", login)
	http.HandleFunc("/logout", logout)

	// API routs
	http.HandleFunc("/event", add_event)

	// Resource files routs (js, css)
	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("./css"))))
	http.Handle("/scripts/", http.StripPrefix("/scripts/", http.FileServer(http.Dir("./scripts"))))

	fmt.Println("WebServer started OK")
	fmt.Println("Try http://localhost:8080")
	fmt.Println("or https://localhost:443")
	go http.ListenAndServeTLS(":443", "cert.pem", "key.pem", nil)
	http.ListenAndServe(":8080", nil)
	// for redirect http to https
	//http.ListenAndServe(":8080", http.HandlerFunc(redirectToHttps))
}
