//@ts-nocheck

import logic from '../logic'

function parseDate(dateStr) {
    // Dividir la cadena en sus componentes
    const [day, month, yearHour] = dateStr.split("/")
    const [year, hourMinute] = yearHour.split(",")

    // Parsear los componentes en enteros
    const dayInt = parseInt(day)
    const monthInt = parseInt(month) - 1 // Meses son base cero en JavaScript
    const yearInt = parseInt(year)
    const [hour, minute] = hourMinute.split(":")
    const hourInt = parseInt(hour)
    const minuteInt = parseInt(minute)

    // Crear un nuevo objeto Date con los componentes parseados
    const parsedDate = new Date(yearInt, monthInt, dayInt, hourInt, minuteInt)

    // Verificar si la fecha es válida
    if (isNaN(parsedDate.getTime())) {
        // La fecha no es válida, devolver null
        return null
    } else {
        // La fecha es válida, devolver el objeto Date
        return parsedDate
    }
}

// Ejemplo de uso
const surgeryDateStr = surgery.surgeryDate
const surgeryDate = parseDate(surgeryDateStr)

if (surgeryDate !== null) {
    console.log("Fecha de cirugía parseada:", surgeryDate)
} else {
    console.error("Fecha de cirugía inválida")
}