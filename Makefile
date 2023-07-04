.PHONY: main
main: *.go deps
	GOOS=linux GOARCH=arm go build -o main .


.PHONY:deps
deps:
	go get github.com/gorilla/sessions
	go get github.com/kabukky/httpscerts
	go get github.com/lib/pq
#	go get golang.org/x/text/encoding
#	go get golang.org/x/text/encoding/unicode






