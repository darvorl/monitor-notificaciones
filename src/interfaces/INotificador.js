/**
 * Interfaz Notificador (Strategy Pattern)
 * Define el contrato que deben cumplir todas las estrategias de notificación
 */
class INotificador {
  /**
   * Método abstracto que debe ser implementado por cada estrategia concreta
   * @param {Notificacion} notificacion - Objeto con los datos de la notificación
   * @throws {Error} Si no se implementa en la clase hija
   */
  notificar(notificacion) {
    throw new Error(
      "El método notificar() debe ser implementado por la clase concreta"
    );
  }
}

export default INotificador;
