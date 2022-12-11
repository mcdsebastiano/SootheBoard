export default class CheckBox {
    constructor(idName) {
        this.checkbox = document.getElementById(idName);
        this.eventType = new Event("change");
    }

    get checked() {
        return this.checkbox.checked;
    }

    set checked(bool) {
        this.checkbox.checked = bool;
        this.checkbox.dispatchEvent(this.eventType);
    }

    get disabled() {
        return this.checkbox.disabled;
    }

    set disabled(bool) {
        this.checkbox.disabled = bool;
    }

    onAction(cb) {
        this.checkbox.addEventListener("change", cb)
    };
}