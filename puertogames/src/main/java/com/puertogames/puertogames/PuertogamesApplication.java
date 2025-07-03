package com.puertogames.puertogames;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Clase principal que inicia la aplicación Spring Boot de Puerto Games
// Contiene el método main que arranca el servidor y la configuración de Spring
@SpringBootApplication
public class PuertogamesApplication {

	public static void main(String[] args) {
		SpringApplication.run(PuertogamesApplication.class, args); // Inicia la aplicación
	}

}
