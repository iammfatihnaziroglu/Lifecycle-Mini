import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { promises as fs } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Customers JSON file path
const customersFilePath = join(__dirname, 'customers.json')

// Helper function to read customers from JSON file
async function readCustomers() {
  try {
    const data = await fs.readFile(customersFilePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading customers file:', error)
    return []
  }
}

// Helper function to write customers to JSON file
async function writeCustomers(customers) {
  try {
    await fs.writeFile(customersFilePath, JSON.stringify(customers, null, 2), 'utf8')
    return true
  } catch (error) {
    console.error('Error writing customers file:', error)
    return false
  }
}

// Helper function to calculate score based on budget
function calculateScore(budget) {
  if (budget >= 5000000) return 'High'      // 5M+ TL = High
  if (budget >= 2000000) return 'Medium'    // 2M-5M TL = Medium
  return 'Low'                              // <2M TL = Low
}

// GET /api/customers - Get all customers
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await readCustomers()
    res.json(customers)
  } catch (error) {
    console.error('Error getting customers:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// POST /api/customers - Add new customer
app.post('/api/customers', async (req, res) => {
  try {
    const { name, email, phone, countryCode, budget, roomPreference } = req.body

    // Validation
    if (!name || !email || !phone || !countryCode || !budget || !roomPreference) {
      return res.status(400).json({ 
        error: 'All fields are required: name, email, phone, countryCode, budget, roomPreference' 
      })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    // Budget validation
    if (budget <= 0) {
      return res.status(400).json({ error: 'Budget must be greater than 0' })
    }

    // Read existing customers
    const customers = await readCustomers()

    // Check if email already exists
    const existingCustomer = customers.find(customer => customer.email === email)
    if (existingCustomer) {
      return res.status(400).json({ error: 'Customer with this email already exists' })
    }

    // Create new customer with sequential ID
    let newId = 1
    if (customers.length > 0) {
      const maxId = Math.max(...customers.map(c => Number(c.id)))
      newId = maxId + 1
    }
    const newCustomer = {
      id: newId,
      name,
      email,
      phone,
      countryCode,
      budget: Number(budget),
      roomPreference: Number(roomPreference),
      score: calculateScore(budget)
    }

    // Add to customers array
    customers.push(newCustomer)

    // Write back to file
    const success = await writeCustomers(customers)
    if (!success) {
      return res.status(500).json({ error: 'Failed to save customer' })
    }

    res.status(201).json(newCustomer)
  } catch (error) {
    console.error('Error adding customer:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log(`API endpoints:`)
  console.log(`  GET  http://localhost:${PORT}/api/customers`)
  console.log(`  POST http://localhost:${PORT}/api/customers`)
  console.log(`  GET  http://localhost:${PORT}/health`)
})
