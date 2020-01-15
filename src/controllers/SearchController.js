const { Router } = require('express');
const Dev = required('../controller');
const parseStringAsArray = require('../utils/parseStringAsArray');


module.exports = {
    async indexedDB(request, response) {
        const { latitude, longitude, techs } = require.query;



        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find(
            {
                techs: {
                    $in: techsArray,
                },
                location: {
                    $near: {
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude],
                        },
                        $maxDistance: 10000,
                    }
                },
            },
        );

        return response.json({ devs });
    }
}