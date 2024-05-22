const express = require('express')
const router = express.Router()
const saveController = require('../Controllers/saveController')
const UserController = require('../Controllers/UserController')
const recipeController = require('../Controllers/recipeController')
const jwtMiddleware = require('../Middleware/jwtMiddleware')
const multerConfig = require('../Middleware/multerMiddleware')

//route for register
router.post('/register',UserController.register)

//route for login 
router.post('/login',UserController.login)

//route for addrecipe 
router.post('/newrecipes',jwtMiddleware,multerConfig.single('recipeImage'),recipeController.addRecipe)

//get all recipes
router.get('/recipes',recipeController.getAllRecipes)

//get categorized recipes
router.get('/get-category-recipes',recipeController.getcategoryRecipes)

//user recipes
router.get('/personalrecipes',jwtMiddleware,recipeController.getUserRecipes)

//view recipe
router.get('/view/:rid',recipeController.getSingleRecipe)

//update profile
router.put('/profile',jwtMiddleware,multerConfig.single("profile"),UserController.editUser)

//add to save recipe
router.post('/favorite',jwtMiddleware,saveController.addTosaveRecipecontroller)

//get saved recipes
router.get('/favorite',jwtMiddleware,saveController.getsaveController)

//remove from saved
router.delete('/favorite/:rid',jwtMiddleware,saveController.deleteRecipe)

//update a recipe
router.put('/personalrecipes/edit/:rid',jwtMiddleware,multerConfig.single("recipeImage"),recipeController.editRecipe)

//delete recipe
router.delete('/personalrecipes/delete/:rid',jwtMiddleware,recipeController.deleteRecipe)




module.exports = router
