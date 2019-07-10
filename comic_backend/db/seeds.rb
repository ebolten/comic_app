# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'rest-client'

michael_meyers = User.create(username:'MichaelMeyers123', bio:"Halloween is my favorite holiday." ,image_url:'https://cdn3.movieweb.com/i/article/0mYrxWNgzVGMTtx4GFm8QT262s0SgU/798:50/Halloween-Movie-2018-Reviews-Reaction-Tiff.jpg')

privateKey = "f5952eba34e221888fc1781c728c129bc0b2f258"
publicKey = "ac5ddc00ec3a557a8ca5ba50cb6f6dad"
hash = "6d2d52ca118da80bf099aa9f227845a0"

COMICS_URL = "https://gateway.marvel.com/v1/public/comics?ts=1&apikey=#{publicKey}&hash=#{hash}"

comics = RestClient.get(COMICS_URL)

comics_hash = JSON.parse(comics)

comics_array = comics_hash['data']['results']



comics_array.each do |comic|
    
    # puts comic['description']


    # desc = nil

    # if data.data.results[i]['description'] == null 
    #     desc = "No Description."
    # else
    #     desc = comic['description'].split('<br>')[0];
    # end

    Comic.create(title:comic['title'], image_url:comic['thumbnail']['path'], desc: comic['description'])
    
end

# puts comics_array







