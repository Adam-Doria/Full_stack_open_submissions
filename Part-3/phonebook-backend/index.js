import express from 'express'
import morgan from 'morgan'

morgan.token('body', function (req, res) {
  return JSON.stringify(req.body)
})

const app = express()
app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

const port = 3001
let contacts = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]
const generateId = () => Math.floor(Math.random() * 100000)

app.get('/api/persons', (req, res) => res.send(contacts))

app.get('/api/persons/:id', (req, res) => {
  const contactId = req.params.id
  const contact = contacts.find((contact) => contact.id === contactId)
  if (!contact) res.status(404).end()
  res.send(contact)
})

app.delete('/api/persons/:id', (req, res) => {
  const contactId = req.params.id

  const contactToDelete = contacts.find((contact) => contact.id === contactId)
  contacts = contacts.filter((contact) => contact.id !== contactId)
  if (!contactToDelete) res.status(404).end()
  res.send(contactToDelete)
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  const isDuplicateContact = contacts.find(
    (contact) => contact.name === body.name
  )

  if (!body.name || !body.number)
    res.status(400).json({
      error: 'name or number is missing',
    })

  if (isDuplicateContact)
    res.status(400).json({
      error: 'name must be unique',
    })

  const contact = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }
  contacts = [...contacts, contact]
  res.send(contact)
})

app.get('/info', (req, res) => {
  const numberOfContacts = contacts.length
  const date = new Date()
  res.send(
    `<p> Phonebook has info for ${numberOfContacts} people</p> <p> ${date}</p>`
  )
})

app.listen(port, () => console.log(`App url : http://localhost:${port}`))
