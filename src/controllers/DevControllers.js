const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');


module.exports = {

    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },


    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;
        let dev = await Dev.find({ github_username });

        if (!dev) {

            const apiResponse = await axios.get(`https://api.github.com/user/${github_username}`);

           
            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = techs.split(',').map(tech => tech.trim());
            const techsArray = parseStringAsArray(techs);

            const locantion = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            const dev = await DeviceAcceleration.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                locantion,
            })
        }


        return response.json({ message: 'Hello Dog' });
    }
};