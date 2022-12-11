import CheckBox from "./CheckBox.js";
import RangeSlider from "./RangeSlider.js";


import {
    notes,
    Major,
    Minor,
    scaleIntervals
}
from "./NoteSets.js";

const newDiv = () => document.createElement("div");

export class ZealBoard {
    constructor() {
        // @Rename
        this.strings = Array.from(document.getElementsByClassName("strings"));

        this.mappedNotes = new Array(6).fill("");

        this.tuning = [
            ["E", "B", "G", "D", "A", "E"],
            ["E", "B", "G", "D", "A", "D"],
            ["D", "A", "G", "D", "A", "D"],
            ["D", "A", "F#", "D", "A", "D"],
            ["D#", "A#", "F#", "C#", "G#", "D#"],
            ["D", "A", "F", "C", "G", "D"]
        ];

        this.startingCode = this.convertOpenStrings();

        this.UI = {
            fretBoundingBox: document.getElementById("fret-wires"),
            stringBoundingBox: document.getElementById("string-container"),
        };

        this.controls = {
            flags: {
                displayLabels: new CheckBox("display-label-flag"),
                displayNotes: new CheckBox("display-notes-flag"),
                chordMapper: new CheckBox("chord-map-flag")
            },
            buttons: {
                clear: document.getElementById("clear-button"),
                applyTuning: document.getElementById("apply-tuning-button"),
                applyScale: document.getElementById("apply-scale-button")
            },
            selectors: {
                range: new RangeSlider(),
                tuning: document.getElementById("tunings"),
                scales: document.getElementById("scales"),
                scaleRoot: document.getElementById("scale-root"),
            },
            displayText: document.getElementById("display-mapped-notes"),
        };

        this.events = {

            clear: () => this.clear(),

            selectTuning: () => this.setOpenStrings(this.tuning[this.controls.selectors.tuning.selectedIndex]),

            selectScale: (low, high) => {
                if (this.controls.flags.chordMapper.checked)
                    this.controls.flags.chordMapper.checked = false;

                this.clear();

                this.events.selectTuning();
                this.controls.flags.displayNotes.checked = true;

                let scaleName = this.controls.selectors.scales.options[this.controls.selectors.scales.selectedIndex].value;

                for (let i = 0; i < this.strings.length; i++) {
                    for (let k = 0; k <this.controls.selectors.range.high; k++) {

                        let start = parseInt(this.controls.selectors.scaleRoot.options[this.controls.selectors.scaleRoot.selectedIndex].value);
                        let scaleNote = notes[(start + scaleIntervals[scaleName][k % 8]) % 12];

                        for (let j = this.controls.selectors.range.low; j < this.controls.selectors.range.high; j++) {
                            let container = this.strings[i].children[j];

                            if (container.children[0].dataset.fret === scaleNote) {
                                container.children[0].classList.add("marker");
                            }
                        }
                    }
                }
            },

            toggleLabelContent: () => {
                if (this.controls.flags.displayNotes.checked) {
                    this.controls.flags.displayLabels.checked = true;
                } else {
                    this.setLabels()
                }
            },

            toggleLabels: () => {
                if (this.controls.flags.displayLabels.checked) {
                    this.setLabels();
                } else {
                    this.controls.flags.displayNotes.checked = false;
                    this.clearLabels();
                }
            },

            toggleChordMapperSettings: () => {
                this.clear();
                if (this.controls.flags.chordMapper.checked) {
                    this.controls.flags.displayNotes.checked = true;
                    this.controls.flags.displayLabels.disabled = true;
                    this.controls.flags.displayNotes.disabled = true;
                } else {
                    this.controls.flags.displayLabels.disabled = false;
                    this.controls.flags.displayNotes.disabled = false;
                }
            }
        }

        this.construct();
        this.setLabels();
        this.coordinateEvents();

    }

    construct() {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 14; j++) {
                let fretContainer = newDiv();
                fretContainer.classList.add("clickable");

                if (j == 0) {
                    fretContainer.classList.add("zeroth");
                }

                let fret = newDiv();
                fret.classList.add("fret");

                fretContainer.appendChild(fret);
                this.strings[i].appendChild(fretContainer);
            }
        }
        this.attachStringsAndFrets();
    }

    attachStringsAndFrets() {
        for (let i = 0; i < 14; i++) {
            let container = newDiv();
            container.classList.add("fret-wire-container");

            let fretWire = newDiv();
            fretWire.classList.add("fret-wire");

            container.appendChild(fretWire);
            this.UI.fretBoundingBox.appendChild(container);
        }

        for (let i = 0; i < 6; i++) {
            let string = newDiv();
            string.classList.add("string");
            this.UI.stringBoundingBox.appendChild(string);
        }
    }

    clear() {
        let markers = document.getElementsByClassName("marker");

        for (let i = markers.length - 1; i >= 0; i--)
            markers[i].classList.toggle("marker");

        for (let i = 0; i < this.mappedNotes.length; i++)
            this.mappedNotes[i] = "";

        this.controls.displayText.textContent = "";
    }

    clearLabels() {
        let allFrets = document.getElementsByClassName("fret");
        for (let i = 0; i < allFrets.length; i++) {
            allFrets[i].setAttribute("data-fret", "");
        }
    }

    convertOpenStrings() {
        return this.strings.map(string => this.createCodeFromNote(string.dataset.openNote));
    }

    createCodeFromNote(note) {
        if (note.length == 1) {
            return {
                length: 1,
                charCode: note.charCodeAt(0)
            };
        }
        return {
            length: 2,
            charCode: note.charCodeAt(0) + note.charCodeAt(1),
        };
    }

    setOpenStrings(notes) {
        this.strings.forEach((string, idx) => string.setAttribute("data-open-note", notes[idx]))
        this.startingCode = this.convertOpenStrings();
        this.setLabels();
    }

    setLabels() {
        let allFrets = document.getElementsByClassName("fret");
        if (this.controls.flags.displayNotes.checked === false) {
            for (let i = 0; i < allFrets.length; i++) {
                allFrets[i].setAttribute("data-fret", (i % 14));
            }

        } else {
            for (let i = 0; i < 6; i++) {
                let rootIdx;
                if (this.startingCode[i].length === 1) {
                    rootIdx = notes.findIndex(a => a.charCodeAt(0) === this.startingCode[i].charCode);
                } else {
                    for (let j = 0; j < notes.length; j++) {
                        let note = this.createCodeFromNote(notes[j]);

                        if (note.length == 1)
                            continue;

                        if (note.charCode === this.startingCode[i].charCode) {
                            rootIdx = j;
                        }

                    }
                }

                for (let j = 0; j < 14; j++) {
                    let label = notes[(rootIdx + j) % 12];
                    allFrets[i * 14 + j].setAttribute("data-fret", label);
                }
            }

        }
    }

    captureClick() {
        const FretContainer = document.getElementsByClassName("clickable");
        Array.from(FretContainer).forEach(container => {
            container.addEventListener("click", () => {

                if (this.controls.flags.chordMapper.checked === false) {
                    container.children[0].classList.toggle("marker");
                    return;
                }

                let idx = container.parentNode.dataset.stringNumber - 1;
                this.mappedNotes[idx] = container.children[0].dataset.fret;

                container.parentNode.querySelectorAll(".marker").forEach(node => {
                    if (node.dataset.fret !== container.children[0].dataset.fret)
                        node.classList.remove("marker");
                    else
                        this.mappedNotes[idx] = "";
                });

                container.children[0].classList.toggle("marker");

                let copyOfMappedNotes = this.mappedNotes.filter(a => a !== "");
                copyOfMappedNotes = copyOfMappedNotes.sort((a, b) => {
                    let aValue = a.charCodeAt(0);
                    if (a.length > 1)
                        aValue += a.charCodeAt(1);

                    let bValue = b.charCodeAt(0);
                    if (b.length > 1)
                        bValue += b.charCodeAt(1);

                    return aValue - bValue;
                });
                this.controls.displayText.textContent = Array.from(new Set(copyOfMappedNotes));
            });
        });
    }

    coordinateEvents() {

        this.controls.flags.displayLabels.checked = true;

        if (this.controls.flags.chordMapper.checked)
            this.events.toggleChordMapperSettings();

        this.captureClick();

        this.controls.flags.chordMapper.onAction((this.events.toggleChordMapperSettings));
        this.controls.flags.displayLabels.onAction(this.events.toggleLabels);
        this.controls.flags.displayNotes.onAction(this.events.toggleLabelContent);

        this.controls.buttons.applyTuning.addEventListener("click", this.events.selectTuning);
        this.controls.buttons.applyScale.addEventListener("click", this.events.selectScale)
        this.controls.buttons.clear.addEventListener("click", this.events.clear);
    }
}

new ZealBoard();
