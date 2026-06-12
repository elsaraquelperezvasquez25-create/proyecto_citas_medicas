class PagoTarjeta {
    procesar(monto) {
        return {
            metodo_pago: 'Tarjeta',
            monto,
            estado: 'Pagado',
            mensaje: 'Pago procesado con tarjeta'
        };
    }
}

class PagoYape {
    procesar(monto) {
        return {
            metodo_pago: 'Yape',
            monto,
            estado: 'Pagado',
            mensaje: 'Pago procesado con Yape'
        };
    }
}

class PagoEfectivo {
    procesar(monto) {
        return {
            metodo_pago: 'Efectivo',
            monto,
            estado: 'Pendiente',
            mensaje: 'Pago pendiente en efectivo'
        };
    }
}

class PagoFactory {
    static crearPago(tipo) {
        if (tipo === 'Tarjeta') return new PagoTarjeta();
        if (tipo === 'Yape') return new PagoYape();
        if (tipo === 'Efectivo') return new PagoEfectivo();

        throw new Error('Método de pago no válido');
    }
}

module.exports = PagoFactory;