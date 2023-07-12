package main

import (
	"fmt"
	"net/http"
	"log"
	"strings"
	"encoding/gob"
)


type Handler struct {
	fileServer http.Handler
}


func main() {
	check_https_serts() // Check HTTPS serts

	gob.Register(sesKey(0))

	// Page routs
	/*http.HandleFunc("/", events)

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
	http.HandleFunc("/event", add_event)*/

	// Resource files routs (js, css)
	//http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("./css"))))
	//http.Handle("/scripts/", http.StripPrefix("/scripts/", http.FileServer(http.Dir("./scripts"))))

	fmt.Println("WebServer started OK")
	fmt.Println("Try http://localhost:8085")
	fmt.Println("or https://localhost:443")
	go http.ListenAndServeTLS(":443", "cert.pem", "key.pem", nil)
	//http.ListenAndServe(":8085", nil)
	// for redirect http to https
	//http.ListenAndServe(":8080", http.HandlerFunc(redirectToHttps))
	
	http.ListenAndServe(":8085", &Handler{
		fileServer: http.FileServer(http.Dir("www")),
	})
}


// Роутер
func (h *Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	log.Printf("%v %v", r.Method, r.URL.Path)
	// need to serve shell via websocket?
	if strings.Trim(r.URL.Path, "/") == "shell" {
		onShell(w, r)
		return
	}
	
	if strings.Trim(r.URL.Path, "/") == "" {
		events(w, r)
		return
	}
	
	if strings.Trim(r.URL.Path, "/") == "events" {
		events(w, r)
		return
	}
	
	if strings.Trim(r.URL.Path, "/") == "insert_event" {
		insert_event(w, r)
		return
	}
	
	if strings.Trim(r.URL.Path, "/") == "delete_event" {
		delete_event(w, r)
		return
	}
	
	if strings.Trim(r.URL.Path, "/") == "update_event" {
		update_event(w, r)
		return
	}
	
	if strings.Trim(r.URL.Path, "/") == "devices" {
		devices(w, r)
		return
	}
	
	if strings.Trim(r.URL.Path, "/") == "insert_device" {
		insert_device(w, r)
		return
	}
	
	if strings.Trim(r.URL.Path, "/") == "delete_device" {
		delete_device(w, r)
		return
	}
	
	if strings.Trim(r.URL.Path, "/") == "update_device" {
		update_device(w, r)
		return
	}
	
	if strings.Trim(r.URL.Path, "/") == "users" {
		users(w, r)
		return
	}
	
	if strings.Trim(r.URL.Path, "/") == "insert_user" {
		insert_user(w, r)
		return
	}
	
	if strings.Trim(r.URL.Path, "/") == "delete_user" {
		delete_user(w, r)
		return
	}
	
	if strings.Trim(r.URL.Path, "/") == "update_user" {
		update_user(w, r)
		return
	}
	
	if strings.Trim(r.URL.Path, "/") == "login" {
		login(w, r)
		return
	}
	
	if strings.Trim(r.URL.Path, "/") == "logout" {
		logout(w, r)
		return
	}
	// API routs
	if strings.Trim(r.URL.Path, "/") == "event" {
		add_event(w, r)
		return
	}
	
		
	// serve static assets from 'static' dir:
	h.fileServer.ServeHTTP(w, r)
}
