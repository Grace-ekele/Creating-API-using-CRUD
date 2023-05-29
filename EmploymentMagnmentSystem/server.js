const express = require('express');
const mongoose = require('mongoose');

const port = 2098

// created a database url
const databaseUrl = 'mongodb://127.0.0.1/employeeDB'

mongoose.connect(databaseUrl).then( () => {
    console.log(`Successfully connected to the database: ${databaseUrl}`);
} ).catch( ( error ) => {
    console.log(error.message)
} )
const employeeSchema = mongoose.Schema({

    name: {
        type:String,
    },
    salary: {
        type:String,
    },
    gender: {
        type:String,
    },
    position: {
        type: String,

    }
    
})

const employeeModel = mongoose.model('employees', employeeSchema);


const app = express();
app.use(express.json())

// find all employee records 
app.get("/all", async (req, res) => {
    try
    {

        const allemployee = await employeeModel.find()
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

//get single emloyess
app.get("/single/:id", async (req, res) => {
    try
    {
         
        const oneId = req.params.id
        const oneEmployee = await employeeModel.findById(oneId)
        res.status(200).json({
            status:"find One",
            data:oneEmployee
        })
         
    } catch (error)
    {
        res.status( 404 ).json( {
            message: error.message
        })
    
     }
})

//create a new employee record
app.post("/create", async (req, res) => {
    try
    {
        const employeeData = await employeeModel.create(req.body)
        if (!employeeData)
        {
             res.status( 400 ).json( {
                message: "Error creating a todo"
            })
        } else
        {
              res.status(201).json({
                
                status:"created successfully",
                data:employeeData
        })
            
        }
      
    
    } catch (error)
    {
          res.status( 404 ).json( {
            message: error.message
        })
    }
})

//end point for edit single emloyee
app.put("/edit/:id", async (req, res) => {
    try
    {
        const oneId = req.params.id;
        const updateId = await employeeModel.findByIdAndUpdate(oneId, req.body,
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

//delete single emloyee
app.delete("/remove/:id", async (req, res) => {
    try
    {
        const deleteId = req.params.id;
        const deleteSingle= await employeeModel.findByIdAndDelete(deleteId)

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