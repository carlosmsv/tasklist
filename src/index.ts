import express, { Request, Response } from 'express'
import { PrismaClient, Tasks } from '@prisma/client'
require('dotenv').config()

const prisma = new PrismaClient()

const app = express()

const PORT = 3000

app.use(express.json())

app.get('/tasks', async (req: Request, res: Response) => {
  console.log('fetching...')
  try {
    const taskList: Tasks[] = await prisma.tasks.findMany()
    console.log('taskList: ', taskList)
    res.status(200).send({ taskList })
  } catch (error) {
    console.log('error: ', error)
    res.status(500).send('Failed to fetch tasks')
  }
})

app.post('/tasks', async (req: Request, res: Response) => {
  try {
    const { id, title, description, status } = req.body

    const newTask = await prisma.tasks.create({
      data: {
        id: id,
        title: title,
        description: description,
        status: status,
      },
    })

    res.status(201).send({ message: 'Task created!', newTask })
  } catch (error) {
    res.status(500).send('Failed to create new task')
  }
})

app.delete('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deleteTask = await prisma.tasks.delete({
      where: {
        id: id,
      },
    })
    res.status(201).send(`Deleted task ${id}`)
  } catch (error) {
    res.status(500).send('Failed to delete task')
  }
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
