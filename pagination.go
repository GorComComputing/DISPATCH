package main

import (
	"fmt"
	"strconv"
)

// Pagination
func pagination(rowPerPage int, page string) (int, string) {
	//var rowPerPage int = 5
	//page := r.URL.Query().Get("page")
	if page == "" || page == "0" {
		page = "1"
	}
	page_int, err := strconv.Atoi(page)
	fmt.Println(strconv.Itoa(page_int))
	CheckError(err)
	offset := strconv.Itoa((page_int - 1) * rowPerPage)
	return page_int, offset
}
