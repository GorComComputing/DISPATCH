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
	
	
	/*for _, val := range words {
    			fmt.Println(val)
		}*/
	
	
		isUnion := false
    		union := ""
    		var count []int
    		var length []int
    		var Unions []string
    		for i, val := range words {
    			if (val[0] == 39 && val[len(val)-1] != 39) || (val[0] == 39 && len(val) == 1) && isUnion != true {
    				isUnion = true
    				union += val[1:] + " "
    				count = append(count, i)
    				continue
    			}
    			if val[len(val)-1] != 39 && isUnion == true {
    				union += val + " "
    				continue
    			}
    			if val[len(val)-1] == 39 {
    				isUnion = false
    				union += val[:len(val)-1]
    				length = append(length, i - count[len(count)-1])
    				Unions = append(Unions, union)
    				union = ""
    				continue
    			}
    		}
    		
    		
    		x := 0
    		for i, val := range count {
    			words[val+x] = Unions[i] 
    			copy(words[val+x+1:], words[val+length[i]+1:])
    			x -= length[i]
		}
		words = words[:len(words)+x]
		
		/*for _, val := range words {
    			fmt.Println("-"+val)
		}*/
	
	
	
	out := interpretator(words)
	if len(out) > 0 {
		fmt.Fprintf(w, out)
	}
}


// Event handler
func json_pars(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)	// enable CORS
	
	// Parsing JSON
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	fmt.Println(string(body))
	var req map[string]string
	err = json.Unmarshal(body, &req)
	if err != nil {
		panic(err)
	}
	fmt.Println(req)
	words := []string{}
	if req["cmd"] != "" {
		fmt.Println("CMD")
		words = strings.Fields(req["cmd"])
		for param, value := range req {    // range over []string
     			if param != "cmd" {
				//fmt.Println("2")
				words = append(words, string(param) + "=" + string(value))
			}
  		}
	} else {
		fmt.Println("not CMD")
		for param, value := range req {    // range over []string
				//fmt.Println("2")
				words = append(words, string(param) + "=" + string(value))

  		}
	}
	
  	fmt.Println(words)
  	
  	isUnion := false
    		union := ""
    		var count []int
    		var length []int
    		var Unions []string
    		for i, val := range words {
    			if (val[0] == 39 && val[len(val)-1] != 39) || (val[0] == 39 && len(val) == 1) && isUnion != true {
    				isUnion = true
    				union += val[1:] + " "
    				count = append(count, i)
    				continue
    			}
    			if val[len(val)-1] != 39 && isUnion == true {
    				union += val + " "
    				continue
    			}
    			if val[len(val)-1] == 39 {
    				isUnion = false
    				union += val[:len(val)-1]
    				length = append(length, i - count[len(count)-1])
    				Unions = append(Unions, union)
    				union = ""
    				continue
    			}
    		}
    		
    		
    		x := 0
    		for i, val := range count {
    			words[val+x] = Unions[i] 
    			copy(words[val+x+1:], words[val+length[i]+1:])
    			x -= length[i]
		}
		words = words[:len(words)+x]
		
		/*for _, val := range words {
    			fmt.Println("-"+val)
		}*/
	
	
	
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
