package com.puertogames.puertogames.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

// Entidad que representa un videojuego en la base de datos
// Incluye atributos como nombre, género, plataforma, calificación, etc.
@Entity
@Table(name = "juegos")
public class Juego {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Identificador único del juego

    private String nombre; // Nombre del juego
    private String genero; // Género del juego
    private String plataforma; // Plataforma disponible
    private Double calificacion; // Calificación promedio
    private String descripcion; // Descripción del juego
    private String imagenUrl; // URL de la imagen del juego
    private String fechaLanzamiento; // Fecha de lanzamiento
    private String desarrollador; // Desarrollador del juego
    private Double precio; // Precio del juego
    private Integer stock; // Stock disponible
    private String idioma; // Idioma del juego

    // Getters y setters para todos los atributos

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public String getPlataforma() {
        return plataforma;
    }

    public void setPlataforma(String plataforma) {
        this.plataforma = plataforma;
    }

    public Double getCalificacion() {
        return calificacion;
    }

    public void setCalificacion(Double calificacion) {
        this.calificacion = calificacion;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getImagenUrl() {
        return imagenUrl;
    }

    public void setImagenUrl(String imagenUrl) {
        this.imagenUrl = imagenUrl;
    }

    public String getFechaLanzamiento() {
        return fechaLanzamiento;
    }

    public void setFechaLanzamiento(String fechaLanzamiento) {
        this.fechaLanzamiento = fechaLanzamiento;
    }

    public String getDesarrollador() {
        return desarrollador;
    }

    public void setDesarrollador(String desarrollador) {
        this.desarrollador = desarrollador;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getIdioma() {
        return idioma;
    }

    public void setIdioma(String idioma) {
        this.idioma = idioma;
    }
}
