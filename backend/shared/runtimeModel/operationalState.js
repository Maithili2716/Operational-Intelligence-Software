class OperationalState {

    constructor() {
        this.states = new Map();
    }

    set(id, state) {
        this.states.set(id, state);
    }

    get(id) {
        return this.states.get(id);
    }

    remove(id) {
        this.states.delete(id);
    }

}