export default class Commande {
    constructor (commandeNom, medicaments, medicamentQuantiter) {
        this._id = Date.now() + Math.floor(Math.random()*10)
        this._commandeNom = commandeNom;
        this._medicament = medicaments;
        this._medicamentQuantiter = medicamentQuantiter;
    }


    get commandeNom() {
        return this._commandeNom;
    }

    set commandeNom(value) {
        this._commandeNom = value;
    }


    get medicament() {
        return this._medicament;
    }

    set medicament(value) {
        this._medicament = value;
    }

    get medicamentQuantiter() {
        return this._medicamentQuantiter;
    }

    set medicamantQuantiter(value) {
        this._medicamentQuantiter = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    pourAfficher() {
        return this.commandeNom + ": " + this._medicamentQuantiter + " " +this._medicament ;
    }
}