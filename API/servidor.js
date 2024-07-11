// Importa o módulo 'express'
import express from 'express'

import cors from 'cors'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Cria uma instância da aplicação Express
const app = express()

// Middleware para interpretar requisições com corpo em JSON
app.use(express.json())
app.use(cors())


/*Trás um usuário*/
// Definição de uma rota POST para '/filmes'
app.post('/filmes', async (req, res) => {
    // Adiciona o corpo da requisição ao array 'filmes'
    await prisma.filme.create({
        data: {
            name: req.body.name,
            genero: req.body.genero,
            faixaEtaria: req.body.faixaEtaria,
            duracaoFilme: req.body.duracaoFilme,
        }
    })

    // Envia uma resposta de sucesso
    res.status(201).json(req.body)
})


// Definição de uma rota GET para '/filmes'
app.get('/filmes', async (req, res) => {
    let filmes = []

    if (req.query) {
        filmes = await prisma.filme.findMany({
            where: {
                name: req.query.name,
                genero: req.query.genero,
                faixaEtaria: req.query.faixaEtaria,
                duracaoFilme: req.query.duracaoFilme,
            }
        })
    }else {
        const filmes = await prisma.filme.findMany()
    }
    // Envia o array 'filmes' como resposta em formato JSON
    res.json(filmes)
})




app.put('/filmes/:id', async (req, res) => {
    // Adiciona o corpo da requisição ao array 'filmes'
   await prisma.filme.update({
        where: {
            id: req.params.id
        },

        data: {
            name: req.body.name,
            genero: req.body.genero,
            faixaEtaria: req.body.faixaEtaria,
            duracaoFilme: req.body.duracaoFilme,
        }
    })

    // Envia uma resposta de sucesso
    res.status(201).json(req.body)
})


app.delete('/filmes/:id', async (req, res) => {
    // Adiciona o corpo da requisição ao array 'filmes'
   await prisma.filme.delete({
        where: {
            id: req.params.id
        }
    })
    // Envia uma resposta de sucesso
    res.status(200).json({message: "Filme deletado com sucesso."})
})



// Inicia o servidor na porta 3000
app.listen(3000)

/*
MongoDB


User: filmesdb
Password: 14jR36E6r3XQHp8B
*/
