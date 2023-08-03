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


// Insert device to data base
func cmd_insert_device(words []string) string {
	data := map[string]string{}
	
	var address string
	var isFinded = false
	for i, val := range words {
		if strings.Contains(val, "ipaddr=") {
			address = strings.SplitAfter(words[i], "=")[1]
			fmt.Println(address)
			isFinded = true
			break
		}
	}
	if isFinded == false {
		fmt.Println("IP-адрес не указан")
		data = map[string]string{"err": "1", "msg": "IP-адрес не указан"}
	} else {
	
		words := []string{"curl", "getver", "http://" + address + "/cgi-bin/configs.cgi?"}  
		_, result := curl(words)
		
	if result != nil{
		name := fmt.Sprintf("%v", result["description"])
		version := fmt.Sprintf("%v", result["softversion"])
		mode := fmt.Sprintf("%v", result["mode"])
		
		// open database
		db := openDB()
		defer db.Close() // close database

		// insert hardcoded
		insertStmt := `insert into "objects" ("objectname", "ipaddress", "version", "mode") values($1, $2, $3, $4)`
		_, e := db.Exec(insertStmt, name, address, version, mode)
		CheckError(e)
	} else {
		// open database
		db := openDB()
		defer db.Close() // close database

		// insert hardcoded
		insertStmt := `insert into "objects" ("objectname", "ipaddress", "version", "mode") values($1, $2, $3, $4)`
		_, e := db.Exec(insertStmt, "-=[no_name]=-", address, "-=[no_version]=-", "-no-")
		CheckError(e)
	}
	
	fmt.Println("Inserted: " + address)
	

		data = map[string]string{"ipaddr": address, "err": "0", "msg": "Добавлено новое устройство IP-адрес: " + address} 
	}

	MsgBytes, err := json.Marshal(data)
	if err != nil {
		// handle err
	}
	return string(MsgBytes) + "\n"
}


// Delete device from data base
func cmd_delete_device(words []string) string {
	data := map[string]string{}
	
	var id string
	var isFinded = false
	for i, val := range words {
		if strings.Contains(val, "id=") {
			id = strings.SplitAfter(words[i], "=")[1]
			fmt.Println(id)
			isFinded = true
			break
		}
	}
	if isFinded == false {
		fmt.Println("Id не указан")
		data = map[string]string{"err": "1", "msg": "Id не указан"}
	} else {

		// open database
		db := openDB()
		defer db.Close() // close database

		// Delete
		deleteStmt := `delete from "objects" where id=$1`
		_, e := db.Exec(deleteStmt, id)
		CheckError(e)
		fmt.Println("Deleted: " + id)

		data = map[string]string{"id": id, "err": "0", "msg": "Устройство удалено"} 
	}

	MsgBytes, err := json.Marshal(data)
	if err != nil {
		// handle err
	}
	return string(MsgBytes) + "\n"
}


// Update device in data base
func cmd_update_device(words []string) string {
	data := map[string]string{}
	
	var id string
	var ipaddr string
	var isFindedId = false
	var isFindedIP = false
	for i, val := range words {
		if strings.Contains(val, "id=") {
			id = strings.SplitAfter(words[i], "=")[1]
			fmt.Println(id)
			isFindedId = true
			continue
		}
		if strings.Contains(val, "ipaddr=") {
			ipaddr = strings.SplitAfter(words[i], "=")[1]
			fmt.Println(ipaddr)
			isFindedIP = true
			continue
		}
	}
	if isFindedId == false || isFindedIP == false {
		fmt.Println("Id или IP-адрес не указан")
		data = map[string]string{"err": "1", "msg": "Id или IP-адрес не указан"}
	} else {

	words := []string{"curl", "getver", "http://" + ipaddr + "/cgi-bin/configs.cgi?"}  
	_, result := curl(words)
		
	if result != nil{
		name := fmt.Sprintf("%v", result["description"])
		version := fmt.Sprintf("%v", result["softversion"])
		
		// open database
		db := openDB()
		defer db.Close() // close database
		
		// update
		updateStmt := `update "objects" set ipaddress=$1, objectname=$2, version=$3 where id=$4`
		_, e := db.Exec(updateStmt, ipaddr, name, version, id)
		CheckError(e)

	} else {
		// open database
		db := openDB()
		defer db.Close() // close database
		
		updateStmt := `update "objects" set ipaddress=$1, objectname=$2, version=$3 where id=$4`
		_, e := db.Exec(updateStmt, ipaddr, "-=[not_device]=-", "-=[not_version]=-", id)
		CheckError(e)

	}
	
		fmt.Println("Updated: " + id)

		data = map[string]string{"id": id, "err": "0", "msg": "IP-адрес обновлен: " + ipaddr} 
	}

	MsgBytes, err := json.Marshal(data)
	if err != nil {
		// handle err
	}
	return string(MsgBytes) + "\n"
}


// Insert user to data base
func cmd_insert_user(words []string) string {
	data := map[string]string{}
	
	var name string
	var login string
	var password string
	var role string
	var isFindedName = false
	var isFindedLogin = false
	var isFindedPswd = false
	var isFindedRole = false
	for i, val := range words {
		if strings.Contains(val, "name=") {
			name = strings.SplitAfter(words[i], "=")[1]
			fmt.Println(name)
			isFindedName = true
			continue
		}
		if strings.Contains(val, "login=") {
			login = strings.SplitAfter(words[i], "=")[1]
			fmt.Println(login)
			isFindedLogin = true
			continue
		}
		if strings.Contains(val, "password=") {
			password = strings.SplitAfter(words[i], "=")[1]
			fmt.Println(password)
			isFindedPswd = true
			continue
		}
		if strings.Contains(val, "role=") {
			role = strings.SplitAfter(words[i], "=")[1]
			fmt.Println(role)
			isFindedRole = true
			continue
		}
	}
	
	if isFindedName == false || isFindedLogin == false || isFindedPswd == false || isFindedRole == false {
		fmt.Println("Не все поля заполнены")
		data = map[string]string{"err": "1", "msg": "Не все поля заполнены"}
	} else {
	
		// open database
		db := openDB()
		defer db.Close() // close database
	
	// insert hardcoded
	insertStmt := `insert into "users" ("username", "login", "pswd", "userrole") values($1, $2, $3, $4)`
	_, e := db.Exec(insertStmt, name, login, password, role)
	CheckError(e)
	
	fmt.Println("Inserted: " + login)
	

		data = map[string]string{"ipaddr": login, "err": "0", "msg": "Добавлен новый пользователь: " + login} 
	}

	MsgBytes, err := json.Marshal(data)
	if err != nil {
		// handle err
	}
	return string(MsgBytes) + "\n"
}


// Delete user from data base
func cmd_delete_user(words []string) string {
	data := map[string]string{}
	
	var id string
	var isFinded = false
	for i, val := range words {
		if strings.Contains(val, "id=") {
			id = strings.SplitAfter(words[i], "=")[1]
			fmt.Println(id)
			isFinded = true
			break
		}
	}
	if isFinded == false {
		fmt.Println("Id не указан")
		data = map[string]string{"err": "1", "msg": "Id не указан"}
	} else {

		// open database
		db := openDB()
		defer db.Close() // close database

		// Delete
		deleteStmt := `delete from "users" where id=$1`
		_, e := db.Exec(deleteStmt, id)
		CheckError(e)
		fmt.Println("Deleted: " + id)

		data = map[string]string{"id": id, "err": "0", "msg": "Пользователь удален"} 
	}

	MsgBytes, err := json.Marshal(data)
	if err != nil {
		// handle err
	}
	return string(MsgBytes) + "\n"
}


// Update user in data base
func cmd_update_user(words []string) string {
	data := map[string]string{}
	
	var id string
	var name string
	var login string
	var password string
	var role string
	var isFindedId = false
	var isFindedName = false
	var isFindedLogin = false
	var isFindedPswd = false
	var isFindedRole = false
	for i, val := range words {
		if strings.Contains(val, "id=") {
			id = strings.SplitAfter(words[i], "=")[1]
			fmt.Println(id)
			isFindedId = true
			continue
		}
		if strings.Contains(val, "name=") {
			name = strings.SplitAfter(words[i], "=")[1]
			fmt.Println(name)
			isFindedName = true
			continue
		}
		if strings.Contains(val, "login=") {
			login = strings.SplitAfter(words[i], "=")[1]
			fmt.Println(login)
			isFindedLogin = true
			continue
		}
		if strings.Contains(val, "password=") {
			password = strings.SplitAfter(words[i], "=")[1]
			fmt.Println(password)
			isFindedPswd = true
			continue
		}
		if strings.Contains(val, "role=") {
			role = strings.SplitAfter(words[i], "=")[1]
			fmt.Println(role)
			isFindedRole = true
			continue
		}
	}
	
	if isFindedId == false || isFindedName == false || isFindedLogin == false || isFindedPswd == false || isFindedRole == false {
		fmt.Println("Не все поля заполнены")
		data = map[string]string{"err": "1", "msg": "Не все поля заполнены"}
	} else {

			
		// open database
		db := openDB()
		defer db.Close() // close database
		
		// update
		updateStmt := `update "users" set username=$1, login=$2, pswd=$3, userrole=$4  where id=$5`
		_, e := db.Exec(updateStmt, name, login, password, role, id)
		CheckError(e)

		fmt.Println("Updated: " + login)

		data = map[string]string{"id": id, "err": "0", "msg": "Пользователь обновлен: " + login} 
	}

	MsgBytes, err := json.Marshal(data)
	if err != nil {
		// handle err
	}
	return string(MsgBytes) + "\n"
}



// Insert event to data base
func cmd_insert_event(words []string) string {
	data := map[string]string{}

	var object int
	var level string
	var source string
	var ident string
	var body string
	var is_check bool
	var isFindedObject = false
	var isFindedLevel = false
	var isFindedSource = false
	var isFindedIdent = false
	var isFindedBody = false
	var isFindedIs_check = false
	for i, val := range words {
		if strings.Contains(val, "object=") {
			object, _ = strconv.Atoi(strings.SplitAfter(words[i], "=")[1])
			fmt.Println(object)
			isFindedObject = true
			continue
		}
		if strings.Contains(val, "level=") {
			level = strings.SplitAfter(words[i], "=")[1]
			fmt.Println(level)
			isFindedLevel = true
			continue
		}
		if strings.Contains(val, "source=") {
			source = strings.SplitAfter(words[i], "=")[1]
			fmt.Println(source)
			isFindedSource = true
			continue
		}
		if strings.Contains(val, "ident=") {
			ident = strings.SplitAfter(words[i], "=")[1]
			fmt.Println(ident)
			isFindedIdent = true
			continue
		}
		if strings.Contains(val, "body=") {
			body = strings.SplitAfter(words[i], "=")[1]
			fmt.Println(body)
			isFindedBody = true
			continue
		}
		if strings.Contains(val, "is_check=") {
			if strings.SplitAfter(words[i], "=")[1] == "true" {
				is_check = true 
			} else {
			 	is_check = false
			}
			//is_check = strings.SplitAfter(words[i], "=")[1]
			fmt.Println(is_check)
			isFindedIs_check = true
			continue
		}
	}
	
	if isFindedObject == false || isFindedLevel == false || isFindedSource == false || isFindedIdent == false || isFindedBody == false || isFindedIs_check == false  {
		fmt.Println("Не все поля заполнены")
		data = map[string]string{"err": "1", "msg": "Не все поля заполнены"}
	} else {
		
		// open database
		db := openDB()
		defer db.Close() // close database

		// insert hardcoded
		insertStmt := `insert into "events" ("lvl", "obj_id", "src", "evnt", "body", "is_checked") values($1, $2, $3, $4, $5, $6)`
		_, e := db.Exec(insertStmt, level, object, source, ident, body, is_check)
		CheckError(e)
	
	
	fmt.Println("Inserted event: " + ident)
	

		data = map[string]string{"ident": ident, "err": "0", "msg": "Добавлено новое событие: " + ident} 
	}

	MsgBytes, err := json.Marshal(data)
	if err != nil {
		// handle err
	}
	messages <- string(MsgBytes) + "\n"
	return string(MsgBytes) + "\n"
}


// Delete event from data base
func cmd_delete_event(words []string) string {
	data := map[string]string{}
	
	var id string
	var isFinded = false
	for i, val := range words {
		if strings.Contains(val, "id=") {
			id = strings.SplitAfter(words[i], "=")[1]
			fmt.Println(id)
			isFinded = true
			break
		}
	}
	if isFinded == false {
		fmt.Println("Id не указан")
		data = map[string]string{"err": "1", "msg": "Id не указан"}
	} else {

		// open database
		db := openDB()
		defer db.Close() // close database

		// Delete
		deleteStmt := `delete from "events" where id=$1`
		_, e := db.Exec(deleteStmt, id)
		CheckError(e)
		fmt.Println("Deleted event: " + id)

		data = map[string]string{"id": id, "err": "0", "msg": "Событие удалено"} 
	}

	MsgBytes, err := json.Marshal(data)
	if err != nil {
		// handle err
	}
	return string(MsgBytes) + "\n"
}


// Update event in data base
func cmd_update_event(words []string) string {
	data := map[string]string{}
	
	var id string
	var object int
	var level string
	var source string
	var ident string
	var body string
	var is_check bool
	var isFindedId = false
	var isFindedObject = false
	var isFindedLevel = false
	var isFindedSource = false
	var isFindedIdent = false
	var isFindedBody = false
	var isFindedIs_check = false
	for i, val := range words {
		if strings.Contains(val, "id=") {
			id = strings.SplitAfter(words[i], "=")[1]
			fmt.Println(id)
			isFindedId = true
			continue
		}
		if strings.Contains(val, "object=") {
			object, _ = strconv.Atoi(strings.SplitAfter(words[i], "=")[1])
			fmt.Println(object)
			isFindedObject = true
			continue
		}
		if strings.Contains(val, "level=") {
			level = strings.SplitAfter(words[i], "=")[1]
			fmt.Println(level)
			isFindedLevel = true
			continue
		}
		if strings.Contains(val, "source=") {
			source = strings.SplitAfter(words[i], "=")[1]
			fmt.Println(source)
			isFindedSource = true
			continue
		}
		if strings.Contains(val, "ident=") {
			ident = strings.SplitAfter(words[i], "=")[1]
			fmt.Println(ident)
			isFindedIdent = true
			continue
		}
		if strings.Contains(val, "body=") {
			body = strings.SplitAfter(words[i], "=")[1]
			fmt.Println(body)
			isFindedBody = true
			continue
		}
		if strings.Contains(val, "is_check=") {
			if strings.SplitAfter(words[i], "=")[1] == "true" {
				is_check = true 
			} else {
			 	is_check = false
			}
			fmt.Println(is_check)
			isFindedIs_check = true
			continue
		}
	}
	
	if isFindedId == false || isFindedObject == false || isFindedLevel == false || isFindedSource == false || isFindedIdent == false || isFindedBody == false || isFindedIs_check == false  {
		fmt.Println("Не все поля заполнены")
		data = map[string]string{"err": "1", "msg": "Не все поля заполнены"}
	} else {

	
		
		// open database
		db := openDB()
		defer db.Close() // close database
		
		// update
		updateStmt := `update "events" set lvl=$1, obj_id=$2, src=$3, evnt=$4, body=$5, is_checked=$6  where id=$7`
		_, e := db.Exec(updateStmt, level, object, source, ident, body, is_check, id)
		CheckError(e)

	
		fmt.Println("Updated: " + ident)

		data = map[string]string{"id": id, "err": "0", "msg": "Событие обновлено: " + ident} 
	}

	MsgBytes, err := json.Marshal(data)
	if err != nil {
		// handle err
	}
	return string(MsgBytes) + "\n"
}



/*type Message struct {
	Msg string `json:"msg"`
}*/

func cmd_get_message(words []string) string {
	data := map[string]string{"msg": "⏳ ▁ ▂ ▃ ▄ ▅ ▆"} 
	MsgBytes, err := json.Marshal(data)
	if err != nil {
		// handle err
	}
	return string(MsgBytes) + "\n"
}


/*type GetDevices struct {
	Id int `json:"id"`
	Name string `json:"name"`
	IPaddr string `json:"ipaddr"`
	Version string `json:"ver"`
}*/

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
		rows.Scan(&bk.Id, &bk.Name, &bk.IPaddr, &bk.Version, &bk.PZG_VZG, &bk.GNSS, &bk.PTP)
		/*var words = []string{"curl", "getsync", "http://" + bk.IPaddr + "/cgi-bin/configs.cgi?"}  
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
		} */

		//bk.PZG_VZG = "non"
		//bk.PTP = false
		//bk.GNSS = false
		fmt.Println(bk.GNSS)


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
	mode := words[4]
	//ipaddr := r.FormValue("ipaddr")

	fmt.Println(words)
	//fmt.Println(name)
	//fmt.Println(ipaddr)

	// open database
	db := openDB()
	defer db.Close() // close database

	// update
	updateStmt := `update "objects" set objectname=$1, version=$2, mode=$3 where id=$4`
	_, e := db.Exec(updateStmt, name, version, mode, id)
	CheckError(e)
	fmt.Println("Updated " + mode)

	output = "Updated"
	
	return output
}


