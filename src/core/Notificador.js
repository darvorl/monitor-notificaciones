import NotificadorWhatsApp from "../strategies/NotificadorWhatsApp.js";
import NotificadorEmail from "../strategies/NotificadorEmail.js";
import NotificadorPush from "../strategies/NotificadorPush.js";

/**
 * Clase Contexto del patrón Strategy
 * Orquesta el envío de notificaciones según el tipo de evento
 * Permite combinar múltiples canales sin usar if/else gigantes
 */
class Notificador {
  constructor() {
    // Registro de estrategias disponibles
    this.estrategias = {
      whatsapp: new NotificadorWhatsApp(),
      email: new NotificadorEmail(),
      push: new NotificadorPush(),
    };

    // Configuración de canales por tipo de evento
    // Esto permite combinar canales de forma declarativa
    this.configEventos = {
      promocion: ["whatsapp", "email"],
      stock_minimo: ["push"],
      mantenimiento: ["email", "push"],
      nuevo_pedido: ["whatsapp", "push"],
      confirmacion_compra: ["email", "whatsapp"],
      alerta_seguridad: ["email", "push", "whatsapp"],
    };
  }

  /**
   * Registra una nueva estrategia de notificación
   * Esto permite agregar nuevos canales sin modificar código existente (Open/Closed Principle)
   * @param {string} nombre - Nombre del canal (sms, in-app, etc.)
   * @param {INotificador} estrategia - Instancia de la estrategia
   */
  registrarEstrategia(nombre, estrategia) {
    this.estrategias[nombre] = estrategia;
    console.log(`✅ Nueva estrategia registrada: ${nombre}`);
  }

  /**
   * Configura qué canales usar para un tipo de evento específico
   * @param {string} tipoEvento - Nombre del evento
   * @param {string[]} canales - Array de nombres de canales
   */
  configurarEvento(tipoEvento, canales) {
    this.configEventos[tipoEvento] = canales;
    console.log(
      `✅ Evento configurado: ${tipoEvento} -> [${canales.join(", ")}]`
    );
  }

  /**
   * Obtiene los canales configurados para un tipo de evento
   * @param {string} tipoEvento - Tipo de evento
   * @returns {string[]} Array de nombres de canales
   */
  obtenerCanalesParaEvento(tipoEvento) {
    return this.configEventos[tipoEvento] || [];
  }

  /**
   * Envía una notificación usando los canales apropiados según el tipo de evento
   * @param {Notificacion} notificacion - Objeto con los datos de la notificación
   */
  notificar(notificacion) {
    console.log("\n" + "=".repeat(60));
    console.log(`🚀 MOTOR DE NOTIFICACIONES - ChaMarket`);
    console.log("=".repeat(60));
    console.log(`📌 Tipo de evento: ${notificacion.tipo}`);

    // Obtener canales configurados para este tipo de evento
    const canales = this.obtenerCanalesParaEvento(notificacion.tipo);

    if (canales.length === 0) {
      console.log("⚠️  No hay canales configurados para este tipo de evento");
      console.log("💡 Tip: Use configurarEvento() para definir los canales");
      return;
    }

    console.log(`📡 Canales a usar: [${canales.join(", ")}]`);

    // Enviar por cada canal configurado
    canales.forEach((canal) => {
      const estrategia = this.estrategias[canal];

      if (estrategia) {
        estrategia.notificar(notificacion);
      } else {
        console.log(`\n⚠️  Canal "${canal}" no está registrado`);
      }
    });

    console.log("\n" + "=".repeat(60));
    console.log("✅ Proceso de notificación completado");
    console.log("=".repeat(60) + "\n");
  }

  /**
   * Envía una notificación usando canales específicos (modo manual)
   * @param {Notificacion} notificacion - Objeto con los datos de la notificación
   * @param {string[]} canales - Array de canales a usar
   */
  notificarPorCanales(notificacion, canales) {
    console.log("\n" + "=".repeat(60));
    console.log(`🚀 MOTOR DE NOTIFICACIONES - Modo Manual`);
    console.log("=".repeat(60));
    console.log(`📡 Canales seleccionados: [${canales.join(", ")}]`);

    canales.forEach((canal) => {
      const estrategia = this.estrategias[canal];

      if (estrategia) {
        estrategia.notificar(notificacion);
      } else {
        console.log(`\n⚠️  Canal "${canal}" no está registrado`);
      }
    });

    console.log("\n" + "=".repeat(60));
    console.log("✅ Proceso de notificación completado");
    console.log("=".repeat(60) + "\n");
  }

  /**
   * Muestra todas las estrategias registradas
   */
  listarEstrategias() {
    console.log("\n📋 Estrategias registradas:");
    Object.keys(this.estrategias).forEach((nombre) => {
      console.log(`  - ${nombre}`);
    });
  }

  /**
   * Muestra la configuración de eventos
   */
  listarConfiguracionEventos() {
    console.log("\n⚙️  Configuración de eventos:");
    Object.entries(this.configEventos).forEach(([evento, canales]) => {
      console.log(`  ${evento}: [${canales.join(", ")}]`);
    });
  }
}

export default Notificador;
