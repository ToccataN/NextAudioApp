import React from 'react'
import notes from '../../assets/notes.json'

const centerFrequencies = {
    piano: 49,
    midi: 69,
    organ: 34
};

const scaleIndexToNote = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const noteToScaleIndex = {
    "cbb" : -2, "cb" : -1, "c" : 0, "c#" : 1, "cx" : 2,
    "dbb" : 0, "db" : 1, "d" : 2, "d#" : 3, "dx" : 4,
    "ebb" : 2, "eb" : 3, "e" : 4, "e#" : 5, "ex" : 6,
    "fbb" : 3, "fb" : 4, "f" : 5, "f#" : 6, "fx" : 7,
    "gbb" : 5, "gb" : 6, "g" : 7, "g#" : 8, "gx" : 9,
    "abb" : 7, "ab" : 8, "a" : 9, "a#" : 10, "ax" : 11,
    "bbb" : 9, "bb" : 10, "b" : 11, "b#" : 12, "bx" : 13,
};

class KeyboardPanel extends React.Component {

    constructor(props){
        super(props);
        this.keys = [];
        this.centerFreq = centerFrequencies.midi;
        this.A4 = 440;

        for (let i = 1; i<88; i++) {
            this.keys.push(
                <button className={"key"} onMouseDown={this.props.playNote} onMouseUp={this.props.stopNote} value={this.getFrequency(i)}> {this.getNote(this.getFrequency(i))} </button>
            );
        }

    }
    getFrequency(noteNumber) {
        return Math.pow(2, (noteNumber - this.centerFreq) / 12) * this.A4;
    }
    getNote(freq) {
        let noteNumber = 12 * Math.log2(freq / this.A4) + this.centerFreq;
        let octave = Math.floor(noteNumber / 12);
        if (octave < 0){
            noteNumber += -12 * octave;
        }
        let noteName = scaleIndexToNote[noteNumber % 12];

        return noteName + octave.toString();

    }
    render() {
        return(
            <div className={"keyboard-panel ui-panel"}>
                {this.keys}
            </div>
        )
    }

}

export default KeyboardPanel
