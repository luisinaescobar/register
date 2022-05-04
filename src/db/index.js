var typeorm = require("typeorm")
const { config } = require('dotenv')
const { LimitOnUpdateNotSupportedError } = require("typeorm")
config()
var dataSource = new typeorm.DataSource({
    type: "mysql",
    host: "localhost",
    port: process.env.DBPORT,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true,
    entities: [require("./entity/Post"), require("./entity/Category"), require("./entity/User")],
})

dataSource
    .initialize()
    .then(function () {
        var category1 = {
            name: "TypeScript",
        }
        var category2 = {
            name: "Programming",
        }

        var post = {
            title: "Control flow based type analysis",
            text: "TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.",
            categories: [category1, category2],
        }

        var postRepository = dataSource.getRepository("Post")
        postRepository
            .save(post)
            .then(function (savedPost) {
                console.log("Post has been saved: ", savedPost)
                console.log("Now lets load all posts: ")

                return postRepository.find()
            })
            .then(function (allPosts) {
                console.log("All posts: ", allPosts)
            })
        const userRepo = dataSource.getRepository("User")
        const user1 = { name:"lu", email: "lu@gmail", password:"nose"}    
        userRepo
            .save(user1)
    })
    .catch(function (error) {
        console.log("Error: ", error)
    })

module.exports = dataSource;