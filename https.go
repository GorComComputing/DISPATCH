package main

import (
	"fmt"
	"net/http"

	"github.com/kabukky/httpscerts"
)

// Check HTTPS serts
func check_https_serts() {
	// Проверяем, доступен ли cert файл
	err := httpscerts.Check("cert.pem", "key.pem")
	// Если он недоступен, то генерируем новый
	if err != nil {
		err = httpscerts.Generate("cert.pem", "key.pem", "127.0.0.1:443")
		if err != nil {
			fmt.Println("Ошибка: Не может сгенерировать https сертификат")
		} else {
			fmt.Println("Serts generated OK")
		}
	} else {
		fmt.Println("Serts OK")
	}
}

// Redirect HTTP to HTTPS
func redirectToHttps(w http.ResponseWriter, r *http.Request) {
	// Перенаправляем входящий HTTP запрос. Учтите,
	// что "127.0.0.1:443" работает только для вашей локальной машины
	http.Redirect(w, r, "https://127.0.0.1:443"+r.RequestURI,
		http.StatusMovedPermanently)
}
