package main

import (
    "fmt"
    "os/exec"
    "strings"
    "net/http"
    "io/ioutil"
    "unicode"
    
    "bytes"
    "encoding/json"
    "strconv"
)


func cmd_tst(words []string) string {
	for idx, word := range words {
		fmt.Printf("Word %d is: %s\n", idx, word)
	}
	return ""
}


type Message struct {
	Msg string `json:"msg"`
}

func cmd_get_message(words []string) string {
	data := Message{"⏳ ▁ ▂ ▃ ▄ ▅ ▆"} 
	MsgBytes, err := json.Marshal(data)
	if err != nil {
		// handle err
	}
	return string(MsgBytes) + "\n"
}


type GetDevices struct {
	Id int `json:"id"`
	Name string `json:"name"`
	IPaddr string `json:"ipaddr"`
	Version string `json:"ver"`
}

// Удаляет пробелы из строки справа
func trimRightSpace(s string) string {
    return strings.TrimRightFunc(s, unicode.IsSpace)
}


func cmd_get_devices(words []string) string {
	// Pagination
	var rowPerPage int = 10;
	rowPerPage, _ = strconv.Atoi(words[2]);
	page := words[1]
	_, offset := pagination(rowPerPage, page)

	// open database
	db := openDB()
	defer db.Close() // close database

	// select query
	rows, err := db.Query(`SELECT * FROM objects  ORDER BY id ASC LIMIT $1 OFFSET $2`, rowPerPage, offset)
	CheckError(err)
	defer rows.Close()

	// Set page fields
	var bks []ObjectFromDB
	for rows.Next() {
		bk := ObjectFromDB{}
		rows.Scan(&bk.Id, &bk.Name, &bk.IPaddr, &bk.Version)
		var words = []string{"curl", "getsync", "http://" + bk.IPaddr + "/cgi-bin/configs.cgi?"}  
		_, result := curl(words)
	
		if result != nil{
			gnss := fmt.Sprintf("%v", result["gnss"])
			if gnss == "ON" {
				bk.GNSS = true
			} else {
				bk.GNSS = false
			}
			ptp := fmt.Sprintf("%v", result["ptp"])
			if ptp == "ON" {
				bk.PTP = true
			} else {
				bk.PTP = false
			}
		} else {
			bk.PTP = false
			bk.GNSS = false
		}
		
		words = []string{"curl", "getver", "http://" + bk.IPaddr + "/cgi-bin/configs.cgi?"}  
		_, result = curl(words)
		
		if result != nil{
			bk.PZG_VZG = strings.ToLower(fmt.Sprintf("%v", result["mode"]))
		} 

		bk.Version = trimRightSpace(bk.Version)
		bks = append(bks, bk)
	}
	CheckError(err)

	//fmt.Println(bks)
	

	data := bks//GetDevices{bks[0].Id, bks[0].Name, bks[0].IPaddr, bks[0].Version} 
	MsgBytes, err := json.Marshal(data)
	if err != nil {
		// handle err
	}
	
	return string(MsgBytes) + "\n"
}


type GetUsers struct {
	Id int `json:"id"`
	UserName string `json:"username"`
	Login string `json:"login"`
	Pswd string `json:"pswd"`
	UserRole int `json:"userrole"`
}


func cmd_get_users(words []string) string {
	// Pagination
	var rowPerPage int = 10;
	rowPerPage, _ = strconv.Atoi(words[2]);
	page := words[1]
	_, offset := pagination(rowPerPage, page)

	// open database
	db := openDB()
	defer db.Close() // close database

	// select query
	rows, err := db.Query(`SELECT * FROM users ORDER BY id ASC LIMIT $1 OFFSET $2`, rowPerPage, offset)
	CheckError(err)
	defer rows.Close()
	
	// Set page fields
	var bks []UserFromDB
	for rows.Next() {
		bk := UserFromDB{}
		rows.Scan(&bk.Id, &bk.UserName, &bk.Login, &bk.Pswd, &bk.UserRole)
		//bk.Version = trimRightSpace(bk.Version)
		bks = append(bks, bk)
	}
	CheckError(err)

	//fmt.Println(bks)
	

	data := bks//GetDevices{bks[0].Id, bks[0].Name, bks[0].IPaddr, bks[0].Version} 
	MsgBytes, err := json.Marshal(data)
	if err != nil {
		// handle err
	}
	
	return string(MsgBytes) + "\n"
}


type GetEvents struct {
	Id int `json:"id"`
	Level string `json:"level"`
	Obj_id int `json:"obj_id"`
	Source string `json:"source"`
	Event int `json:"event"`
	Body string `json:"body"`
	Is_checked bool `json:"is_checked"`
	Time string `json:"time"`
}


func cmd_get_events(words []string) string {
	// Pagination
	var rowPerPage int = 10;
	rowPerPage, _ = strconv.Atoi(words[2]);
	page := words[1]
	_, offset := pagination(rowPerPage, page)

	// open database
	db := openDB()
	defer db.Close() // close database

	// select query
	rows, err := db.Query(`SELECT * FROM events ORDER BY id ASC LIMIT $1 OFFSET $2`, rowPerPage, offset)
	CheckError(err)
	defer rows.Close()
	
	// Set page fields
	var bks []EventFromDB
	for rows.Next() {
		bk := EventFromDB{}
		rows.Scan(&bk.Id, &bk.Level, &bk.Obj_id, &bk.Source, &bk.Event, &bk.Body, &bk.Is_checked, &bk.Time)
		//bk.Version = trimRightSpace(bk.Version)
		bks = append(bks, bk)
	}
	CheckError(err)

	//fmt.Println(bks)
	

	data := bks//GetDevices{bks[0].Id, bks[0].Name, bks[0].IPaddr, bks[0].Version} 
	MsgBytes, err := json.Marshal(data)
	if err != nil {
		// handle err
	}
	
	return string(MsgBytes) + "\n"
}


func cmd_ls(words []string) string {
	if len(words) < 2 {
		fmt.Println("Too little parameters")
	} else {
		cmd := exec.Command(words[0], words[1])
		out, err := cmd.Output()
		if err != nil {
			fmt.Println("could not run command: ", err)
		}
		fmt.Println(string(out))
	}
	return ""
}


// Выполнить команду
func cmd_run(words []string) string {
	run_cmd := words[1]
	if len(words) > 2 {
		copy(words[0:], words[2:])
		words = words[:len(words)-2]
		
		cmd := exec.Command(run_cmd, words...)
		out, _ := cmd.Output()
		/*if err != nil {
			fmt.Println("could not run command: ", err)
		}*/
		//fmt.Println(string(out))
		return string(out)
	} else {
		cmd := exec.Command(run_cmd)
		out, _ := cmd.Output()
		/*if err != nil {
			fmt.Println("could not run command: ", err)
		}*/
		//fmt.Println(string(out))
		return string(out)
	}
}




// Generated by curl-to-Go: https://mholt.github.io/curl-to-go

// curl -X POST -d '{"cmd":"getconfig"}' -H "Content-Type: application/json" http://192.168.1.206/cgi-bin/configs.cgi?
//

type Payload struct {
	Cmd string `json:"cmd"`
}


// команда curl
func cmd_curl(words []string) string {
	var output string

	output, result := curl(words)
	
	if output != "Request FAIL\n" {
		output = ""
		for key, val := range result {
			str := fmt.Sprintf("%v", val)
			output += string(key) + ": " + str + "\n"
		}
	}

	/* output, res := curl(words)
	
	str := fmt.Sprintf("%v", res["mode"])
	output += "\n" + str */

	return output 
}


// команда curl json
func cmd_curl_json(words []string) string {


	var output string
	var result map[string]any
	
	data := Payload{words[1]} //"getconfig"
	
	payloadBytes, err := json.Marshal(data)
	if err != nil {
		// handle err
	}
	
	body := bytes.NewReader(payloadBytes)

	req, err := http.NewRequest("POST", words[2], body) //"http://192.168.1.206/cgi-bin/configs.cgi?"
	if err != nil {
		output = "Request FAIL\n"
		return output
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)

	if err != nil {
		output = "Request FAIL\n"
		return output
	}
	defer resp.Body.Close()

	body_resp, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		output = "Request FAIL\n"
		return output
	}
	
	json.Unmarshal(body_resp, &result)
	

	


	return string(body_resp) 
}

// команда curls - возвращает набор параметров
func cmd_curls(words []string) string {
	var output string

	output, _ = curl(words)
	
	/*str := fmt.Sprintf("%v", result["mode"])
	output += "\n" + str*/

	return output 
}

// полная функция curl (возвращает string и map)
func curl(words []string) (string, map[string]any) {
	var output string
	var result map[string]any
	
	data := Payload{words[1]} //"getconfig"
	
	payloadBytes, err := json.Marshal(data)
	if err != nil {
		// handle err
	}
	
	body := bytes.NewReader(payloadBytes)

	req, err := http.NewRequest("POST", words[2], body) //"http://192.168.1.206/cgi-bin/configs.cgi?"
	if err != nil {
		output = "Request FAIL\n"
		return output, nil
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)

	if err != nil {
		output = "Request FAIL\n"
		return output, nil
	}
	defer resp.Body.Close()

	body_resp, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		output = "Request FAIL\n"
		return output, nil
	}
	
	json.Unmarshal(body_resp, &result)
	
	/*for key, val := range result {
		str := fmt.Sprintf("%v", val)
		output += string(key) + ": " + str + "\n"
	}*/
	
	output = string(body_resp)

	return output, result 
}

// Update device handler
func cmd_updatedev(words []string) string{
	var output string
	// parameters from POST
	id := words[1]
	name := words[2]
	version := words[3]
	//ipaddr := r.FormValue("ipaddr")

	fmt.Println(words)
	//fmt.Println(name)
	//fmt.Println(ipaddr)

	// open database
	db := openDB()
	defer db.Close() // close database

	// update
	updateStmt := `update "objects" set objectname=$1, version=$2 where id=$3`
	_, e := db.Exec(updateStmt, name, version, id)
	CheckError(e)
	fmt.Println("Updated")

	output = "Updated"
	
	return output
}


