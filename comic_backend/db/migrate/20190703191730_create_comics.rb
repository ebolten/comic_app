class CreateComics < ActiveRecord::Migration[5.2]
  def change
    create_table :comics do |t|
      t.string :title
      t.string :image_url
      t.string :creators
      t.string :desc

      t.timestamps
    end
  end
end
