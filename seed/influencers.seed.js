const mongoose = require('mongoose');

const Influencers = require('../models/Influencers.model')

const influencers = [
    {
        "biography": "",
        "website": null,
        "follower_count": 119375559,
        "following_count": 377,
        "full_name": "👑",
        "highlight_reel_count": 0,
        "id": "19410587",
        "is_business_account": false,
        "business_category_name": null,
        "overall_category_name": null,
        "is_private": false,
        "is_verified": true,
        "profile_pic_url": "https://instagram.fvno3-1.fna.fbcdn.net/v/t51.2885-19/263570976_273354718170504_5597971410410838789_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fvno3-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=Kjqkwe8ifK4AX8sTL46&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT9cPQpIcOUhptaxpj7IOqWbK2RwyoRyWIQ0PhVp9ttdTA&oe=626CE978&_nc_sid=7bff83",
        "profile_pic_url_hd": "https://instagram.fvno3-1.fna.fbcdn.net/v/t51.2885-19/263570976_273354718170504_5597971410410838789_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fvno3-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=Kjqkwe8ifK4AX8sTL46&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT8bEK7HIlzxr8f2T_182TkyJduhHmPUJG-pQCP9Ym5_7w&oe=626CE978&_nc_sid=7bff83",
        "username": "kingjames",
        "igtv_video_count": 48,
        "post_count": 2302,
    }

];

Influencers.create(influencers)
.then(function(results){
    console.log("Influencers Saved", results)
    mongoose.connection.close()
})
.catch (function(error){
    console.log("Something went wrong", error.message)
    mongoose.connection.close()
})

  mongoose
  .connect('mongodb://localhost/project-2') 
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));