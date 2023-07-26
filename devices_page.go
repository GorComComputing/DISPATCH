package main

import (
	"fmt"
	"html/template"
	"net/http"
	"strings"
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

// Devices handler
func devices(w http.ResponseWriter, r *http.Request) {
	// Pagination
	var rowPerPage int = 10
	page := r.URL.Query().Get("page")
	page_int, offset := pagination(rowPerPage, page)

	// open database
	db := openDB()
	defer db.Close() // close database

	// select query
	rows, err := db.Query(`SELECT * FROM objects  ORDER BY id ASC LIMIT $1 OFFSET $2`, rowPerPage, offset)
	CheckError(err)
	defer rows.Close()

	// Set page fields
	var bks DevicesPage
	//bks.Message = "⏳ ▁ ▂ ▃ ▄ ▅ ▆"// ⏳ ⌛  ⌚ ⏰ ⏱ ⏲ 🕰 🕛 🕧 🕐 🕜 🕑 🕝 🕒 🕞 🕓 🕟 🕔 🕠 🕕 🕡 🕖 🕢 🕗 🕣 🕘 🕤 🕙 🕥 🕚 🕦 "
	bks.UserName = check_cookies(w, r)
	bks.BackLink = "devices"
	bks.CurPage = page_int
	bks.PrevPage = page_int - 1
	bks.NextPage = page_int + 1
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

		
		bks.Objects = append(bks.Objects, bk)
	}
	CheckError(err)

	// Response template
	tmpl, _ := template.ParseFiles("www/devices.html")
	w.Header().Set("Content-Type", "text/html")
	tmpl.Execute(w, bks)
}

// Insert device handler
func insert_device(w http.ResponseWriter, r *http.Request) {
	// parameters from POST
	backLink := r.FormValue("backLink")

	//name := r.FormValue("name")
	address := r.FormValue("ipaddr")
	fmt.Printf("Address = %s\n", address)
	
	
	words := []string{"curl", "getver", "http://" + address + "/cgi-bin/configs.cgi?"}  
	_, result := curl(words)
		
	if result != nil{
		name := fmt.Sprintf("%v", result["description"])
		version := fmt.Sprintf("%v", result["softversion"])
		
		// open database
		db := openDB()
		defer db.Close() // close database

		// insert hardcoded
		insertStmt := `insert into "objects" ("objectname", "ipaddress", "version") values($1, $2, $3)`
		_, e := db.Exec(insertStmt, name, address, version)
		CheckError(e)
	} else {
		// open database
		db := openDB()
		defer db.Close() // close database

		// insert hardcoded
		insertStmt := `insert into "objects" ("objectname", "ipaddress", "version") values($1, $2, $3)`
		_, e := db.Exec(insertStmt, "-=[not_device]=-", address, "-=[not_version]=-")
		CheckError(e)
	}
	
	fmt.Println("Inserted")
	
	http.Redirect(w, r, backLink, http.StatusSeeOther)
}

// Delete device handler
func delete_device(w http.ResponseWriter, r *http.Request) {
	// parameters from POST
	id := r.FormValue("id")

	// open database
	db := openDB()
	defer db.Close() // close database

	// Delete
	deleteStmt := `delete from "objects" where id=$1`
	_, e := db.Exec(deleteStmt, id)
	CheckError(e)
	fmt.Println("Deleted")

	http.Redirect(w, r, "/devices", http.StatusSeeOther)
}

// Update device handler
func update_device(w http.ResponseWriter, r *http.Request) {
	// parameters from POST
	id := r.FormValue("id")
	//name := r.FormValue("name")
	ipaddr := r.FormValue("ipaddr")

	//fmt.Println(id)
	//fmt.Println(name)
	//fmt.Println(ipaddr)
	
	
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

		// insert hardcoded
		/*insertStmt := `insert into "objects" ("objectname", "ipaddress", "version") values($1, $2, $3)`
		_, e := db.Exec(insertStmt, name, address, version)
		CheckError(e)*/
	} else {
		// open database
		db := openDB()
		defer db.Close() // close database
		
		updateStmt := `update "objects" set ipaddress=$1, objectname=$2, version=$3 where id=$4`
		_, e := db.Exec(updateStmt, ipaddr, "-=[not_device]=-", "-=[not_version]=-", id)
		CheckError(e)

		// insert hardcoded
		/*insertStmt := `insert into "objects" ("objectname", "ipaddress") values($1, $2)`
		_, e := db.Exec(insertStmt, "-=[not_device]=-", address)
		CheckError(e)*/
	}
	
	fmt.Println("Updated")

	http.Redirect(w, r, "/devices", http.StatusSeeOther)
}
