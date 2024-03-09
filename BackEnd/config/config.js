const expressConfig = (app, express)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
}

export default expressConfig