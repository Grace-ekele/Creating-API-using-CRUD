const express = require('express');
const mongoose = require('mongoose');

const port = 2098

// created a database url
const databaseUrl = 'mongodb://127.0.0.1/todoDB'

mongoose.connect(databaseUrl).then( () => {
    console.log(`Successfully connected to the database: ${databaseUrl}`);
} ).catch( ( error ) => {
    console.log(error.message)
} )
const todoSchema = mongoose.Schema({

    title: {
        type:String,
    },
    decs: {
        type:String,
    },
    
    progress: {
        type: Boolean,
        default:false,
    }
    
})

const todoModel = mongoose.model('todos', todoSchema);


const app = express();
app.use(express.json())

// get all todo 
app.get("/all", async (req, res) => {
    try
    {

        const alltodo = await todoModel.find()
        res.status(200).json({
            status:"all data",
            data:alltodo
        })
         
    } catch (error)
    {
        res.status( 404 ).json( {
            message: error.message
        })
    
     }
})

//get single todo
app.get("/one/:id", async (req, res) => {
    try
    {
         
        const onetodoId = req.params.id
        const alltodo = await todoModel.findById(onetodoId)
        res.status(200).json({
            status:"all data",
            data:alltodo
        })
         
    } catch (error)
    {
        res.status( 404 ).json( {
            message: error.message
        })
    
     }
})

//create a new todo
app.post("/createtodo", async (req, res) => {
    try
    {
        const todo = await todoModel.create(req.body)
        if (!todo)
        {
             res.status( 400 ).json( {
                message: "Error creating a todo"
            })
        } else
        {
              res.status(201).json({
                
                status:"created successfully",
                data:todo
        })
            
        }
      
    
    } catch (error)
    {
          res.status( 404 ).json( {
            message: error.message
        })
    }
})

//end point for edit
app.put("/edit/:id", async (req, res) => {
    try
    {
        const todoId = req.params.id;
        const updateId = await todoModel.findByIdAndUpdate(todoId, req.body,
            { new: true }
        )

         res.status(201).json({
                
                status:"update  successfully",
                data:updateId
        })

         
        
    } catch (error)
    {
        res.status( 404 ).json( {
            message: error.message
        })
    }
})

app.delete("/remove/:id", async (req, res) => {
    try
    {
        const deleteId = req.params.id;
        const updateId = await todoModel.findByIdAndDelete(deleteId)

         res.status(201).json({
                
                status:`todo with id ${deleteId} deleted successfully `,
                
        })

         
        
    } catch (error)
    {
        res.status( 404 ).json( {
            message: error.message
        })
    }
})


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})