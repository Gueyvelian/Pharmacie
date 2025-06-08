export default class Medication {
    constructor(denomination, pharmaceuticalForm, Quantity, photo, id) {
        this.id = id;
        this._denomination = denomination;
        this._pharmaceuticalForm = pharmaceuticalForm;
        this._Quantity = Quantity;
        this._photo = photo;
    }


    get denomination() {
        return this._denomination;
    }

    get pharmaceuticalForm() {
        return this._pharmaceuticalForm;
    }

    get quantity() {
        return this._quantity;
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

    set pharmaceuticalForm(value) {
        this._pharmaceuticalForm = value;
    }

    set quantity(value) {
        this._quantity = value;
    }

    set photo(value) {
        this._photo = value;
    }

    set id(value) {
        this._id = value;
    }
}

