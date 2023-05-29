const express = require('express');
const mongoose = require('mongoose');

const port = 2010




// created a database url
const databaseUrl = 'mongodb://127.0.0.1/blogDB'

mongoose.connect(databaseUrl).then( () => {
    console.log(`Successfully connected to the database: ${databaseUrl}`);
} ).catch( ( error ) => {
    console.log(error.message)
} )

const blogSchema = mongoose.Schema({

    title: {
        type: String,
          required: [true, "productName is required."]
    },
    subTitle: {
        type: String,
          
    },
    
    Description: {
        type: String,
        required: [true, "decs is required."]
    },

})

const blogModel = mongoose.model('blogs', blogSchema);

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "productName is required."]
    },
    password: {
        type: String,
          
    },
    
    role: {
        type: String,
    },

})

const userModel = mongoose.model('users', userSchema);





const app = express();
app.use(express.json())

// post blog
app.post("/createblog/:id", async (req, res) => {
    try
    {
 
        const checkAdmin = req.params.id
        
        const findAdmin = await userModel.findById(checkAdmin)
        console.log(findAdmin)
        if (findAdmin.role === 'admin' || findAdmin.role === "superAdmin")
        {
            const blogPost = await blogModel.create(req.body)
            res.status(200).json({
                status:"blog created successfully",
                data:blogPost
            })  
        } else
        {
              res.status(404).json({
            status:"you are not admin",
            
        }) 
        }


      
         
    } catch (error)
    {
        res.status( 404 ).json( {
            message: error.message
        })
    
     }
})

//delete blog
app.delete("/deleteblog/:id", async (req, res) => {
    try
    {
 
        const checkAdmin = req.params.id
        
        const findAdmin = await userModel.findById(checkAdmin)
        console.log(findAdmin)
        const {blogID} = req.body
        if (findAdmin.role === 'admin' || findAdmin.role === "superAdmin")
        {
            const blogPost = await blogModel.findByIdAndDelete(blogID)
            res.status(200).json({
                status:"deleted successfully",
               
            })  
        } 


      
         
    } catch (error)
    {
        res.status( 404 ).json( {
            message: error.message
        })
    
     }
})


//edit blog
app.put("/editblog/:id", async (req, res) => {
    try
    {
 
        const checkAdmin = req.params.id
        
        const findAdmin = await userModel.findById(checkAdmin)
        console.log(findAdmin)
        const {blogID} = req.body
        if (findAdmin.role === 'admin' || findAdmin.role === "superAdmin")
        {
            const blogPost = await blogModel.findByIdAndUpdate(blogID,req.body, {new:true})
            res.status(200).json({
                status:"edited successfully",
                data:blogPost
            })  
        } 


      
         
    } catch (error)
    {
        res.status( 404 ).json( {
            message: error.message
        })
    
     }
})


// //get single todo
// app.get("/one/:id", async (req, res) => {
//     try
//     {
         
//         const onetodoId = req.params.id
//         const alltodo = await blogModel.findById(onetodoId)
//         res.status(200).json({
//             status:"all data",
//             data:alltodo
//         })
 

//     } catch (error)
//     {
//         res.status( 404 ).json( {
//             message: error.message
//         })
    
//      }
// })

//create a super admin
app.post("/create/super", async (req, res) => {
    try
    {

         const {name, password, role} = req.body

        const userReg = await userModel.create({
            name,
            password,
            role:"superAdmin"
        })
       

       
    res.status(201).json({
                
                status:"created successfully",
                data:userReg
        })
            
      
      
    
    } catch (error)
    {
          res.status( 404 ).json( {
            message: error.message
        })
    }
})

// enpoint for normal admin
app.post("/create", async (req, res) => {
    try
    {

        const {name, password, role} = req.body
        const userReg = await userModel.create({
            name,
            password,
            role:"admin"
        })
        if (!userReg)
        {
             res.status( 400 ).json( {
                message: "Error creating a todo"
            })
        } else
        {
              res.status(201).json({
                
                status:"created successfully",
                data:userReg
        })
            
        }
      
    
    } catch (error)
    {
          res.status( 404 ).json( {
            message: error.message
        })
    }
})

// //end point for edit
// app.put("/edit/:id", async (req, res) => {
//     try
//     {
//         const todoId = req.params.id;
//         const updateId = await todoModel.findByIdAndUpdate(todoId, req.body,
//             { new: true }
//         )

//          res.status(201).json({
                
//                 status:"update  successfully",
//                 data:updateId
//         })

         
        
//     } catch (error)
//     {
//         res.status( 404 ).json( {
//             message: error.message
//         })
//     }
// })

// app.delete("/remove/:id", async (req, res) => {
//     try
//     {
//         const deleteId = req.params.id;
//         const updateId = await todoModel.findByIdAndDelete(deleteId)

//          res.status(201).json({
                
//                 status:`todo with id ${deleteId} deleted successfully `,
                
//         })

         
        
//     } catch (error)
//     {
//         res.status( 404 ).json( {
//             message: error.message
//         })
//     }
// })


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})