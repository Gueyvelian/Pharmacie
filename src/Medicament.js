export default class Medicament {
    constructor(denomination, formepharmaceutique, qte, photo, id) {
        this.id = id;
        this._denomination = denomination;
        this._formepharmaceutique = formepharmaceutique;
        this._qte = qte;
        this._photo = photo;
    }


    get denomination() {
        return this._denomination;
    }

    get formepharmaceutique() {
        return this._formepharmaceutique;
    }

    get qte() {
        return this._qte;
    }

    get photo() {
        return this._photo;
    }

    get id() {
        return this._id;
    }

    set denomination(value) {
        this._denomination = value;
    }

    set formepharmaceutique(value) {
        this._formepharmaceutique = value;
    }

    set qte(value) {
        this._qte = value;
    }

    set photo(value) {
        this._photo = value;
    }

    set id(value) {
        this._id = value;
    }
}

