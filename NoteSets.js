
//             1   b2     2   b3     3    4   b5     5   #5     6    b7     7
//             8   b9     9   b10    10   11  b12    12  #12    13   b14   14
//             0    1     2    3     4    5    6     7    8     9    10    11
const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const scaleIntervals = {
    PentatonicMinor: [0,3, 5, 7, 10],
    PentatonicMajor: [0,2, 4, 7, 9],
    Ionian: [0, 2, 4, 5, 7, 9, 11, 12],
    Dorian: [0, 2, 3, 5, 7, 9, 10, 12],
    Phrygian: [0, 1, 3, 5, 7, 8, 10, 12],
    Lydian: [0, 2, 4, 6, 7, 9, 11, 12],
    Mixolydian: [0, 2, 4, 5, 7, 9, 10, 12],
    Aeolian: [0, 2, 3, 5, 7, 8, 10, 12],
    Locrian: [0, 1, 3, 5, 6, 8, 10, 12],
};

const Major = [
    /* major */
    {
        name: "",
        notes: [0, 4, 7]
    }, {
        name: "add9",
        notes: [0, 2, 4, 7]/* any add9/sus chord = 7sus chord a 5th higher ex:  Eadd9/sus = B7sus */
    }, {
        name: "6/9",
        notes: [0, 2, 4, 7, 9], /* any 6/9 chord without a 3rd = 7sus a whole step higher ex. E6/9 (no 3rd)  = F#7sus also any 6/9 chord = another 6/9 a 4th higher ex. mA6/9 = D6/9, also any 6/9 chord without a root = 7sus chord 3 frets lower ex. D6/9 (no root) = Db7sus */
    }, {
        name: "augmented 9th",
        notes: [0, 4, 7, 11]
    }, {
        name: "augmented 7th",
        notes: [0, 2, 4, 7, 11]
    }, {
        name: "6/7",
        notes: [0, 2, 4, 7, 9, 11]
    }, {
        name: "13th",
        notes: [0, 4, 7, 9, 11]
    }, {
        name: "9th",
        notes: [0, 4, 8, 11]
    }, {
        name: "7th",
        notes: [0, 4, 8, 11, 2]
    }
];
/* minor */
const Minor = [{
        name: "",
        notes: [0, 3, 7]
    }, {
        name: "add9",
        notes: [0, 3, 7, 2]
    }, {
        name: "major 7th",
        notes: [0, 3, 7, 11]
    }, {
        name: "major 9th",
        notes: [0, 2, 3, 7, 11]
    }, {
        name: "7th",
        notes: [0, 3, 7, 10]
    }, {
        name: "7 flat 5th ",
        notes: [0, 3, 6, 10]
    }, {
        name: "7/11",
        notes: [0, 3, 5, 7, 10]
    }, {
        name: "9th",
        notes: [0, 2, 3, 7, 10]
    }, {
        name: "11th",
        notes: [0, 2, 3, 5, 7, 10]
    }, {
        name: "6th",
        notes: [0, 3, 7, 9]
    }
];

export {
    notes,
    Major, Minor,
    scaleIntervals
};
