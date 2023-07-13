package main

import (
    //"fmt"
)


// Command list for interpretator
var cmd =  map[string]func([]string)string{
	"tst": cmd_tst,
	"ls": cmd_ls,
	"quit": cmd_quit,
	"run": cmd_run,
	
	"curl": cmd_curl,
	

}



// Interpretator 
func interpretator(words []string) string {
	if _, ok := cmd[words[0]]; ok {
		return cmd[words[0]](words)
	} else{
		return "Unknown command: " + words[0] + "\n"
	}
}


