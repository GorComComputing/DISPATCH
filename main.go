package main

import (
	"fmt"
	"net/http"
	"log"
	"strings"
	"encoding/gob"
	
    	"os"
    	"bufio"
)


type Handler struct {
	fileServer http.Handler
}

var exit_status bool = true	// false = exit


func main() {
	var cmd_line string
	var words = make([]string, len(os.Args)-1)

	// pars command line args
	if len(os.Args) > 1 {

		// TUI mode
		if os.Args[1] == "-w"{
                        fmt.Println("Window")
                        os.Exit(0)
                }

        	copy(words[0:], os.Args[1:])
                exit_status = false
                
        	out := interpretator(words)
		if len(out) > 0 {
			fmt.Print(out)
		}
        	
		os.Exit(0)
	}





	check_https_serts() // Check HTTPS serts

	gob.Register(sesKey(0))

	fmt.Println("WebServer started OK")
	fmt.Println("Try http://localhost:8085")
	fmt.Println("or https://localhost:443")
	go http.ListenAndServeTLS(":443", "cert.pem", "key.pem", nil)
	//http.ListenAndServe(":8085", nil)
	// for redirect http to https
	//http.ListenAndServe(":8080", http.HandlerFunc(redirectToHttps))
	
	go http.ListenAndServe(":8085", &Handler{
		fileServer: http.FileServer(http.Dir("www")),
	})
	
	// start shell
	for exit_status {
		fmt.Print("WS> ")
		// ввод строки с пробелами
    		scanner := bufio.NewScanner(os.Stdin)
    		scanner.Scan()
    		cmd_line = scanner.Text()
    		// разбиение на подстроки по пробелу
    		words = strings.Fields(cmd_line)

		out := interpretator(words)
		if len(out) > 0 {
			fmt.Print(out)
		}
	}
}

func cmd_quit(words []string) string {
	exit_status = false
	return ""
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
	
	if strings.Trim(r.URL.Path, "/") == "api" {
		http_pars(w, r)
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
