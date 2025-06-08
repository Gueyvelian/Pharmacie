export default class Command {
    constructor (commandName, medications, medicationQuantity) {
        this._id = Date.now() + Math.floor(Math.random()*10)
        this.commandName = commandName;
        this.medications = medications;
        this.medicationQuantity = medicationQuantity;
    }


    get commandName() {
        return this._commandName;
    }

    set commandName(value) {
        this._commandName = value;
    }


    get medication() {
        return this._medications;
    }

    set medication(value) {
        this._medications = value;
    }

    get medicationQuantity() {
        return this._medicationQuantity;
    }

    set medicationQuantity(value) {
        this._medicationQuantity = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    toDisplay() {
        return this.commandName + ": " + this.medicationQuantity + " " +this.medication ;
    }
}