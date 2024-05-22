const saves = require('../Models/SaveModel');

//add to saved

exports.addTosaveRecipecontroller = async (req,res)=>{
    console.log("inside save recipe controller");
    const {id,title, discription, ingredients,recipeImage,instructions, cookingTime, category} =req.body
    // const reciepeImage = req.file.filename
    const userId = req.payload

    try {
        console.log("inside save recipe controller");
        const existingRecipe = await saves.findOne({title,userId})
        if (existingRecipe) {
            res.status(406).json("Recipe Already added to saved recipes...")
        } else {
            const newRecipe = new saves({ title, discription, ingredients,recipeImage, instructions, cookingTime, category,userId })
            console.log("New save Recipe: ", newRecipe);
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }
    } catch (error) {
        console.log(error);
        res.status(401).json(error)
    }
}
//get recipes from save
exports.getsaveController = async (req,res)=>{
    const userId = req.payload
    try {
        const allRecipes= await saves.find({userId})
        res.status(200).json(allRecipes)
        
    } catch (error) {
        res.status(401).json(error)
    }
}

//delete from fav
exports.deleteRecipe = async (req, res) => {
    const { rid } = req.params
    try {
        const deleteData = await saves.findByIdAndDelete({ _id: rid })
        res.status(200).json(deleteData)
    } catch (err) {
        res.status(401).json(err)
    }
}