const sequelize = require("../config/connection");
const {Model1,Model2} = require("../models/");

const seed = async ()=> {
    await sequelize.sync({force:true});
    const model1s = await Model1.bulkCreate([
        {

        },
        {

        },
        {

        }
    ],{
        individualHooks:true
    })
    const model2s = await Model2.bulkCreate([
        {

        },
        {

        },
    ])

    console.log("seeded!")
    process.exit(0)
}

seed();