# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Comic.destroy_all
User.destroy_all
Site.destroy_all

require 'rest-client'

michael_myers = User.create(username:'MichaelMyers10191957', bio:"Halloween is my favorite holiday." ,image_url:'https://cdn3.movieweb.com/i/article/0mYrxWNgzVGMTtx4GFm8QT262s0SgU/798:50/Halloween-Movie-2018-Reviews-Reaction-Tiff.jpg')

privateKey = "f5952eba34e221888fc1781c728c129bc0b2f258"
publicKey = "ac5ddc00ec3a557a8ca5ba50cb6f6dad"
hash = "6d2d52ca118da80bf099aa9f227845a0"

COMICS_URL = "https://gateway.marvel.com/v1/public/comics?ts=1&apikey=#{publicKey}&hash=#{hash}"

comics = RestClient.get(COMICS_URL)
comics_hash = JSON.parse(comics)

comics_array = comics_hash['data']['results']

comics_array.each do |comic|
    creators_string = ''
    # if comic['creators']['items'] == comic['creators']['items'].length - 1
      comic['creators']['items'].each {
      |resource| creators_string << "#{resource['name']},"
    }
    # else
    #   comic['creators']['items'].each {
    #   |resource| creators_string << "#{resource['name']}"
    # }
    # end
      Comic.find_or_create_by(title:comic['title'], image_url:comic['thumbnail']['path'], desc: comic['description'], creators:creators_string)
  end
  
  #attempting to create a site (user subscription)
  mike_likes_ants = Site.find_or_create_by(user_id: michael_myers, comic_id: 103)
  







