package main

import (
    //"fmt"
    "os"
)

	
type Cmd struct {
	addr 	func([]string) string
	descr string     
}

// Command list for interpretator
var cmd =  map[string]Cmd{ 
	"tst": Cmd{addr: cmd_tst, descr: "Test command"},
	"ls": Cmd{addr: cmd_ls, descr: "Test command: print all file names from catalog (ls)"},

	"run": Cmd{addr: cmd_run, descr: "Test command: run process "},
	
	"curl": Cmd{addr: cmd_curl, descr: "Make JSON request to the device and return struct"},
	"curls": Cmd{addr: cmd_curls, descr: "Make JSON request to the device and return string"},
	"curlj": Cmd{addr: cmd_curl_json, descr: "Make JSON request to the device and return JSON"},
	"curl_get": Cmd{addr: cmd_curl_get, descr: "Make GET request to the device and return response"},
	
	
	"updatedev": Cmd{addr: cmd_updatedev, descr: "Update information about device into DB"},
	
	".quit": Cmd{addr: cmd_quit, descr: "Exit from this program"},
	".help": Cmd{addr: cmd_help, descr: "Print this Help"},
	
	"get_msg": Cmd{addr: cmd_get_message, descr: "Give Message to client"},
	"get_dev": Cmd{addr: cmd_get_devices, descr: "Give devices from data base to client"},
	"get_usr": Cmd{addr: cmd_get_users, descr: "Give users from data base to client"},
	"get_evnt": Cmd{addr: cmd_get_events, descr: "Give events from data base to client"},
	
	"ins_dev": Cmd{addr: cmd_insert_device, descr: "Insert device to data base from client"},
	"del_dev": Cmd{addr: cmd_delete_device, descr: "Delete device from data base from client"},
	"upd_dev": Cmd{addr: cmd_update_device, descr: "Update device in data base from client"},
	
	"ins_usr": Cmd{addr: cmd_insert_user, descr: "Insert user to data base from client"},
	"del_usr": Cmd{addr: cmd_delete_user, descr: "Delete user from data base from client"},
	"upd_usr": Cmd{addr: cmd_update_user, descr: "Update user in data base from client"},
	
	"ins_evnt": Cmd{addr: cmd_insert_event, descr: "Insert event to data base from client"},
	"del_evnt": Cmd{addr: cmd_delete_event, descr: "Delete event from data base from client"},
	"upd_evnt": Cmd{addr: cmd_update_event, descr: "Update event in data base from client"},
	
}



// Interpretator 
func interpretator(words []string) string {
	if _, ok := cmd[words[0]]; ok {
		return cmd[words[0]].addr(words)
	} else{
		return "Unknown command: " + words[0] + "\n"
	}
}


// HELP - Print command list
var cmd_print = make(map[string]Cmd)
func cmd_help(words []string) string {
	var output string
	for key, val := range cmd_print {
		output += key 
		for i := len(key); i < 10; i++ {
			output += " "
		} 
		output += " - " + val.descr + "\n"
	}
	return output
}


// Exit from this program
func cmd_quit(words []string) string {
	os.Exit(0)
	return ""
}


