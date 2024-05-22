const recipes = require ('../Models/recipeModel')

//add recipes 

exports.addRecipe = async (req, res) => {
    console.log("Inside Add Recipe");
   
    const { title, discription, ingredients, instructions, cookingTime, category, username } = req.body
    const recipeImage = req.file.filename
    const userId = req.payload

    try {
        const existingRecipe = await recipes.findOne({ title })
        if (existingRecipe) {
            res.status(406).json("Recipe Already Exists!!!")
        } else {
            const newRecipe = new recipes({ title, discription, ingredients, recipeImage, instructions, cookingTime, category, userId,username })
            console.log("New Recipe: ", newRecipe);
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }

    } catch (err) {
        res.status(401).json(err)
    }
}

// get home recipes



//get all recipes
exports.getAllRecipes = async (req, res) => {
    const searchKey = req.query.search
    console.log(searchKey);
    try {
        let query = {}
        if (searchKey) {
            query.title = { $regex: searchKey, $options: "i" }
        }
        console.log("Query", query);
        const allRecipes = await recipes.find(query)
        res.status(200).json(allRecipes)
    } catch (err) {
        res.status(401).json(err)
    }
}

//get user recipes
exports.getUserRecipes = async (req, res) => {
    const userId = req.payload

    try {
        const userRecipes = await recipes.find({ userId })
        res.status(200).json(userRecipes)
    } catch (err) {
        res.status(401).json(err)
    }
}

 //get categorized recipes
 exports.getcategoryRecipes = async(req,res)=>{
    const category = req.query.category;
    try {
        let query = {}
        if (category && category !== 'null') {
            query.category = category;
            console.log("category: ", query.category);
        }
        const categorizedRecipes = await recipes.find(query)
        
        res.status(200).json(categorizedRecipes)
        
    } catch (error) {
        res.status(401).json(error)
    }
}

//get a single recipe Details
exports.getSingleRecipe = async (req, res) => {
    const { rid } = req.params
    try {
        const singleRecipe = await recipes.findById({ _id: rid })
        res.status(200).json(singleRecipe)
    } catch (err) {
        res.status(401).json(err)
    }
}


//edit user recipes
exports.editRecipe = async (req, res) => {
    const { title, discription, ingredients, recipeImage, instructions, cookingTime, category, username } = req.body
    const uploadImage = req.file ? req.file.filename : recipeImage
    const userId = req.payload
    const { rid } = req.params

    try {
        const updatedRecipe = await recipes.findByIdAndUpdate({ _id:rid }, { title, discription, ingredients, recipeImage:uploadImage, instructions, cookingTime, category, userId,username  }, { new: true })
        await updatedRecipe.save()
        res.status(200).json(updatedRecipe)

    } catch (err) {
        res.status(401).json(err)
    }
}


//delete recipe
exports.deleteRecipe = async (req, res) => {
    const { rid } = req.params
    try {
        const deleteData = await recipes.findByIdAndDelete({ _id: rid })
        res.status(200).json(deleteData)
    } catch (err) {
        res.status(401).json(err)
    }
}
