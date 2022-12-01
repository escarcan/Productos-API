const auth = require('../middlewares/auth')
const { login, register } = require('../controllers/userController')
const {getId, addProduct, deleteProduct, updateProduct} = require('../controllers/productController')
const productos = require('../data/productos')

const routes = (app) => {

    /**
 * @openapi
 * components: 
 *    schemas: 
 *       productos:
 *          type: object
 *          properties:
 *             id:
 *              type: number
 *             producto:
 *              type: string
 *             marca: 
 *              type: number
 *             linea:
 *              type: number
 *             precio:
 *              type: number
 *             stock: 
 *              type: number
 *             eliminado: 
 *              type: boolean 
 *    
 */


    app.post('/register', register)
    /**
 * @openapi
 * /register:
 *  post: 
 *   tags: 
 *    - Register:
 *   summary: Registra un nuevo usuario
 *   requestBody:
 *      required: true
 *      content: 
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      name:
 *                        type: string
 *                      email: 
 *                        type: string
 *                      password: 
 *                        type: string    
 *   responses: 
 *      201: 
 *       description: Retorna tu usuario creado
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties: 
 *                      name:
 *                        type: string
 *                      email:
 *                        type: string
 *                      password: 
 *                        type: string    
 *                   
 *      400: 
 *       description: Ingresa todos los datos requeridos
 *       content: 
 *          text/plain:
 *              schema: 
 *                  type: string
 *                  example: Ingresa tus datos!  
 *      404: 
 *       description: Usuario ya registrado
 *       content: 
 *          text/plain:
 *             schema: 
 *              type: string
 *              example: Usuario ya registrado!      
 */
    app.post('/login', login)
    /**
 * @openapi
 * /login:
 *  post:
 *   tags: 
 *    - Register:
 *   summary: Iniciar sesion con un usuario ya registrado.
 *   requestBody: 
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      email: 
 *                       type: string
 *                      password: 
 *                       type: string
 *   responses: 
 *      200: 
 *        description: Retorna un token  
 *        content: 
 *          text/plain:
 *              schema:
 *                  type: object
 *                  properties: 
 *                      token:
 *                        type: string
 *                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"        
 *      404: 
 *        description: Devuelve un mensaje de error si no ingresas nada  
 *        content: 
 *          text/plain: 
 *              schema: 
 *                type: string
 *                example: Ingresa tu email y contraseña! 
 *      403: 
 *        description: Credenciales invalidas
 *        content: 
 *          text/plain: 
 *              schema: 
 *                  type: string
 *                  example: Contraseña o usuario incorrecto! 
 */
    app.get('/', (req, res) => res.status(200).send('Bienvenido'))
    /**
 * @openapi
 * /:
 *  get:
 *   tags: 
 *    - Home:
 *   summary: Mensaje de bienvenida
 *   responses: 
 *      200: 
 *       description: Devuelve mensaje de bienvenida
 *       content: 
 *          text/plain:
 *              schema: 
 *                  type: string
 *                  example: Bienvenido! 
 */
    app.get('/productos', auth, (req, res) => res.status(200).json(productos))
    /**
 * @openapi
 * /productos:
 *  get:
 *   tags:
 *    - Productos:
 *   summary: Todos los productos
 *   parameters: 
 *      - in: header
 *        name: x-access-token
 *        schema: 
 *          type: string
 *        required: true  
 *   responses:
 *      200:
 *       description: Retorna array de productos
 *       content: 
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                     $ref: '#components/schemas/productos'
 */

    app.get('/productos/:id', auth,  getId)
    /**
 * @openapi
 * /productos/{id}:
 *  get:
 *   tags:
 *    - Productos:
 *   summary: Devuelve un producto segun dado el id
 *   parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: Agrega un id
 *        schema:
 *          type: integer
 *      - name: x-access-token
 *        in: header
 *        schema: 
 *          type: string
 *        description: Ingresa tu token!
 *        required: true
 *   responses: 
 *      200: 
 *       description: Devulve el producto con el id encontrado
 *       content: 
 *          application/json: 
 *            schema:
 *               $ref: '#components/schemas/productos'
 *      404: 
 *       description: Mensaje de error al no encontrar el producto
 *       content: 
 *          application/json:
 *             schema: 
 *                type: object
 *                properties:
 *                   error:
 *                      type: string
 *                       
 */
    app.post('/productos', auth, addProduct)
    /**
 * @openapi
 * /productos:
 *  post:
 *    tags: 
 *      - Productos:
 *    summary: Añadir productos
 *    requestBody: 
 *      required: true
 *      content: 
 *          application/json:
 *           schema: 
 *              type: object
 *              properties:
 *                  producto: 
 *                      type: string
 *                  marca: 
 *                     type: number
 *                  linea:
 *                      type: number 
 *                  precio: 
 *                     type: number
 *                  stock:
 *                     type: number
 *    parameters: 
 *      - name: x-access-token
 *        in: header
 *        description: Agrega tu token
 *        required: true
 *    responses: 
 *      301: 
 *        description: Devuelve un mensaje de exito y añade el producto
 *        content: 
 *          text/plain:
 *            schema: 
 *              type: string
 *              example: Tarea añadida!
 *      400: 
 *        description: Mensaje de error
 *        content: 
 *          text/plain: 
 *             schema:
 *                type: string
 *                example: No valido!
 */
    app.delete('/productos/:id', auth, deleteProduct)
    /**
 * @openapi
 * /productos/{id}:
 *  delete: 
 *    tags: 
 *     - Productos:
 *    summary: Eliminar un producto
 *    parameters: 
 *      - name: x-access-token
 *        in: header
 *        required: true
 *      - name: id
 *        in: path
 *        required: true
 *    responses: 
 *      201: 
 *        description: Devulve un mensaje de exito y elimina el producto 
 *        content: 
 *          text/plain: 
 *             schema: 
 *               type: string
 *               example: Tarea eliminada!
 *      400: 
 *       description: Mensaje de error
 *       content:
 *          text/plain:
 *             schema: 
 *                type: string
 *                example: Tarea no encontrada :(
 */

    app.put('/productos/:id', auth, updateProduct)
    /**
 * @openapi
 * /productos/{id}:
 *  put:
 *   tags: 
 *    - Productos:
 *   summary: Editar un producto
 *   requestBody: 
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *             type: object
 *             properties:
 *                producto:
 *                   type: string
 *                marca: 
 *                   type: number
 *                linea: 
 *                   type: number
 *                precio: 
 *                   type: number
 *                stock: 
 *                   type: number
 *   parameters: 
 *    - name: x-access-token
 *      in: header
 *      required: true
 *    - name: id
 *      in: path
 *      required: true 
 *   responses: 
 *    200: 
 *     content:
 *       text/plain: 
 *          schema:
 *             type: string
 *             example: Producto correctamente editado!  
 *    400: 
 *      content: 
 *         text/plain: 
 *             schema: 
 *                type: string
 *                example: Error!
 */
    app.use((req, res) => {
        res.status(404).json({
            error: 'error'
        })
    })
}

module.exports = routes