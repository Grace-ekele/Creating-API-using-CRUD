const express = require('express');
const mongoose = require('mongoose');

const port = 2070

// created a database url
const databaseUrl = 'mongodb://127.0.0.1/contactDB'

mongoose.connect(databaseUrl).then( () => {
    console.log(`Successfully connected to the database: ${databaseUrl}`);
} ).catch( ( error ) => {
    console.log(error.message)
} )
const contactSchema = mongoose.Schema({

    name: {
        type:String,
    },
    email: {
        type:String,
    },
    
    phoneNumber: {
        type:String,
    },
    
    address: {
        type: String,
    }
    
})

const contactModel = mongoose.model('contacts', contactSchema);


const app = express();
app.use(express.json())

// get all contacts from database
app.get("/all", async (req, res) => {
    try
    {

        const alltodo = await contactModel.find()
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

//get single contact from database
app.get("/one/:id", async (req, res) => {
    try
    {
         
        const oneContactId = req.params.id
        const allContact = await contactModel.findById(oneContactId)
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

//create a new contact
app.post("/createcontact", async (req, res) => {
    try
    {
        const todo = await contactModel.create(req.body)
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

//e edit single contact
app.put("/edit/:id", async (req, res) => {
    try
    {
        const contactId = req.params.id;
        const updateId = await contactModel.findByIdAndUpdate(todoId, req.body,
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

// remove single contact

app.delete("/remove/:id", async (req, res) => {
    try
    {
        const deleteId = req.params.id;
        const updateId = await contactModel.findByIdAndDelete(deleteId)

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