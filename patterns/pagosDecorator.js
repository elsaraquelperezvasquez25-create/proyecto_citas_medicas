class PagoBase {
    constructor(monto) {
        this.monto = monto;
    }

    getMonto() {
        return this.monto;
    }

    getDescripcion() {
        return 'Pago normal';
    }
}

class DescuentoDecorator {
    constructor(pago) {
        this.pago = pago;
    }

    getMonto() {
        return this.pago.getMonto() * 0.9;
    }

    getDescripcion() {
        return this.pago.getDescripcion() + ' + descuento 10%';
    }
}

class RecargoDecorator {
    constructor(pago) {
        this.pago = pago;
    }

    getMonto() {
        return this.pago.getMonto() * 1.05;
    }

    getDescripcion() {
        return this.pago.getDescripcion() + ' + recargo 5%';
    }
}

module.exports = {
    PagoBase,
    DescuentoDecorator,
    RecargoDecorator
};