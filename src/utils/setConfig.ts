import models = require("../models")

export default async function (name: string,content: any){
    var config = await models.configs.findOne({name})
    if(!config) config = new models.configs()
    config.name = name
    config.content = content
    return await config.save()
}