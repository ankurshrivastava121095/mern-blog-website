const express = require('express')
const AdminController = require('../controllers/Admin/AdminController')
const BlogController = require('../controllers/Admin/BlogController')
const CategoryController = require('../controllers/Admin/CategoryController')
const UserController = require('../controllers/Admin/UserController')
const ApiController = require('../controllers/API/ApiController')
const CrudController = require('../controllers/CrudController')
const EmployeeController = require('../controllers/EmployeeController')
const FrontendController = require('../controllers/FrontendController')
const OrderController = require('../controllers/OrderController')
const StudentController = require('../controllers/StudentController')
const router = express.Router()
const Auth = require('../middleware/Auth')

// router.get('/',(req,res)=>{
//     res.send('Hello This is Practice Workspace!')
// })

//Crud Controller
router.get('/crud/display',CrudController.display)
router.get('/crud/create',CrudController.create)

//StudentController
router.get('/student-display',StudentController.display)
router.get('/student-create',StudentController.create)
router.get('/student-view',StudentController.view)
router.get('/student-edit',StudentController.edit)
router.get('/student-delete',StudentController.delete)

//EmployeeController
router.get('/employee-home',EmployeeController.home)
router.get('/employee-about',EmployeeController.about)
router.get('/employee-our-team',EmployeeController.ourTeam)
router.get('/employee-contact-us',EmployeeController.contactUs)
router.get('/employee-login',EmployeeController.login)

//Order Controller
router.get('/orders/display',OrderController.display)
router.get('/orders/create',OrderController.create)

//Frontend Controller
router.get('/',FrontendController.home)
router.get('/about',FrontendController.about)
router.get('/ourTeam',FrontendController.ourTeam)
router.get('/contactUs',FrontendController.contactUs)
router.get('/login',FrontendController.login)
router.get('/blogDetail/:id',FrontendController.blogDetail)

// Admin/AdminController
router.get('/admin/dashboard',Auth,AdminController.dashboard)

// Admin/UserController
router.get('/admin/register',UserController.register)
router.post('/admin/registrationInsert',UserController.registrationInsert)
router.post('/verifyLogin',UserController.verifyLogin)
router.get('/logout',UserController.logout)

// Admin/BlogController
router.get('/admin/blog',Auth,BlogController.blog)
router.get('/admin/blogList',Auth,BlogController.blogList)
router.post('/admin/blogInsert',Auth,BlogController.blogInsert)
router.get('/admin/viewBlog/:id',Auth,BlogController.viewBlog)
router.get('/admin/editBlog/:id',Auth,BlogController.editBlog)
router.post('/admin/blogUpdate/:id',Auth,BlogController.blogUpdate)
router.get('/admin/deleteBlog/:id',Auth,BlogController.deleteBlog)

// Admin/CategoryController
router.get('/admin/category',CategoryController.category)
router.post('/admin/categoryInsert',CategoryController.categoryInsert)
router.get('/admin/categoryList',CategoryController.categoryList)
router.get('/admin/viewCategory/:id',CategoryController.viewCategory)
router.get('/admin/editCategory/:id',CategoryController.editCategory)
router.post('/admin/categoryUpdate/:id',CategoryController.categoryUpdate)
router.get('/admin/deleteCategory/:id',CategoryController.deleteCategory)

//APIController
router.post('/api/apiRegister',ApiController.registrationInsert)

module.exports = router