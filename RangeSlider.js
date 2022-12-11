export default class RangeSlider {
    constructor() {
        this.self = document.getElementById("range-slider");
        this.fromSlider = document.getElementById("from-slider"),
        this.toSlider = document.getElementById("to-slider")

    }
    get low() {
        return parseInt(this.fromSlider.value) > parseInt(this.toSlider.value) ? Math.floor(14 * (parseInt(this.toSlider.value)/101)) + 1: Math.floor(14 * (parseInt(this.fromSlider.value)/101)) + 1;
    }
    
    get high() {
        return parseInt(this.fromSlider.value) < parseInt(this.toSlider.value) ? Math.floor(14 * (parseInt(this.toSlider.value)/101)) + 1: Math.floor(14 * (parseInt(this.fromSlider.value)/101)) + 1;
    }
}