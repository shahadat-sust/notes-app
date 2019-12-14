const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes();

    const duplicateNote = notes.find((n) => n.title === title)

    debugger

    if (!duplicateNote) {
        notes.push({
            title : title,
            body : body
        })

        saveNotes(notes)
        console.log(chalk.green('New note added!'))
    } else {
        console.log(chalk.red('Note title already taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()

    const remainingNotes = notes.filter((n) => n.title !== title)

    if (notes.length > remainingNotes.length) {
        saveNotes(remainingNotes)
        console.log(chalk.green('Note removed!'))
    } else {
        console.log(chalk.red('No note found!'))
    }  
}

const listNodes = () => {
    const notes = loadNotes()
    console.log('Your notes')
    console.log('-----------------------------')
    notes.forEach(note => console.log(note.title))
}


const readNote = (title) => {
    const notes = loadNotes()
    const foundNote = notes.find((node) => node.title === title)

    if (foundNote) {
        console.log(chalk.green('Title: ' + foundNote.title))
        console.log('Body: ' + foundNote.body)
    } else {
        console.log(chalk.red('Note not found!'))
    }
}


const saveNotes = (notes) => {
    const dataString = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataString)
}

const loadNotes = () => {
    try {
        const buffer = fs.readFileSync('notes.json')
        return JSON.parse(buffer.toString())
    } catch (e) {
        return []
    }
}

module.exports = {
    addNote : addNote,
    removeNote : removeNote,
    listNodes : listNodes,
    readNote : readNote
}